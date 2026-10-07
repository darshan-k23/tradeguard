import { useState, useRef, useEffect } from 'react';
import { CopilotHeader } from './CopilotHeader';
import { CopilotMessage } from './CopilotMessage';
import { CopilotInput } from './CopilotInput';
import { ProcessingSequence } from './ProcessingSequence';
import type { ChatMessage, OrderPreviewMessage, OrderState } from '../../../types/copilot';
import { processIntent } from '../../../services/mockAssistant';
import { marketStore } from '../../../store/marketStore';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    sender: 'system',
    type: 'text',
    content: 'Sentinel AI initialized. Real-time market data synced. Awaiting trader intent...',
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

  const updateMessagePayload = (messageId: string, updates: any) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && 'payload' in msg) {
        return { ...msg, payload: { ...msg.payload, ...updates } };
      }
      return msg;
    }));
  };

  const handleApproveOrder = async (orderId: string) => {
    // Find the preview message ID so we can update its status
    const orderPreviewMsg = messages.find(m => m.type === 'order_preview' && m.payload?.id === orderId) as OrderPreviewMessage | undefined;
    if (!orderPreviewMsg || !orderPreviewMsg.payload) return;
    
    const msgId = orderPreviewMsg.id;
    const payload = orderPreviewMsg.payload;

    // Sequence: APPROVED -> SUBMITTING -> Monitor Created
    updateMessagePayload(msgId, { status: 'APPROVED' });
    await new Promise(r => setTimeout(r, 600));
    
    updateMessagePayload(msgId, { status: 'SUBMITTING' });
    await new Promise(r => setTimeout(r, 1200));
    
    // We update the preview to SUBMITTED
    updateMessagePayload(msgId, { status: 'SUBMITTED' });

    // Now spawn the monitor message
    const monitorMsgId = Date.now().toString();
    const monitorMsg: ChatMessage = {
      id: monitorMsgId,
      sender: 'system',
      type: 'order_monitor',
      payload: {
        id: orderId,
        status: 'SUBMITTED' as OrderState,
        action: payload.action,
        symbol: payload.symbol,
        qty: payload.qty,
        price: payload.price,
        orderType: payload.orderType,
        product: payload.product || 'CNC',
        filledQty: 0,
        avgPrice: 0
      },
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, monitorMsg]);

    // Simulate Monitor Lifecycle
    const requestedQty = Number(payload.qty);
    const mockPrice = Number(payload.price) || marketStore.get(payload.symbol).price;

    setTimeout(() => {
      updateMessagePayload(monitorMsgId, {
        status: 'PARTIALLY_FILLED',
        filledQty: Math.floor(requestedQty * 0.4),
        avgPrice: mockPrice
      });
    }, 2500);

    setTimeout(() => {
      updateMessagePayload(monitorMsgId, {
        filledQty: Math.floor(requestedQty * 0.6),
        avgPrice: mockPrice + 0.15
      });
    }, 4500);

    setTimeout(() => {
      updateMessagePayload(monitorMsgId, {
        status: 'FILLED',
        filledQty: requestedQty,
        avgPrice: mockPrice + 0.25
      });
      // Also update the preview to FILLED just so the border changes
      updateMessagePayload(msgId, { status: 'FILLED' });
    }, 6500);
  };

  const handleRejectOrder = (orderId: string) => {
    const orderPreviewMsg = messages.find(m => m.type === 'order_preview' && m.payload?.id === orderId);
    if (orderPreviewMsg) {
      updateMessagePayload(orderPreviewMsg.id, { status: 'REJECTED' });
    }

    const alertMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'system',
      type: 'system_alert',
      payload: {
        title: 'Order Rejected',
        message: `Order ${orderId.toUpperCase()} was rejected by the user.`,
        level: 'warning'
      },
      timestamp: new Date()
    };
    setMessages(prev => [...prev, alertMsg]);
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
