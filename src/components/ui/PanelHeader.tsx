import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface PanelHeaderProps {
  title: string;
  icon?: ReactNode;
  rightAction?: ReactNode;
  className?: string;
}

export function PanelHeader({ title, icon, rightAction, className }: PanelHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between pb-3 border-b border-borderLight mb-4", className)}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-text-tertiary">{icon}</span>}
        <h3 className="text-sm font-medium text-text-primary tracking-wide uppercase">{title}</h3>
      </div>
      {rightAction && (
        <div className="flex items-center">
          {rightAction}
        </div>
      )}
    </div>
  );
}
