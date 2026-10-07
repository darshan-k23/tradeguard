import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { GlassCard } from './GlassCard';

interface MetricCardProps {
  label: string;
  value: string | ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export function MetricCard({ label, value, trend, trendValue, className }: MetricCardProps) {
  return (
    <GlassCard className={cn("p-4 flex flex-col gap-1", className)}>
      <div className="text-xs font-mono text-text-secondary uppercase tracking-wider">{label}</div>
      <div className="text-xl font-light text-text-primary tracking-tight">{value}</div>
      {trend && trendValue && (
        <div className={cn(
          "text-xs font-mono mt-1",
          trend === 'up' && "text-neon-green",
          trend === 'down' && "text-neon-red",
          trend === 'neutral' && "text-text-tertiary"
        )}>
          {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '−'} {trendValue}
        </div>
      )}
    </GlassCard>
  );
}
