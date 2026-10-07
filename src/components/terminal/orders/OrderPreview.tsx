import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, CheckCircle2, XCircle, Lock, Loader2 } from 'lucide-react';
import { GlowButton } from '../../ui/GlowButton';
import { cn } from '../../../lib/utils';
import type { OrderState } from '../../../types/copilot';

export interface OrderDetails {
  id: string;
  action: 'BUY' | 'SELL' | 'MODIFY' | 'CANCEL';
  symbol: string;
  qty: number | string;
  orderType: 'MARKET' | 'LIMIT' | 'SL' | 'SL-M';
  price?: number | string;
  product: 'CNC' | 'MIS' | 'NRML';
  estimatedValue?: number | string;
}

interface OrderPreviewProps {
  order: OrderDetails;
  status: OrderState;
  onApprove?: (orderId: string) => void;
  onReject?: (orderId: string) => void;
  className?: string;
}

export function OrderPreview({ order, status = 'AWAITING_APPROVAL', onApprove, onReject, className }: OrderPreviewProps) {

  const renderStatusHeader = () => {
    switch(status) {
      case 'AWAITING_APPROVAL':
        return (
          <div className="flex items-center gap-1.5 text-neon-amber font-mono text-[10px] uppercase tracking-widest bg-neon-amber/10 px-2.5 py-1 rounded border border-neon-amber/20 shadow-glow-amber">
            <Lock size={12} /> LOCKED: AWAITING APPROVAL
          </div>
        );
      case 'APPROVED':
        return (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 text-cyan-500 font-mono text-[10px] uppercase tracking-widest bg-cyan-900/20 px-2.5 py-1 rounded border border-cyan-500/20 shadow-glow-cyan-sm">
            <ShieldCheck size={12} /> AUTHORIZED
          </motion.div>
        );
      case 'SUBMITTING':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5 text-text-primary font-mono text-[10px] uppercase tracking-widest bg-surfaceHover px-2.5 py-1 rounded border border-borderLight">
            <Loader2 size={12} className="animate-spin text-cyan-500" /> SUBMITTING TO EXCHANGE...
          </motion.div>
        );
      case 'FILLED':
      case 'SUBMITTED':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1.5 text-neon-green font-mono text-[10px] uppercase tracking-widest bg-neon-green/10 px-2.5 py-1 rounded border border-neon-green/20 shadow-glow-green">
            <CheckCircle2 size={12} /> EXECUTED
          </motion.div>
        );
      case 'REJECTED':
      case 'FAILED':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5 text-neon-red font-mono text-[10px] uppercase tracking-widest bg-neon-red/10 px-2.5 py-1 rounded border border-neon-red/20 shadow-glow-red">
            <XCircle size={12} /> {status}
          </motion.div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 text-text-secondary font-mono text-[10px] uppercase tracking-widest">
            {status}
          </div>
        );
    }
  };

  const isBuy = order.action === 'BUY';
  const isProcessing = ['APPROVED', 'SUBMITTING'].includes(status);

  return (
    <div className={cn(
      "w-full max-w-[400px] flex flex-col gap-0 rounded-xl overflow-hidden border transition-all duration-base",
      status === 'AWAITING_APPROVAL' ? "border-neon-amber/30 shadow-glow-amber" :
      status === 'FILLED' ? "border-neon-green/30 shadow-glow-green" :
      isProcessing ? "border-cyan-500/50 shadow-glow-cyan" :
      "border-borderLight bg-surface",
      className
    )}>
      {/* Header */}
      <div className="bg-surface/90 backdrop-blur border-b border-borderLight p-4 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-text-primary font-bold tracking-widest text-sm uppercase">Trade Authorization</h3>
            <div className="text-text-tertiary font-mono text-[9px] uppercase mt-1 tracking-wider">ID: {order.id.toUpperCase()}</div>
          </div>
        </div>
        {renderStatusHeader()}
      </div>

      {/* Body Details */}
      <div className="bg-background/90 p-5 flex flex-col gap-5 font-mono text-sm relative overflow-hidden">
        {/* Subtle background glow based on action */}
        <div className={cn(
          "absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] pointer-events-none opacity-20",
          isBuy ? "bg-neon-green" : "bg-neon-red"
        )} />

        <div className="grid grid-cols-2 gap-y-5 gap-x-6 z-10">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Action</span>
            <span className={cn("font-bold text-base tracking-widest", isBuy ? "text-neon-green" : "text-neon-red")}>{order.action}</span>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Symbol</span>
            <span className="font-bold text-base text-text-primary tracking-widest">{order.symbol}</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Quantity</span>
            <span className="text-text-primary font-medium">{order.qty}</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Order Type</span>
            <span className="text-text-primary font-medium">{order.orderType}</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Price</span>
            <span className="text-text-primary font-medium">{order.price ? `₹${order.price}` : 'MARKET'}</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Product</span>
            <span className="text-text-primary font-medium">{order.product}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-borderLight/50 flex justify-between items-center z-10 border-dashed">
          <span className="text-[10px] text-text-secondary uppercase tracking-widest">Est. Value</span>
          <span className="text-lg text-text-primary font-medium tracking-tight">
            ₹{order.estimatedValue ? order.estimatedValue.toLocaleString() : '--'}
          </span>
        </div>
      </div>

      {/* Footer / Actions */}
      <AnimatePresence mode="popLayout">
        {status === 'AWAITING_APPROVAL' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="bg-surface/90 backdrop-blur p-4 border-t border-borderLight flex flex-col gap-4 overflow-hidden"
          >
            <div className="flex items-start gap-3 bg-neon-amber/5 border border-neon-amber/10 rounded-md p-3">
              <ShieldAlert size={14} className="text-neon-amber flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-text-secondary font-sans leading-relaxed tracking-wide">
                <span className="text-neon-amber font-medium">SECURITY LOCK:</span> Execution is locked until you approve this exact order. Sentinel AI cannot proceed autonomously.
              </p>
            </div>

            <div className="flex gap-3">
              <GlowButton 
                variant="secondary" 
                className="flex-1 tracking-widest text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-red focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                onClick={() => {
                  if (onReject) onReject(order.id);
                }}
              >
                REJECT
              </GlowButton>
              <GlowButton 
                variant="success" 
                className="flex-[2] tracking-widest text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                onClick={() => {
                  if (onApprove) onApprove(order.id);
                }}
              >
                APPROVE ORDER
              </GlowButton>
            </div>
          </motion.div>
        )}

        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="bg-surface/90 p-4 border-t border-borderLight flex items-center justify-center gap-3 text-cyan-500 font-mono text-[10px] tracking-widest overflow-hidden"
          >
            <Loader2 size={16} className="animate-spin" />
            PROCESSING SECURE HANDSHAKE...
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
