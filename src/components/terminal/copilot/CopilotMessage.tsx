import type { ChatMessage } from '../../../types/copilot';
import {
  OrderPreviewCard,
  OrderStatusCard,
  ReadOnlyResultCard,
  SystemAlertCard
} from './MessageCards';
import { motion } from 'framer-motion';

interface CopilotMessageProps {
  message: ChatMessage;
  onApproveOrder?: (id: string) => void;
  onRejectOrder?: (id: string) => void;
}

export function CopilotMessage({ message, onApproveOrder, onRejectOrder }: CopilotMessageProps) {
  const isUser = message.sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col gap-1.5 w-full ${isUser ? 'items-end' : 'items-start'}`}
    >
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-text-tertiary px-1">
        {message.sender === 'tradeguard' && <span className="text-cyan-500">TRADEGUARD</span>}
        {message.sender === 'user' && <span className="text-text-secondary">USER</span>}
        {message.sender === 'system' && <span className="text-neon-amber">SYSTEM</span>}
        <span>• {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>

      {message.type === 'text' && (
        <div className={`px-4 py-3 text-sm font-sans max-w-[85%] leading-relaxed ${isUser
            ? 'bg-surface border border-borderLight text-text-primary rounded-2xl rounded-tr-sm shadow-md'
            : 'bg-cyan-900/10 border border-cyan-500/20 text-text-primary rounded-2xl rounded-tl-sm shadow-glow-cyan-sm'
          }`}>
          {message.content}
        </div>
      )}

      {message.type === 'order_preview' && (
        <OrderPreviewCard payload={message.payload} onApprove={onApproveOrder} onReject={onRejectOrder} />
      )}
      
      {message.type === 'approval_required' && (
        <OrderPreviewCard payload={message.payload} onApprove={onApproveOrder} onReject={onRejectOrder} />
      )}

      {message.type === 'order_status' && (
        <OrderStatusCard payload={message.payload} />
      )}

      {message.type === 'read_only_result' && (
        <ReadOnlyResultCard payload={message.payload} />
      )}

      {message.type === 'system_alert' && (
        <SystemAlertCard payload={message.payload} />
      )}
    </motion.div>
  );
}
