import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'glass';
}

export function IconButton({ children, className, variant = 'ghost', ...props }: IconButtonProps) {
  return (
    <button 
      className={cn(
        "p-2 rounded-md transition-all duration-fast flex items-center justify-center text-text-tertiary",
        variant === 'ghost' && "hover:text-text-primary hover:bg-surfaceHover",
        variant === 'glass' && "bg-surface/50 border border-borderLight hover:border-borderFocus hover:text-text-primary hover:bg-surface",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
