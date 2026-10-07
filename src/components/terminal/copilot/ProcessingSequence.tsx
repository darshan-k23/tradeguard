import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function ProcessingSequence({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [
      { step: 1, delay: 600 },
      { step: 2, delay: 1200 },
      { step: 3, delay: 1800 },
      { step: 4, delay: 2400 },
    ];

    sequence.forEach(s => {
      setTimeout(() => setStep(s.step), s.delay);
    });

    const finishTimeout = setTimeout(() => onComplete(), 2800);
    return () => clearTimeout(finishTimeout);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 border border-cyan-500/20 bg-cyan-900/10 backdrop-blur-sm rounded-lg flex flex-col gap-2.5 w-full max-w-[280px] shadow-glow-cyan-sm"
    >
      <StepItem label="Market Context" index={0} step={step} />
      <StepItem label="Intent Detection" index={1} step={step} />
      <StepItem label="Validation" index={2} step={step} />
      <StepItem label="Response" index={3} step={step} />
    </motion.div>
  );
}

function StepItem({ label, index, step }: { label: string, index: number, step: number }) {
  const isActive = step === index;
  const isDone = step > index;
  
  return (
    <div className={`flex items-center gap-3 text-[11px] uppercase tracking-widest font-mono ${isActive ? 'text-cyan-500 animate-pulse' : isDone ? 'text-neon-green' : 'text-text-tertiary'}`}>
      <span className="w-4 flex justify-center">
        {isDone ? <Check size={12} className="text-neon-green shadow-glow-green" /> : isActive ? '...' : '-'}
      </span>
      {label}
    </div>
  );
}
