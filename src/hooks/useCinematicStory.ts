import { useMemo } from 'react';
import { CINEMATIC_STAGES, type CinematicStage } from '../components/landing/cinematic/config';

export interface CinematicStoryState {
  progress: number;
  stageIndex: number;
  stage: CinematicStage;
  localProgress: number;
  previousStage: CinematicStage | null;
  nextStage: CinematicStage | null;
}

export function useCinematicStory(progress: number): CinematicStoryState {
  return useMemo(() => {
    // 1. Clamp overall progress
    const safeProgress = Math.max(0, Math.min(1, progress));
    
    // 2. Determine current stage
    let stageIndex = CINEMATIC_STAGES.findIndex(
      s => safeProgress >= s.start && safeProgress < s.end
    );
    
    // Fallback for exactly 1.0
    if (stageIndex === -1) {
      stageIndex = CINEMATIC_STAGES.length - 1;
    }

    const stage = CINEMATIC_STAGES[stageIndex];
    
    // 3. Calculate local progress within this stage
    const duration = stage.end - stage.start;
    const rawLocal = duration > 0 ? (safeProgress - stage.start) / duration : 1;
    const localProgress = Math.max(0, Math.min(1, rawLocal));

    // 4. Find neighboring stages
    const previousStage = stageIndex > 0 ? CINEMATIC_STAGES[stageIndex - 1] : null;
    const nextStage = stageIndex < CINEMATIC_STAGES.length - 1 ? CINEMATIC_STAGES[stageIndex + 1] : null;

    return {
      progress: safeProgress,
      stageIndex,
      stage,
      localProgress,
      previousStage,
      nextStage
    };
  }, [progress]);
}
