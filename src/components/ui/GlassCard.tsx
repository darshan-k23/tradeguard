import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'highlight' | 'subtle';
}

export function GlassCard({ children, className, variant = 'default' }: GlassCardProps) {
  return (
    <div className={cn(
      "rounded-lg border backdrop-blur-md transition-all duration-base",
      variant === 'default' && "bg-surface/80 border-borderLight shadow-lg",
      variant === 'highlight' && "bg-surface/90 border-cyan-500/30 shadow-glow-cyan",
      variant === 'subtle' && "bg-transparent border-transparent hover:bg-surface/40 hover:border-borderLight",
      className
    )}>
      {children}
    </div>
  );
}
