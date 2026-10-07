import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface PillProps {
  children: ReactNode;
  variant?: 'default' | 'ai' | 'outline' | 'success' | 'danger';
  className?: string;
}

export function Pill({ children, variant = 'default', className }: PillProps) {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider",
      variant === 'default' && "bg-surfaceHover text-text-secondary",
      variant === 'ai' && "bg-cyan-900/30 text-cyan-500 border border-cyan-500/20",
      variant === 'outline' && "border border-borderLight text-text-tertiary",
      variant === 'success' && "bg-neon-green/10 text-neon-green border border-neon-green/20",
      variant === 'danger' && "bg-neon-red/10 text-neon-red border border-neon-red/20",
      className
    )}>
      {children}
    </span>
  );
}
