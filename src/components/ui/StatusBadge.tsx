import { cn } from '../../lib/utils';

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'warning' | 'executing';
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-neon-green shadow-glow-green';
      case 'offline': return 'bg-neon-red shadow-glow-red';
      case 'warning': return 'bg-neon-amber shadow-glow-amber';
      case 'executing': return 'bg-cyan-500 shadow-glow-cyan animate-pulse';
    }
  };

  return (
    <div className={cn("inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider", className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", getStatusColor())} />
      {label && <span className={cn(
        status === 'online' && 'text-neon-green',
        status === 'offline' && 'text-neon-red',
        status === 'warning' && 'text-neon-amber',
        status === 'executing' && 'text-cyan-500',
      )}>{label}</span>}
    </div>
  );
}
