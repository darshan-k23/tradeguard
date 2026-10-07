import { motion } from 'framer-motion';
import { Pill } from '../ui/Pill';
import { Check, Lock, ShieldCheck } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as any }
  }
};

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative z-30 min-h-screen py-32 px-4 md:px-12 xl:px-24 flex flex-col justify-center max-w-7xl mx-auto border-t border-borderLight/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-24"
      >
        <Pill variant="ai" className="mb-6 border-purple-500/30 text-purple-400 bg-purple-900/10">THE PIPELINE</Pill>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-text-primary tracking-tight mb-6">
          HOW TRADEGUARD THINKS
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl font-light leading-relaxed">
          Your words become a validated trade — never an uncontrolled one.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative flex flex-col lg:flex-row gap-8 lg:gap-4 max-w-6xl mx-auto w-full"
      >
        {/* Connecting line for desktop */}
        <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-px bg-borderLight/30 -translate-y-1/2 z-0 overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            whileInView={{ x: "200%" }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          />
        </div>
        {/* Connecting line for mobile */}
        <div className="lg:hidden absolute top-[10%] bottom-[10%] left-6 w-px bg-borderLight/30 z-0 overflow-hidden">
          <motion.div 
            initial={{ y: "-100%" }}
            whileInView={{ y: "200%" }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4 w-full z-10 relative">
          
          {/* STEP 1 */}
          <motion.div variants={itemVariants} className="flex flex-col lg:items-center gap-4 group pl-12 lg:pl-0">
            <div className="lg:hidden absolute left-4 w-4 h-4 rounded-full bg-background border-2 border-borderLight z-10 top-1.5 group-hover:border-cyan-500 transition-colors" />
            <div className="hidden lg:flex w-8 h-8 rounded-full bg-background border-2 border-borderLight items-center justify-center text-xs font-mono text-text-tertiary group-hover:border-cyan-500 transition-colors">01</div>
            <div className="bg-surface/40 border border-borderLight/50 p-4 rounded-sm backdrop-blur-md w-full lg:h-48 flex flex-col hover:border-cyan-500/50 transition-colors shadow-none">
              <div className="text-[10px] font-mono text-text-tertiary tracking-widest uppercase mb-3">USER INTENT</div>
              <div className="font-mono text-xs text-text-secondary leading-relaxed bg-background/50 p-2 rounded border border-borderLight/30">
                <span className="text-cyan-500 animate-pulse mr-1">_</span>
                "Buy 10 TCS at market"
              </div>
            </div>
          </motion.div>

          {/* STEP 2 */}
          <motion.div variants={itemVariants} className="flex flex-col lg:items-center gap-4 group pl-12 lg:pl-0">
             <div className="lg:hidden absolute left-4 w-4 h-4 rounded-full bg-background border-2 border-borderLight z-10 top-1.5 group-hover:border-cyan-500 transition-colors" />
            <div className="hidden lg:flex w-8 h-8 rounded-full bg-background border-2 border-borderLight items-center justify-center text-xs font-mono text-text-tertiary group-hover:border-cyan-500 transition-colors">02</div>
            <div className="bg-surface/40 border border-borderLight/50 p-4 rounded-sm backdrop-blur-md w-full lg:h-48 flex flex-col hover:border-cyan-500/50 transition-colors shadow-none">
              <div className="text-[10px] font-mono text-text-tertiary tracking-widest uppercase mb-3">AI INTERPRETATION</div>
              <div className="font-mono text-[10px] flex flex-col gap-1.5">
                <div className="flex justify-between border-b border-borderLight/30 pb-1"><span className="text-text-tertiary">ACTION</span><span className="text-neon-green">BUY</span></div>
                <div className="flex justify-between border-b border-borderLight/30 pb-1"><span className="text-text-tertiary">SYMBOL</span><span className="text-text-primary">TCS</span></div>
                <div className="flex justify-between border-b border-borderLight/30 pb-1"><span className="text-text-tertiary">QTY</span><span className="text-text-primary">10</span></div>
                <div className="flex justify-between"><span className="text-text-tertiary">TYPE</span><span className="text-text-primary">MARKET</span></div>
              </div>
            </div>
          </motion.div>

          {/* STEP 3 */}
          <motion.div variants={itemVariants} className="flex flex-col lg:items-center gap-4 group pl-12 lg:pl-0">
             <div className="lg:hidden absolute left-4 w-4 h-4 rounded-full bg-background border-2 border-borderLight z-10 top-1.5 group-hover:border-purple-500 transition-colors" />
            <div className="hidden lg:flex w-8 h-8 rounded-full bg-background border-2 border-borderLight items-center justify-center text-xs font-mono text-text-tertiary group-hover:border-purple-500 transition-colors">03</div>
            <div className="bg-surface/40 border border-borderLight/50 p-4 rounded-sm backdrop-blur-md w-full lg:h-48 flex flex-col hover:border-purple-500/50 transition-colors shadow-none">
              <div className="text-[10px] font-mono text-text-tertiary tracking-widest uppercase mb-3">DETERMINISTIC VALIDATION</div>
              <div className="font-mono text-[9px] flex flex-col gap-1.5 text-text-secondary">
                <div className="flex items-center gap-1.5"><Check size={10} className="text-neon-green" /> Symbol valid</div>
                <div className="flex items-center gap-1.5"><Check size={10} className="text-neon-green" /> Quantity valid</div>
                <div className="flex items-center gap-1.5"><Check size={10} className="text-neon-green" /> Parameters valid</div>
                <div className="flex items-center gap-1.5"><Check size={10} className="text-neon-green" /> Constraints checked</div>
              </div>
            </div>
          </motion.div>

          {/* STEP 4 */}
          <motion.div variants={itemVariants} className="flex flex-col lg:items-center gap-4 group pl-12 lg:pl-0">
             <div className="lg:hidden absolute left-4 w-4 h-4 rounded-full bg-background border-2 border-borderLight z-10 top-1.5 group-hover:border-neon-amber transition-colors" />
            <div className="hidden lg:flex w-8 h-8 rounded-full bg-background border-2 border-borderLight items-center justify-center text-xs font-mono text-text-tertiary group-hover:border-neon-amber transition-colors">04</div>
            <div className="bg-surface/40 border border-borderLight/50 p-4 rounded-sm backdrop-blur-md w-full lg:h-48 flex flex-col hover:border-neon-amber/50 transition-colors shadow-none">
              <div className="text-[10px] font-mono text-text-tertiary tracking-widest uppercase mb-3">EXACT ORDER PREVIEW</div>
              <div className="bg-background rounded border border-borderLight/50 p-2 text-[10px] font-mono flex flex-col gap-1">
                <div className="text-neon-green font-bold">BUY TCS</div>
                <div className="text-text-secondary">10 shares MARKET</div>
                <div className="text-neon-amber mt-2 text-[9px] flex items-center gap-1 bg-neon-amber/10 p-1 border border-neon-amber/20 rounded"><Lock size={8} /> EXECUTION LOCKED</div>
              </div>
            </div>
          </motion.div>

          {/* STEP 5 */}
          <motion.div variants={itemVariants} className="flex flex-col lg:items-center gap-4 group pl-12 lg:pl-0">
             <div className="lg:hidden absolute left-4 w-4 h-4 rounded-full bg-background border-2 border-borderLight z-10 top-1.5 group-hover:border-neon-green transition-colors" />
            <div className="hidden lg:flex w-8 h-8 rounded-full bg-background border-2 border-borderLight items-center justify-center text-xs font-mono text-text-tertiary group-hover:border-neon-green transition-colors">05</div>
            <div className="bg-surface/40 border border-borderLight/50 p-4 rounded-sm backdrop-blur-md w-full lg:h-48 flex flex-col items-center justify-center text-center hover:border-neon-green/50 transition-colors shadow-none relative overflow-hidden group/lock">
              <div className="absolute inset-0 bg-neon-green/0 group-hover/lock:bg-neon-green/5 transition-colors" />
              <div className="text-[10px] font-mono text-text-tertiary tracking-widest uppercase mb-3 relative z-10">TRADER APPROVAL</div>
              <div className="flex flex-col items-center gap-2">
                <ShieldCheck size={20} className="text-cyan-500 shadow-glow-cyan-sm rounded-full" />
                <span className="text-xs font-medium text-text-primary">Approval Required</span>
              </div>
            </div>
          </motion.div>

          {/* STEP 6 */}
          <motion.div variants={itemVariants} className="flex flex-col lg:items-center gap-4 group pl-12 lg:pl-0">
             <div className="lg:hidden absolute left-4 w-4 h-4 rounded-full bg-background border-2 border-borderLight z-10 top-1.5 group-hover:border-cyan-500 transition-colors" />
            <div className="hidden lg:flex w-8 h-8 rounded-full bg-background border-2 border-borderLight items-center justify-center text-xs font-mono text-text-tertiary group-hover:border-cyan-500 transition-colors">06</div>
            <div className="bg-surface/40 border border-borderLight/50 p-4 rounded-sm backdrop-blur-md w-full lg:h-48 flex flex-col hover:border-cyan-500/50 transition-colors shadow-none">
              <div className="text-[10px] font-mono text-text-tertiary tracking-widest uppercase mb-3">EXECUTION + LIVE STATUS</div>
              <div className="font-mono text-[9px] flex flex-col gap-2 text-text-secondary relative">
                <div className="absolute left-1 top-2 bottom-2 w-px bg-borderLight/30"></div>
                <div className="pl-3 relative"><div className="absolute left-[-2px] top-1 w-1.5 h-1.5 rounded-full bg-text-tertiary" />APPROVED</div>
                <div className="pl-3 relative"><div className="absolute left-[-2px] top-1 w-1.5 h-1.5 rounded-full bg-text-tertiary" />SUBMITTED</div>
                <div className="pl-3 relative"><div className="absolute left-[-2px] top-1 w-1.5 h-1.5 rounded-full bg-text-tertiary" />PARTIALLY FILLED</div>
                <div className="pl-3 relative"><div className="absolute left-[-2px] top-1 w-1.5 h-1.5 rounded-full bg-neon-green shadow-glow-green" /><span className="text-neon-green drop-shadow-[0_0_2px_rgba(0,255,0,0.8)]">FILLED</span></div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
