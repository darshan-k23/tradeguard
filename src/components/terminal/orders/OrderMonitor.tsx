import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { type OrderDetails } from './OrderPreview';
import type { OrderState } from '../../../types/copilot';

// ---- OrderStatusBadge ----
export function OrderStatusBadge({ status }: { status: string }) {
  const isComplete = status === 'FILLED' || status === 'EXECUTED';
  const isWorking = ['SUBMITTED', 'PARTIALLY FILLED', 'PARTIALLY_FILLED'].includes(status);
  
  return (
    <div className={cn(
      "flex items-center gap-1.5 px-2.5 py-1 rounded border font-mono text-[10px] tracking-widest uppercase transition-colors",
      isComplete ? "bg-neon-green/10 border-neon-green/20 text-neon-green shadow-glow-green" :
      isWorking ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-500 shadow-glow-cyan-sm" :
      "bg-surfaceHover border-borderLight text-text-secondary"
    )}>
      {isComplete ? <CheckCircle2 size={12} /> : 
       isWorking ? <Loader2 size={12} className="animate-spin" /> : 
       <Clock size={12} />}
      {status}
    </div>
  );
}

// ---- OrderTimeline ----
export function OrderTimeline({ currentStepStr }: { currentStepStr: string }) {
  const steps = ['REQUESTED', 'VALIDATED', 'APPROVED', 'SUBMITTED', 'PARTIALLY_FILLED', 'FILLED'];
  const currentIndex = steps.indexOf(currentStepStr) >= 0 ? steps.indexOf(currentStepStr) : 0;

  return (
    <div className="flex flex-col gap-0 w-full font-mono text-[10px] uppercase tracking-wider relative">
      {/* Connecting line */}
      <div className="absolute left-2.5 top-2 bottom-2 w-px bg-borderLight z-0" />
      
      {steps.map((step, idx) => {
        const isPast = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        const isFuture = idx > currentIndex;

        // Skip partially filled if we bypass it straight to filled (not applicable here as we animate through it)

        return (
          <div key={step} className={cn("flex items-center gap-4 py-2 z-10 relative transition-opacity duration-500", isFuture && "opacity-40")}>
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center bg-surface border shrink-0 transition-all duration-500",
              isPast ? "border-cyan-500 text-cyan-500" :
              isCurrent ? "border-cyan-500 bg-cyan-500/20 text-cyan-500 shadow-glow-cyan-sm scale-110" :
              "border-borderLight text-borderLight"
            )}>
              {isPast ? <Check size={10} /> : isCurrent ? <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" /> : null}
            </div>
            <div className={cn("flex-1 transition-colors duration-500", isCurrent && "text-cyan-500 font-bold")}>
              {step.replace('_', ' ')}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---- ExecutionProgress ----
export function ExecutionProgress({ filled, requested }: { filled: number, requested: number }) {
  const percentage = Math.min(100, Math.max(0, (filled / requested) * 100));
  const isDone = percentage === 100;

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-end font-mono">
        <span className="text-text-secondary text-[10px] uppercase tracking-wider">Execution Progress</span>
        <span className={cn("text-xs font-bold transition-colors duration-500", isDone ? "text-neon-green" : "text-cyan-500")}>
          {filled} / {requested} FILLED
        </span>
      </div>
      <div className="h-1.5 w-full bg-surfaceHover border border-borderLight/50 rounded-full overflow-hidden relative">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("absolute top-0 left-0 bottom-0", isDone ? "bg-neon-green shadow-glow-green" : "bg-cyan-500 shadow-glow-cyan")}
        />
      </div>
    </div>
  );
}

// ---- FillDetails ----
export function FillDetails({ requested, filled, remaining, avgPrice }: { requested: number, filled: number, remaining: number, avgPrice: number }) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-background/50 border border-borderLight rounded-lg font-mono text-sm relative overflow-hidden">
      <div className="flex flex-col gap-1 z-10">
        <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Requested</span>
        <span className="text-text-primary font-medium">{requested}</span>
      </div>
      <div className="flex flex-col gap-1 z-10">
        <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Filled</span>
        <span className="text-cyan-500 font-bold">{filled}</span>
      </div>
      <div className="flex flex-col gap-1 z-10">
        <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Remaining</span>
        <span className="text-text-primary font-medium">{remaining}</span>
      </div>
      <div className="flex flex-col gap-1 z-10">
        <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Avg Price</span>
        <span className="text-text-primary font-bold">₹{avgPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}

// ---- OrderMonitor (Container) ----
interface OrderMonitorProps {
  order: OrderDetails;
  status: OrderState;
  filled?: number;
  avgPrice?: number;
}

export function OrderMonitor({ order, status = 'SUBMITTED', filled = 0, avgPrice = 0 }: OrderMonitorProps) {
  const requested = Number(order.qty);

  return (
    <div className="w-full max-w-[450px] bg-surface/80 backdrop-blur border border-borderLight rounded-xl overflow-hidden shadow-2xl flex flex-col transition-all duration-700 mt-2">
      
      {/* Header */}
      <div className="p-4 border-b border-borderLight bg-surface/90 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={cn("text-base font-bold tracking-widest", order.action === 'BUY' ? "text-neon-green" : "text-neon-red")}>{order.action}</span>
          <span className="text-base font-bold text-text-primary tracking-widest">{order.symbol}</span>
          <span className="text-text-tertiary font-mono text-xs mt-0.5 tracking-wider">× {order.qty}</span>
        </div>
        <OrderStatusBadge status={status} />
      </div>

      {/* Body Layout */}
      <div className="flex flex-col relative overflow-hidden">
        
        {/* Subtle Success Flash Overlay (NOT confetti) */}
        <AnimatePresence>
          {status === 'FILLED' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0] }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 bg-neon-green pointer-events-none z-20"
            />
          )}
        </AnimatePresence>

        {/* Timeline Sidebar (Top on mobile, side on desktop) */}
        <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-borderLight">
          <div className="p-5 sm:w-[40%] bg-background/30 flex items-center">
            <OrderTimeline currentStepStr={status} />
          </div>

          {/* Execution Details */}
          <div className="p-5 sm:w-[60%] flex flex-col gap-6 justify-center bg-surface/50 relative">
            <ExecutionProgress filled={filled} requested={requested} />
            
            <FillDetails 
              requested={requested} 
              filled={filled} 
              remaining={requested - filled} 
              avgPrice={avgPrice} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}
