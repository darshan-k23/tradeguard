import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock } from 'lucide-react';
import { useCinematicStory } from '../../../hooks/useCinematicStory';

function ConnectVisual() {
  return (
    <div className="mt-16 flex gap-12 font-mono text-xs md:text-sm text-cyan-500/60 tracking-[0.2em] uppercase">
      <div className="flex flex-col gap-3">
        <div className="w-16 h-px bg-cyan-500/30" />
        <div className="text-white/40 text-[10px] md:text-xs">MARKET DATA</div>
        <div className="text-white">CONNECTED</div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="w-16 h-px bg-cyan-500/30" />
        <div className="text-white/40 text-[10px] md:text-xs">AI CORE</div>
        <div className="text-white">INITIALIZED</div>
      </div>
    </div>
  );
}

function UnderstandVisual() {
  return (
    <div className="mt-16 text-3xl md:text-6xl font-light text-white italic opacity-90 border-l-[3px] border-cyan-500/20 pl-8 md:pl-12 py-4">
      "Buy 10 TCS at market."
    </div>
  );
}

function InterpretVisual() {
  return (
    <div className="mt-16 grid grid-cols-2 gap-y-6 gap-x-16 font-mono text-sm md:text-base p-8 bg-surface/20 backdrop-blur-sm border border-cyan-500/10 rounded-sm max-w-lg">
      <div className="text-white/30 tracking-[0.2em] text-[10px] md:text-xs uppercase">ACTION</div>
      <div className="text-cyan-400">BUY</div>
      
      <div className="text-white/30 tracking-[0.2em] text-[10px] md:text-xs uppercase">SYMBOL</div>
      <div className="text-cyan-400">TCS</div>
      
      <div className="text-white/30 tracking-[0.2em] text-[10px] md:text-xs uppercase">QUANTITY</div>
      <div className="text-cyan-400">10</div>
      
      <div className="text-white/30 tracking-[0.2em] text-[10px] md:text-xs uppercase">ORDER TYPE</div>
      <div className="text-cyan-400">MARKET</div>
    </div>
  );
}

function ValidateVisual() {
  return (
    <div className="mt-16 flex flex-col gap-5 font-mono text-xs md:text-sm p-8 bg-neon-green/5 border border-neon-green/20 rounded-sm backdrop-blur-sm max-w-lg">
      <div className="flex items-center gap-5 text-neon-green">
        <ShieldCheck size={18} />
        <span className="tracking-[0.2em]">SYMBOL VALID</span>
      </div>
      <div className="flex items-center gap-5 text-neon-green">
        <ShieldCheck size={18} />
        <span className="tracking-[0.2em]">QUANTITY VALID</span>
      </div>
      <div className="flex items-center gap-5 text-neon-green">
        <ShieldCheck size={18} />
        <span className="tracking-[0.2em]">ORDER PARAMETERS VALID</span>
      </div>
      <div className="flex items-center gap-5 text-white/30 mt-4 border-t border-neon-green/10 pt-4">
        <ShieldCheck size={18} className="opacity-50" />
        <span className="tracking-[0.1em] italic text-[10px] md:text-xs">(REPRESENTATIVE) ACCOUNT CHECK PASSED</span>
      </div>
    </div>
  );
}

function AuthorizeVisual() {
  return (
    <div className="mt-16 max-w-lg mx-auto md:mx-0 w-full">
      <div className="bg-surface/30 backdrop-blur-md border border-amber-500/20 p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden">
        <div className="text-xl md:text-2xl tracking-[0.2em] text-white/40 mb-4 font-mono">BUY TCS</div>
        <div className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">10 SHARES</div>
        <div className="text-xs md:text-sm font-mono tracking-[0.3em] text-amber-500 mb-12">MARKET ORDER</div>
        
        <div className="flex items-center justify-center gap-4 text-amber-500 font-mono text-xs md:text-sm tracking-[0.2em] p-5 border border-amber-500/20 bg-amber-500/5 rounded-sm">
           <Lock size={16} />
           PROTOCOL LOCK ENGAGED
        </div>
      </div>
      <div className="mt-12 font-mono text-white/40 tracking-[0.2em] leading-loose text-xs md:text-sm text-center md:text-left">
        <span className="text-white">AI CAN PREPARE.</span><br/>
        ONLY THE TRADER<br/>
        CAN AUTHORIZE.
      </div>
    </div>
  );
}

function ExecuteVisual({ localProgress }: { localProgress: number }) {
  const step = localProgress < 0.25 ? 0 : localProgress < 0.5 ? 1 : localProgress < 0.75 ? 2 : 3;
  const steps = [
    "APPROVED",
    "SUBMITTED TO BROKER",
    "LIVE STATUS TRACKING",
    "FILLED"
  ];
  
  return (
    <div className="mt-16 font-mono text-xs md:text-sm max-w-md">
      <div className="text-cyan-500/40 text-[10px] md:text-xs tracking-[0.4em] mb-12 uppercase">EXAMPLE EXECUTION SEQUENCE</div>
      <div className="flex flex-col gap-8 border-l border-cyan-500/20 pl-8">
        {steps.map((s, i) => (
          <div key={s} className={`flex items-center gap-8 transition-all duration-700 ${i <= step ? 'text-cyan-400 opacity-100' : 'text-white/20 opacity-30'}`}>
            <div className={`w-2.5 h-2.5 rounded-full ${i <= step ? 'bg-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.6)]' : 'bg-white/10'}`} />
            <div className="tracking-[0.2em]">{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NarrativeContent({ progress }: { progress: number }) {
  const navigate = useNavigate();
  const { stage, stageIndex, localProgress } = useCinematicStory(progress);
  const [prevStageIndex, setPrevStageIndex] = useState(stageIndex);
  const [direction, setDirection] = useState(1);
  
  if (stageIndex !== prevStageIndex) {
    setDirection(stageIndex > prevStageIndex ? 1 : -1);
    setPrevStageIndex(stageIndex);
  }

  const variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
      filter: 'blur(12px)'
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)'
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 1.02,
      filter: 'blur(12px)'
    })
  };

  const showCTA = progress >= 0.96;

  // Determine dynamic classes based on layout side with massive negative space
  const wrapperAlignClass = 
    stage.side === 'left' ? 'left-8 md:left-[8vw]' : 
    stage.side === 'right' ? 'right-8 md:right-[8vw]' : 
    'left-1/2 -translate-x-1/2 text-center';

  const flexAlignClass = 
    stage.side === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence custom={direction}>
        <motion.div
          key={stage.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // slow, editorial crossfade
          className={`absolute top-1/2 -translate-y-1/2 w-[calc(100%-4rem)] md:w-auto max-w-3xl flex flex-col ${wrapperAlignClass} ${flexAlignClass}`}
        >
          {/* LEVEL 3: Eyebrow / Metadata */}
          <div className="font-mono text-[10px] md:text-xs tracking-[0.4em] mb-6 md:mb-10 uppercase opacity-60" style={{ color: stage.accent }}>
            {stage.eyebrow}
          </div>
          
          {/* LEVEL 1: Huge Editorial Headline */}
          <h2 className="text-[clamp(4rem,10vw,8rem)] md:text-[clamp(6rem,12vw,10rem)] font-bold text-white tracking-[-0.04em] leading-[0.85] drop-shadow-2xl whitespace-pre-line mb-8 md:mb-12">
            {stage.headline}
          </h2>
          
          {/* LEVEL 2: Restrained Description */}
          <div className={`flex ${stage.side === 'center' ? 'flex-col items-center mx-auto text-center' : 'items-start'} gap-6 md:gap-10`}>
            {stage.side !== 'center' && (
              <div className="w-16 h-px mt-4 opacity-30 shrink-0" style={{ backgroundColor: stage.accent }} />
            )}
            <p className="text-lg md:text-2xl text-white/60 font-light leading-relaxed max-w-lg text-shadow-sm">
              {stage.description}
            </p>
          </div>
          
          {/* Specific Visuals */}
          <div className="w-full">
            {stage.id === "connect" && <ConnectVisual />}
            {stage.id === "understand" && <UnderstandVisual />}
            {stage.id === "interpret" && <InterpretVisual />}
            {stage.id === "validate" && <ValidateVisual />}
            {stage.id === "authorize" && <AuthorizeVisual />}
            {stage.id === "execute" && <ExecuteVisual localProgress={localProgress} />}
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Final CTA */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 pointer-events-auto z-40"
          >
             <button 
                onClick={() => navigate('/terminal/command')}
                className="px-10 py-5 bg-cyan-950/40 backdrop-blur-md border border-cyan-500/30 hover:bg-cyan-900/60 hover:border-cyan-400 text-white font-mono tracking-[0.3em] text-sm transition-all shadow-[0_0_30px_rgba(0,240,255,0.1)] hover:shadow-[0_0_40px_rgba(0,240,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-sm"
             >
                ENTER COPILOT
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
