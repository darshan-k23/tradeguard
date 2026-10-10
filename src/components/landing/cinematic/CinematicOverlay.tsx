import { SystemStatusHUD } from './SystemStatusHUD';
import { NarrativeContent } from './NarrativeContent';
import { motion } from 'framer-motion';

export function CinematicOverlay({ progress, isReady }: { progress: number, isReady: boolean }) {
  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
      {/* Minimal System Status HUD (Top Right) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <SystemStatusHUD progress={progress} />
      </motion.div>

      {/* Main Narrative Typography (Left Side) */}
      {isReady && <NarrativeContent progress={progress} />}
    </div>
  );
}
