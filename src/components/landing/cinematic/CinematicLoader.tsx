import { motion } from 'framer-motion';

export function CinematicLoader({ loadPercent }: { loadPercent: number }) {
  const bars = Math.floor(loadPercent / 10);
  const emptyBars = Math.max(0, 10 - bars);
  const loadingStr = '█'.repeat(bars) + '░'.repeat(emptyBars);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-background text-cyan-500 font-mono text-sm"
    >
      <div className="flex flex-col gap-6 p-8 border border-borderLight/30 bg-surface/30 backdrop-blur-md rounded-sm min-w-[320px]">
        <div className="text-text-tertiary tracking-widest text-xs uppercase mb-2">
          TRADEGUARD<br/>
          <span className="text-cyan-400">CINEMATIC SYSTEM</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-text-secondary uppercase">VIDEO ASSET</div>
          {loadPercent >= 100 ? (
            <div className="text-neon-green">✓ READY</div>
          ) : (
            <div className="text-cyan-400 flex justify-between">
              <span>{loadingStr}</span>
              <span>{loadPercent}%</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <div className="text-text-secondary uppercase">MARKET CONTEXT</div>
          <div className="text-neon-green">✓ READY</div>
        </div>

        <div className="flex flex-col gap-1 mt-2">
          <div className="text-text-secondary uppercase">AI CORE</div>
          <div className="text-neon-green">✓ READY</div>
        </div>
        
        {loadPercent < 100 && (
           <div className="mt-4 text-xs text-text-tertiary animate-pulse border-t border-borderLight/20 pt-4">
             INITIALIZING SYSTEM...
           </div>
        )}
      </div>
    </motion.div>
  );
}
