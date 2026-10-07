import { useState } from 'react';
import { OrderPreview, type OrderDetails } from '../orders/OrderPreview';
import { OrderMonitor } from '../orders/OrderMonitor';
import { BottomSheet } from '../../ui/BottomSheet';
import { GlowButton } from '../../ui/GlowButton';
import { ShieldAlert, Activity, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { MetricCard } from '../../ui/MetricCard';
import type { 
  OrderPreviewPayload, 
  OrderMonitorPayload, 
  MetricCardPayload, 
  StockCardPayload, 
  SystemAlertPayload 
} from '../../../types/copilot';

export function OrderPreviewCard({ payload, onApprove, onReject }: { payload: OrderPreviewPayload, onApprove?: (id: string) => void, onReject?: (id: string) => void }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [orderId] = useState(() => payload.id || `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`);
  const order: OrderDetails = {
    id: orderId,
    action: payload.action,
    symbol: payload.symbol,
    qty: payload.qty,
    orderType: payload.orderType,
    price: payload.price,
    product: payload.product || 'CNC',
    estimatedValue: Number(payload.qty) * (Number(payload.price) || 0), // Very rough estimate if Market order and price mock provided
  };

  const handleApprove = (id: string) => {
    setIsSheetOpen(false);
    if (onApprove) onApprove(id);
  };

  const handleReject = (id: string) => {
    setIsSheetOpen(false);
    if (onReject) onReject(id);
  };

  return (
    <>
      <div className="md:hidden w-full pt-2">
        <GlowButton variant="secondary" className="w-full justify-between border-neon-amber/30 text-neon-amber hover:bg-neon-amber/10" onClick={() => setIsSheetOpen(true)}>
          <span className="flex items-center gap-2 tracking-widest"><ShieldAlert size={16} /> REQUIRED</span>
          <span className="font-bold">{order.action} {order.symbol}</span>
        </GlowButton>
      </div>

      <div className="hidden md:block w-full pt-2">
        <OrderPreview order={order} status={payload.status || 'AWAITING_APPROVAL'} onApprove={handleApprove} onReject={handleReject} />
      </div>

      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <OrderPreview order={order} status={payload.status || 'AWAITING_APPROVAL'} onApprove={handleApprove} onReject={handleReject} />
      </BottomSheet>
    </>
  );
}

export function OrderMonitorCard({ payload }: { payload: OrderMonitorPayload }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const order: OrderDetails = {
    id: payload.id,
    action: payload.action,
    symbol: payload.symbol,
    qty: payload.qty,
    orderType: payload.orderType,
    price: payload.price,
    product: payload.product || 'CNC',
  };

  return (
    <>
      <div className="md:hidden w-full pt-2">
        <GlowButton variant="secondary" className="w-full justify-between border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10" onClick={() => setIsSheetOpen(true)}>
          <span className="flex items-center gap-2 tracking-widest"><Activity size={16} /> LIVE ORDER</span>
          <span className="font-bold text-text-primary">{order.action} {order.symbol}</span>
        </GlowButton>
      </div>

      <div className="hidden md:block w-full pt-2">
        <OrderMonitor order={order} status={payload.status} filled={payload.filledQty} avgPrice={payload.avgPrice} />
      </div>

      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <OrderMonitor order={order} status={payload.status} filled={payload.filledQty} avgPrice={payload.avgPrice} />
      </BottomSheet>
    </>
  );
}

export function MetricMessageCard({ payload }: { payload: MetricCardPayload }) {
  return (
    <div className="w-full max-w-[280px] pt-2">
      <MetricCard 
        label={payload.label} 
        value={payload.value} 
        trend={payload.trend} 
        trendValue={payload.trendValue} 
        className="bg-surface/80 border-borderLight shadow-sm"
      />
    </div>
  );
}

export function StockMessageCard({ payload }: { payload: StockCardPayload }) {
  const isUp = payload.change >= 0;
  return (
    <div className="w-full max-w-[280px] p-4 bg-surface/80 border border-borderLight rounded-xl shadow-sm flex flex-col gap-2 mt-2">
      <div className="flex justify-between items-center">
        <span className="font-bold tracking-widest text-text-primary">{payload.symbol}</span>
        <span className="font-mono text-sm">₹{payload.price.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center text-xs font-mono">
        <span className="text-text-tertiary">LTP</span>
        <span className={isUp ? "text-neon-green" : "text-neon-red"}>
          {isUp ? '+' : ''}{payload.change.toFixed(2)} ({Math.abs(payload.changePercent).toFixed(2)}%)
        </span>
      </div>
    </div>
  );
}

export function SystemAlertCard({ payload }: { payload: SystemAlertPayload }) {
  const getColors = () => {
    switch(payload.level) {
      case 'error': return 'border-neon-red/30 bg-neon-red/5 text-neon-red';
      case 'warning': return 'border-neon-amber/30 bg-neon-amber/5 text-neon-amber';
      case 'success': return 'border-neon-green/30 bg-neon-green/5 text-neon-green';
      default: return 'border-cyan-500/30 bg-cyan-900/10 text-cyan-500';
    }
  };

  const getIcon = () => {
    switch(payload.level) {
      case 'error': return <XCircle size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      case 'success': return <CheckCircle size={16} />;
      default: return <Info size={16} />;
    }
  };

  return (
    <div className={`w-full max-w-[320px] p-3 border rounded-lg mt-2 flex gap-3 items-start ${getColors()}`}>
      <div className="mt-0.5">{getIcon()}</div>
      <div className="flex flex-col gap-1 flex-1">
        <span className="text-xs font-bold uppercase tracking-widest">{payload.title}</span>
        <p className="text-[11px] text-text-secondary leading-relaxed font-sans">{payload.message}</p>
      </div>
    </div>
  );
}
