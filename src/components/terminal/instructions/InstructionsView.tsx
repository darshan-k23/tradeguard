import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Trash2, Activity, Plus, AlertTriangle, Crosshair } from 'lucide-react';
import { GlowButton } from '../../ui/GlowButton';
import { cn } from '../../../lib/utils';
import { marketStore } from '../../../store/marketStore';

export type InstructionStatus = 'MONITORING' | 'TRIGGERED' | 'PAUSED' | 'EXPIRED';

export interface Instruction {
  id: string;
  symbol: string;
  condition: string;
  referenceValue: number;
  currentValue: number;
  triggerValue: number;
  status: InstructionStatus;
  createdTime: Date;
  naturalLanguage: string;
}

const INITIAL_INSTRUCTIONS: Instruction[] = [
  {
    id: 'INS-001',
    symbol: 'TCS',
    condition: 'Falls by 5%',
    referenceValue: 4000.00,
    currentValue: marketStore.get('TCS').price,
    triggerValue: 3800.00,
    status: 'MONITORING',
    createdTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    naturalLanguage: 'Alert me when TCS falls 5%.'
  },
  {
    id: 'INS-002',
    symbol: 'RELIANCE',
    condition: 'Crosses above ₹3000',
    referenceValue: 2800.00,
    currentValue: marketStore.get('RELIANCE').price,
    triggerValue: 3000.00,
    status: 'TRIGGERED',
    createdTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    naturalLanguage: 'Alert me when RELIANCE crosses ₹3000.'
  },
  {
    id: 'INS-003',
    symbol: 'HDFC',
    condition: 'Reaches 52W High',
    referenceValue: 1500.00,
    currentValue: marketStore.get('HDFCBANK').price,
    triggerValue: 1700.00,
    status: 'PAUSED',
    createdTime: new Date(Date.now() - 1000 * 60 * 60 * 48),
    naturalLanguage: 'Buy 50 HDFC when it reaches 52W High.'
  }
];

export function InstructionsView() {
  const [instructions, setInstructions] = useState<Instruction[]>(INITIAL_INSTRUCTIONS);
  const [inputText, setInputText] = useState('');

  const handleCreate = () => {
    if (!inputText.trim()) return;

    const newInst: Instruction = {
      id: `INS-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      symbol: inputText.split(' ')[2]?.toUpperCase() || 'UNKNOWN',
      condition: 'Custom condition',
      referenceValue: 0,
      currentValue: 0,
      triggerValue: 0,
      status: 'MONITORING',
      createdTime: new Date(),
      naturalLanguage: inputText
    };

    setInstructions(prev => [newInst, ...prev]);
    setInputText('');

    window.dispatchEvent(new CustomEvent('SYSTEM_ALERT', {
      detail: {
        title: 'New Instruction Saved',
        message: inputText,
        level: 'success'
      }
    }));
  };

  const togglePause = (id: string) => {
    setInstructions(prev => prev.map(inst => {
      if (inst.id === id) {
        if (inst.status === 'MONITORING') return { ...inst, status: 'PAUSED' };
        if (inst.status === 'PAUSED') return { ...inst, status: 'MONITORING' };
      }
      return inst;
    }));
  };

  const deleteInstruction = (id: string) => {
    setInstructions(prev => prev.filter(inst => inst.id !== id));
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 overflow-hidden">
      
      {/* Top Header / Create Area */}
      <div className="flex flex-col gap-4">
        <h2 id="instructions-heading" className="text-xl font-bold tracking-widest text-text-primary uppercase flex items-center gap-3">
          <Activity className="text-cyan-500" aria-hidden="true" /> Standing Instructions
        </h2>
        
        <div className="bg-surface/50 border border-borderLight rounded-xl p-4 flex items-center gap-4 shadow-lg backdrop-blur">
          <div className="w-10 h-10 rounded-full bg-cyan-900/30 flex items-center justify-center text-cyan-500 shrink-0 border border-cyan-500/20">
            <Plus size={20} />
          </div>
          <div className="flex-1">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              placeholder="e.g. Alert me when INFY drops below 1400..."
              aria-label="New standing instruction"
              className="w-full bg-transparent border-none outline-none text-text-primary font-mono text-sm placeholder:text-text-tertiary focus-visible:ring-2 focus-visible:ring-cyan-500 rounded p-1"
            />
          </div>
          <GlowButton aria-label="Create Instruction" variant="primary" className="py-2 shrink-0 tracking-widest uppercase focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background" onClick={handleCreate}>Create</GlowButton>
        </div>
      </div>

      {/* Instructions Grid */}
      <div className="flex-1 overflow-y-auto grid grid-cols-1 xl:grid-cols-2 gap-4 pb-10 content-start pr-2" aria-labelledby="instructions-heading" aria-live="polite">
        <AnimatePresence>
          {instructions.map(inst => (
            <InstructionCard 
              key={inst.id} 
              instruction={inst} 
              onTogglePause={() => togglePause(inst.id)}
              onDelete={() => deleteInstruction(inst.id)}
            />
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}

function InstructionCard({ instruction: inst, onTogglePause, onDelete }: { instruction: Instruction, onTogglePause: () => void, onDelete: () => void }) {
  const isTriggered = inst.status === 'TRIGGERED';
  const isPaused = inst.status === 'PAUSED';
  
  const totalSpan = Math.abs(inst.triggerValue - inst.referenceValue);
  const currentSpan = Math.abs(inst.currentValue - inst.referenceValue);
  const progressRaw = (currentSpan / totalSpan) * 100;
  const progressPct = isTriggered ? 100 : Math.min(100, Math.max(0, progressRaw));

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={cn(
        "relative rounded-xl border p-5 flex flex-col gap-5 overflow-hidden transition-all duration-500 shadow-lg",
        isTriggered ? "bg-neon-amber/5 border-neon-amber/50 shadow-glow-amber" :
        isPaused ? "bg-surfaceHover/30 border-borderLight/30 opacity-70" :
        "bg-surface/80 border-borderLight hover:border-cyan-500/30"
      )}
    >
      {/* Background Pulse for Triggered */}
      {isTriggered && (
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-neon-amber/10 pointer-events-none"
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className={cn(
              "text-lg font-bold tracking-widest",
              isTriggered ? "text-neon-amber" : "text-text-primary"
            )}>{inst.symbol}</span>
            <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded border border-borderLight text-text-tertiary">
              {inst.id}
            </span>
          </div>
          <span className="text-sm font-mono text-text-secondary mt-1">"{inst.naturalLanguage}"</span>
        </div>
        
        {/* Status Badge */}
        <div className={cn(
          "flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase border transition-colors",
          isTriggered ? "bg-neon-amber/20 text-neon-amber border-neon-amber/30 shadow-glow-amber" :
          isPaused ? "bg-surfaceHover text-text-tertiary border-borderLight" :
          "bg-cyan-500/10 text-cyan-500 border-cyan-500/20 shadow-glow-cyan-sm"
        )}>
          {isTriggered ? <AlertTriangle size={12} /> : isPaused ? <Pause size={12} /> : <Crosshair size={12} className="animate-pulse" />}
          {inst.status}
        </div>
      </div>

      {/* Progress / Telemetry Grid */}
      <div className="grid grid-cols-4 gap-4 z-10 font-mono text-sm bg-background/50 rounded-lg p-4 border border-borderLight/50">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase text-text-tertiary tracking-wider">Condition</span>
          <span className="text-text-primary text-xs">{inst.condition}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase text-text-tertiary tracking-wider">Reference</span>
          <span className="text-text-secondary">₹{inst.referenceValue}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase text-text-tertiary tracking-wider">Current</span>
          <span className={cn("font-bold text-base", isTriggered ? "text-neon-amber" : "text-text-primary")}>
            ₹{inst.currentValue.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase text-text-tertiary tracking-wider">Trigger</span>
          <span className="text-cyan-500 font-bold">₹{inst.triggerValue}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col gap-2 z-10">
        <div className="flex justify-between items-center text-[10px] font-mono uppercase text-text-tertiary tracking-wider">
          <span>Proximity</span>
          <span className={isTriggered ? "text-neon-amber" : ""}>{progressPct.toFixed(1)}%</span>
        </div>
        <div className="h-1.5 w-full bg-surfaceHover border border-borderLight/50 rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={cn(
              "absolute top-0 left-0 bottom-0",
              isTriggered ? "bg-neon-amber shadow-glow-amber" : 
              isPaused ? "bg-text-tertiary" : 
              "bg-cyan-500 shadow-glow-cyan"
            )}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-3 mt-1 border-t border-borderLight/50 z-10">
        <span className="text-[10px] font-mono text-text-tertiary uppercase tracking-widest">
          Created: {inst.createdTime.toLocaleTimeString()}
        </span>
        <div className="flex gap-2">
          {!isTriggered && (
            <button 
              onClick={onTogglePause}
              aria-label={isPaused ? "Resume Instruction" : "Pause Instruction"}
              className="p-1.5 rounded bg-surface border border-borderLight text-text-secondary hover:text-text-primary hover:border-text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              title={isPaused ? "Resume" : "Pause"}
            >
              {isPaused ? <Play size={14} /> : <Pause size={14} />}
            </button>
          )}
          <button 
            onClick={onDelete}
            aria-label="Delete Instruction"
            className="p-1.5 rounded bg-surface border border-borderLight text-text-secondary hover:text-neon-red hover:bg-neon-red/10 hover:border-neon-red/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-red"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
