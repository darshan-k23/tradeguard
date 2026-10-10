import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function useScrollVideo(videoSrc: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const [isReady, setIsReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loadPercent, setLoadPercent] = useState(0);
  const [hasError, setHasError] = useState(false);

  const currentTimeRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      setHasError(true);
      return;
    }

    const onLoadedMetadata = () => {
      setDuration(video.duration);
      if (video.readyState >= 1) {
        setIsReady(true);
      }
    };

    const onCanPlay = () => {
      setIsReady(true);
      setLoadPercent(100);
    };

    const onProgress = () => {
      if (video.duration > 0 && video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const percent = Math.min(100, Math.floor((bufferedEnd / video.duration) * 100));
        setLoadPercent(percent);
      }
    };

    const onError = () => {
      setHasError(true);
      setIsReady(true);
      setLoadPercent(100);
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('canplaythrough', onCanPlay);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('progress', onProgress);
    video.addEventListener('error', onError);
    video.addEventListener('abort', onError);

    setLoadPercent(5); 
    video.load();

    if (video.readyState >= 1) {
       setDuration(video.duration);
       setIsReady(true);
    }
    if (video.readyState >= 3) {
       setLoadPercent(100);
    }

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('canplaythrough', onCanPlay);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('progress', onProgress);
      video.removeEventListener('error', onError);
      video.removeEventListener('abort', onError);
    };
  }, [videoSrc]);

  useGSAP(() => {
    if (!isReady || !containerRef.current || !stageRef.current || !wrapperRef.current) return;
    
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!video) return;
    
    let reqId: number;
    let targetTime = 0;
    let isUpdating = false;
    let lastProgressTime = 0;

    const renderVideo = () => {
      if (!hasError && video.readyState >= 1) {
        if (Math.abs(video.currentTime - targetTime) > 0.02) {
          video.currentTime = targetTime;
          currentTimeRef.current = targetTime;
        }
      }
      isUpdating = false;
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        pin: stageRef.current,
        onUpdate: (self) => {
          if (video && !isNaN(video.duration)) {
            targetTime = video.duration * self.progress;
            if (isNaN(targetTime)) targetTime = 0;
            if (!isUpdating) {
              isUpdating = true;
              reqId = requestAnimationFrame(renderVideo);
            }
          }
          
          const now = performance.now();
          if (now - lastProgressTime > 50) {
            setProgress(self.progress);
            lastProgressTime = now;
          }
        }
      }
    });

    gsap.set(wrapper, { perspective: 1000 });
    
    tl.fromTo(wrapper, 
      { scale: 0.94, opacity: 0, y: 30 }, 
      { scale: 1, opacity: 1, y: 0, ease: "power2.out", duration: 0.2 }
    )
    .to(wrapper, { scale: 1.02, duration: 0.6 })
    .to(wrapper, { scale: 1, opacity: 0, ease: "power3.in", duration: 0.2 });

    return () => {
      if (reqId) cancelAnimationFrame(reqId);
    };
  }, { dependencies: [isReady, hasError], scope: containerRef });

  return { 
    containerRef, 
    stageRef, 
    videoRef, 
    wrapperRef, 
    progress, 
    duration, 
    get currentTime() { return currentTimeRef.current; },
    isReady, 
    loadPercent, 
    hasError 
  };
}
