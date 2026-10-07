import { cn } from '../../lib/utils';

interface TickerProps {
  symbol: string;
  price: string;
  change: number;
  className?: string;
}

export function Ticker({ symbol, price, change, className }: TickerProps) {
  const isPositive = change >= 0;
  
  return (
    <div className={cn("flex items-center justify-between py-2 text-sm", className)}>
      <span className="font-medium text-text-primary">{symbol}</span>
      <div className="flex items-center gap-3 font-mono">
        <span className="text-text-secondary">{price}</span>
        <span className={cn(
          "text-xs",
          isPositive ? "text-neon-green" : "text-neon-red"
        )}>
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}
