export function SystemStatusHUD({ progress }: { progress: number }) {
  return (
    <div className="absolute top-10 right-8 md:right-16 z-40 font-mono text-[9px] md:text-[10px] pointer-events-none opacity-50">
       <div className="flex gap-12 text-white/40">
          <div className="flex flex-col gap-1.5">
             <span className="opacity-50 tracking-[0.3em]">ENV</span>
             <span className="text-white tracking-[0.1em]">DEMO</span>
          </div>
          <div className="flex flex-col gap-1.5">
             <span className="opacity-50 tracking-[0.3em]">STATUS</span>
             <span className="text-white tracking-[0.1em] flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                ONLINE
             </span>
          </div>
          <div className="flex flex-col gap-1.5">
             <span className="opacity-50 tracking-[0.3em]">PROGRESS</span>
             <span className="text-white tracking-[0.1em]">{(progress * 100).toFixed(0).padStart(3, '0')}%</span>
          </div>
       </div>
    </div>
  );
}
