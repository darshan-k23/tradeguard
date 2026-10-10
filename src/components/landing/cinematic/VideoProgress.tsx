import { motion } from 'framer-motion';
import { CINEMATIC_STAGES } from './config';

export function VideoProgress({ progress }: { progress: number }) {
  const activeIndex = CINEMATIC_STAGES.findIndex(s => progress >= s.start && progress < s.end);
  const stageIndex = activeIndex === -1 ? CINEMATIC_STAGES.length - 1 : activeIndex;
  const stage = CINEMATIC_STAGES[stageIndex];

  return (
    <div className="absolute bottom-12 left-6 md:left-12 z-40 flex flex-col gap-2 font-mono mix-blend-screen drop-shadow-md">
      <div className="text-text-tertiary text-[10px] md:text-xs tracking-widest uppercase">TRADEGUARD<br className="hidden md:block"/> CINEMATIC SYSTEM</div>
      
      <div className="mt-2 md:mt-4 flex items-end gap-3 md:gap-4">
        <div className="text-3xl md:text-4xl text-text-primary font-light flex items-start leading-none">
          <span className="text-sm md:text-lg text-text-secondary mr-1">0</span>
          {stageIndex + 1}
        </div>
        <div className="h-4 md:h-6 w-px bg-borderLight/50 mb-1 md:mb-2"></div>
        <div className="text-xs md:text-sm text-cyan-400 tracking-widest uppercase mb-1 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
          {stage.label}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-40 md:w-48 h-px bg-borderLight/30 mt-2 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 bottom-0 bg-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
