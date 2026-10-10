import { useScrollVideo } from '../../../hooks/useScrollVideo';
import { useMouseParallax } from '../../../hooks/useMouseParallax';
import { ScrollVideo } from './ScrollVideo';
import { CinematicOverlay } from './CinematicOverlay';
import { CinematicLoader } from './CinematicLoader';
import { AnimatePresence } from 'framer-motion';
import { useCinematicStory } from '../../../hooks/useCinematicStory';
import { MarketScene } from '../../3d/MarketScene';

export function CinematicVideoSection() {
  const { containerRef, stageRef, videoRef, wrapperRef, progress, isReady, loadPercent, hasError } = useScrollVideo('/videos/tradeguard-cinematic-01.mp4');
  const mouse = useMouseParallax();
  const { stage, localProgress } = useCinematicStory(progress);

  return (
    <section 
      id="cinematic"
      ref={containerRef} 
      // 500vh gives the user a massive runway to scroll smoothly, slowing down the timeline progression
      className="relative w-full h-[500vh] bg-background"
    >
      <div 
        ref={stageRef} 
        // The stage is pinned by GSAP, keeping it fixed in the viewport while the container scrolls
        className="w-full h-screen relative overflow-hidden flex items-center justify-center bg-background"
      >
        <AnimatePresence>
          {!isReady && <CinematicLoader loadPercent={loadPercent} />}
        </AnimatePresence>

        {isReady && (
          <MarketScene 
            className="z-0 mix-blend-screen opacity-70"
            stage={stage.id} 
            progress={progress} 
            localProgress={localProgress} 
            intensity={1.5}
          />
        )}
        
        <ScrollVideo videoRef={videoRef} wrapperRef={wrapperRef} src="/videos/tradeguard-cinematic-01.mp4" mouse={mouse} hasError={hasError} />
        
        <CinematicOverlay progress={progress} isReady={isReady} />
      </div>
    </section>
  );
}
