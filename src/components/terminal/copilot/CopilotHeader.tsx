import { Database, Briefcase, Lock } from 'lucide-react';

export function CopilotHeader() {
  return (
    <div className="border-b border-borderLight bg-surface/80 backdrop-blur-md p-5 flex flex-col gap-5 shadow-sm z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-glow-cyan animate-pulse"></span>
          <h2 className="text-cyan-500 font-bold tracking-widest text-lg uppercase">TradeGuard AI</h2>
        </div>
        <div className="text-[10px] font-mono text-neon-green tracking-widest uppercase bg-neon-green/10 px-2 py-1 rounded border border-neon-green/20 shadow-glow-green">
          Online
        </div>
      </div>
      
      <div className="flex flex-col gap-2 text-[10px] font-mono tracking-widest uppercase">
        <div className="flex justify-between items-center text-text-secondary">
          <span className="flex items-center gap-2"><Database size={12} className="text-cyan-500" /> Market Data</span>
          <span className="text-neon-green">Synced</span>
        </div>
        <div className="flex justify-between items-center text-text-secondary">
          <span className="flex items-center gap-2"><Briefcase size={12} className="text-cyan-500" /> Portfolio</span>
          <span className="text-neon-green">Synced</span>
        </div>
        <div className="flex justify-between items-center text-text-secondary">
          <span className="flex items-center gap-2"><Lock size={12} className="text-neon-amber" /> Execution</span>
          <span className="text-neon-amber">Locked</span>
        </div>
      </div>
    </div>
  );
}
