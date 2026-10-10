import { useState, useRef, useEffect } from 'react';
import { CopilotHeader } from './CopilotHeader';
import { CopilotMessage } from './CopilotMessage';
import { CopilotInput } from './CopilotInput';
import { ProcessingSequence } from './ProcessingSequence';
import type { ChatMessage, PreparedOrder } from '../../../types/copilot';
import { processIntent } from '../../../services/mockAssistant';
import { tradeGuardApi } from '../../../services/tradeGuardApi';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    sender: 'system',
    type: 'text',
    content: 'TradeGuard AI initialized. Real-time market data synced. Awaiting trader intent...',
    timestamp: new Date()
  }
];

export function CopilotPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  // Listen for system alerts from other panels
  useEffect(() => {
    const handleSystemAlert = (e: Event) => {
      const customEvent = e as CustomEvent;
      const alertMsg: ChatMessage = {
        id: Date.now().toString() + Math.random().toString(36).substring(7),
        sender: 'system',
        type: 'system_alert',
        payload: customEvent.detail,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, alertMsg]);
    };

    window.addEventListener('SYSTEM_ALERT', handleSystemAlert);
    return () => window.removeEventListener('SYSTEM_ALERT', handleSystemAlert);
  }, []);

  const handleSend = (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      type: 'text',
      content: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);
  };

  const handleProcessComplete = async () => {
    setIsProcessing(false);
    
    const lastMsg = messages[messages.length - 1];
    const lastMsgContent = lastMsg?.type === 'text' ? lastMsg.content : '';
    const responseMessages = await processIntent(lastMsgContent);
    
    setMessages(prev => [...prev, ...responseMessages]);
  };

  const updateMessageOrder = (messageId: string, updatedOrder: PreparedOrder) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && ('payload' in msg) && msg.payload && 'order' in (msg.payload as any)) {
        return {
          ...msg,
          payload: {
            ...msg.payload,
            order: updatedOrder
          }
        } as ChatMessage;
      }
      return msg;
    }));
  };

  const handleApproveOrder = async (approvalId: string) => {
    const msg = messages.find(m => 
      (m.type === 'order_preview' || m.type === 'approval_required') && 
      m.payload.order.approvalId === approvalId
    );
    if (!msg) return;

    try {
      // Transition preview to SUBMITTING (Optimistic or fast UI update)
      const approvedOrder = await tradeGuardApi.approveOrder(approvalId);
      updateMessageOrder(msg.id, approvedOrder);

      // Now create an order_status message since it's approved
      const statusMsgId = Date.now().toString();
      const statusMsg: ChatMessage = {
        id: statusMsgId,
        sender: 'system',
        type: 'order_status',
        payload: {
          order: approvedOrder,
          filledQty: 0,
          avgPrice: 0
        },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, statusMsg]);

      // Poll the mock API to simulate backend progressing the state
      const pollInterval = setInterval(async () => {
        const latestOrder = await tradeGuardApi.getOrderStatus(approvedOrder.id);
        
        setMessages(prev => prev.map(m => {
          if (m.id === statusMsgId && m.type === 'order_status') {
            return {
              ...m,
              payload: {
                ...m.payload,
                order: latestOrder,
                filledQty: latestOrder.status === 'FILLED' ? (typeof latestOrder.quantity === 'number' ? latestOrder.quantity : parseInt(latestOrder.quantity, 10)) : 0,
                avgPrice: latestOrder.status === 'FILLED' ? (typeof latestOrder.price === 'number' ? latestOrder.price : 0) : 0
              }
            };
          }
          return m;
        }));

        if (latestOrder.status === 'FILLED' || latestOrder.status === 'REJECTED' || latestOrder.status === 'FAILED') {
          clearInterval(pollInterval);
        }
      }, 1000);

    } catch (err: any) {
      const alertMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'system',
        type: 'system_alert',
        payload: {
          title: 'Approval Failed',
          message: err.message || 'Failed to approve order.',
          level: 'error'
        },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, alertMsg]);
    }
  };

  const handleRejectOrder = async (approvalId: string) => {
    const msg = messages.find(m => 
      (m.type === 'order_preview' || m.type === 'approval_required') && 
      m.payload.order.approvalId === approvalId
    );
    if (!msg) return;

    try {
      const rejectedOrder = await tradeGuardApi.rejectOrder(approvalId);
      updateMessageOrder(msg.id, rejectedOrder);

      const alertMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'system',
        type: 'system_alert',
        payload: {
          title: 'Order Rejected',
          message: `Order ${rejectedOrder.id} was securely rejected.`,
          level: 'warning'
        },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, alertMsg]);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full bg-surface/30 flex flex-col relative z-20">
      <CopilotHeader />

      <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 relative scroll-smooth">
        {/* Subtle AI background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none"></div>

        {messages.map(msg => (
          <CopilotMessage 
            key={msg.id} 
            message={msg} 
            onApproveOrder={handleApproveOrder}
            onRejectOrder={handleRejectOrder}
          />
        ))}
        
        {isProcessing && (
          <ProcessingSequence onComplete={handleProcessComplete} />
        )}
      </div>

      <CopilotInput onSend={handleSend} disabled={isProcessing} />
    </div>
  );
}
