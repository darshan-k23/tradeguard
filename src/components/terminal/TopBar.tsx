import { useState, useEffect } from 'react';
import { Settings, User } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

export function TopBar() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-14 border-b border-borderLight bg-surface/50 flex items-center justify-between px-4 md:px-6 z-20 shrink-0">
      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden md:block">
          <StatusBadge status="online" label="MARKET OPEN" />
        </div>
        <div className="md:hidden flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-green shadow-glow-green animate-pulse"></span>
          <span className="text-[10px] font-mono text-neon-green tracking-widest">OPEN</span>
        </div>
        <div className="hidden md:block h-4 w-px bg-borderLight" />
        <div className="flex items-center gap-2 md:gap-3 font-mono text-xs md:text-sm">
          <span className="text-text-secondary">NIFTY</span>
          <span className="text-text-primary">22,450.00</span>
          <span className="text-neon-green">+1.24%</span>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6 font-mono text-xs md:text-sm">
        <span className="text-text-secondary hidden sm:block">{time.toLocaleTimeString()}</span>
        <div className="flex items-center gap-3">
          <button aria-label="Settings" className="text-text-secondary hover:text-text-primary transition-colors hidden md:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-md p-1">
            <Settings size={18} />
          </button>
          <button aria-label="User Profile" className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-surfaceHover border border-borderLight flex items-center justify-center text-text-secondary hover:text-cyan-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
            <User size={14} className="md:hidden" />
            <User size={16} className="hidden md:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
