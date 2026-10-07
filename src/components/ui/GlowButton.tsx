import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  isLoading?: boolean;
}

export function GlowButton({ children, className, variant = 'primary', isLoading, disabled, ...props }: GlowButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } } : {}}
      whileTap={!isDisabled ? { scale: 0.97, transition: { duration: 0.1 } } : {}}
      disabled={isDisabled}
      className={cn(
        "relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300",
        "border overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        isDisabled ? "opacity-50 cursor-not-allowed" : "",
        variant === 'primary' && !isDisabled && "bg-cyan-900/30 border-cyan-500/30 text-cyan-500 hover:border-cyan-500 hover:shadow-glow-cyan hover:bg-cyan-900/50 focus-visible:ring-cyan-500",
        variant === 'primary' && isDisabled && "bg-cyan-900/10 border-cyan-500/10 text-cyan-500/50",
        variant === 'secondary' && !isDisabled && "bg-surface border-borderLight text-text-secondary hover:text-text-primary hover:border-borderFocus hover:bg-surfaceHover focus-visible:ring-text-secondary",
        variant === 'secondary' && isDisabled && "bg-surface border-borderLight/50 text-text-secondary/50",
        variant === 'danger' && !isDisabled && "bg-neon-red/10 border-neon-red/30 text-neon-red hover:border-neon-red hover:shadow-glow-red hover:bg-neon-red/20 focus-visible:ring-neon-red",
        variant === 'danger' && isDisabled && "bg-neon-red/5 border-neon-red/10 text-neon-red/50",
        variant === 'success' && !isDisabled && "bg-neon-green/10 border-neon-green/30 text-neon-green hover:border-neon-green hover:shadow-glow-green hover:bg-neon-green/20 focus-visible:ring-neon-green",
        variant === 'success' && isDisabled && "bg-neon-green/5 border-neon-green/10 text-neon-green/50",
        className
      )}
      {...props as any}
    >
      <span className={cn("relative z-10 flex items-center gap-2", isLoading && "opacity-0")}>{children}</span>
      {isLoading && (
        <span className="absolute inset-0 z-20 flex items-center justify-center">
          <Loader2 size={16} className="animate-spin text-current" />
        </span>
      )}
      {variant === 'primary' && !isDisabled && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
      )}
    </motion.button>
  );
}
