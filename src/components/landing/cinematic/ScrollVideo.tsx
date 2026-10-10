import type { RefObject } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface ScrollVideoProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  wrapperRef: RefObject<HTMLDivElement | null>;
  src: string;
  mouse: { x: MotionValue<number>, y: MotionValue<number> };
  hasError: boolean;
}

export function ScrollVideo({ videoRef, wrapperRef, src, mouse, hasError }: ScrollVideoProps) {
  // Very subtle parallax to ground the immersive video
  const moveX = useTransform(mouse.x, [-1, 1], [-8, 8]);
  const moveY = useTransform(mouse.y, [-1, 1], [-8, 8]);

  return (
    <motion.div 
      ref={wrapperRef as any}
      className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden bg-background"
      style={{ x: moveX, y: moveY, willChange: 'transform, filter, opacity' }}
    >
      {!hasError ? (
        <video
          ref={videoRef as any}
          src={src}
          className="w-full h-full object-cover opacity-80"
          preload="auto"
          muted
          playsInline
          aria-hidden="true"
        />
      ) : (
        <div className="w-full h-full bg-cyan-950/20 backdrop-blur-md flex items-center justify-center">
          <div className="font-mono text-cyan-500/50 text-sm tracking-widest border border-cyan-500/20 px-8 py-4 rounded bg-cyan-950/40">
            CINEMATIC FEED UNAVAILABLE
          </div>
        </div>
      )}
      
      {/* Readability Gradients (Layer 3) */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent w-full md:w-3/4 opacity-90" />
    </motion.div>
  );
}
