import { motion } from 'framer-motion';
import { Pill } from '../ui/Pill';
import { GlowButton } from '../ui/GlowButton';
import { ShieldCheck, ArrowDown, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SecuritySection() {
  const navigate = useNavigate();

  return (
    <section id="security" className="relative z-30 min-h-screen py-32 px-4 md:px-12 xl:px-24 flex flex-col justify-center max-w-7xl mx-auto border-t border-borderLight/30">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-16"
      >
        <Pill variant="ai" className="mb-6 border-neon-amber/30 text-neon-amber bg-neon-amber/10">SECURITY BOUNDARY</Pill>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-text-primary tracking-tight mb-6">
          BUILT AROUND ONE RULE
        </h2>
        <div className="text-2xl md:text-3xl lg:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-neon-amber via-white to-cyan-400 max-w-3xl mb-8 leading-tight tracking-wide">
          AI CAN PREPARE.<br />ONLY THE TRADER CAN AUTHORIZE.
        </div>
        <p className="text-lg text-text-secondary max-w-2xl font-light leading-relaxed">
          TradeGuard separates AI interpretation from trade execution. The model can interpret intent and prepare an action, but the execution boundary remains controlled by deterministic backend logic and explicit trader approval.
        </p>
      </motion.div>

      {/* Hero Visual */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative flex flex-col items-center justify-center py-16 mb-24 w-full"
      >
        {/* Subtle grid and lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent absolute" />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent absolute" />
        </div>

        <div className="flex flex-col items-center gap-4 font-mono z-10">
          <div className="text-xl font-bold tracking-widest text-cyan-500">AI</div>
          <motion.div 
            animate={{ y: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown size={24} className="text-borderFocus" />
          </motion.div>
          
          <div className="border border-cyan-500/30 bg-surface/80 backdrop-blur-md px-8 py-3 rounded text-sm tracking-widest uppercase text-text-secondary shadow-glow-cyan-sm">
            PREPARE ONLY
          </div>
          
          <motion.div 
            animate={{ y: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
          >
            <ArrowDown size={24} className="text-borderFocus" />
          </motion.div>
          
          <div className="w-16 h-16 rounded border-2 border-neon-amber/50 bg-neon-amber/10 flex items-center justify-center text-neon-amber shadow-glow-amber relative overflow-hidden group">
            <div className="absolute inset-0 bg-neon-amber/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <Lock size={24} className="relative z-10" />
          </div>
          
          <motion.div 
            animate={{ y: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
          >
            <ArrowDown size={24} className="text-borderFocus" />
          </motion.div>

          <div className="text-xl font-bold tracking-widest text-text-primary">TRADER</div>
          
          <motion.div 
            animate={{ y: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 2, delay: 0.9 }}
          >
            <ArrowDown size={24} className="text-borderFocus" />
          </motion.div>

          <div className="border border-neon-green/30 bg-surface/80 backdrop-blur-md px-8 py-3 rounded text-sm tracking-widest uppercase text-text-primary shadow-glow-green">
            AUTHORIZE
          </div>
          
          <motion.div 
            animate={{ y: [0, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 2, delay: 1.2 }}
          >
            <ArrowDown size={24} className="text-borderFocus" />
          </motion.div>

          <div className="text-lg font-bold tracking-widest text-text-secondary">BROKER</div>
        </div>
      </motion.div>

      {/* Security Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
        {/* Module 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-surface/20 border border-borderLight/50 p-8 rounded-sm backdrop-blur-md flex flex-col hover:border-cyan-500/30 transition-colors relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          <div className="w-10 h-10 rounded border border-borderLight flex items-center justify-center mb-6 relative z-10 bg-background/50">
            <Lock size={18} className="text-neon-amber" />
          </div>
          <h3 className="text-lg font-medium text-text-primary tracking-wide mb-3 relative z-10">EXPLICIT APPROVAL</h3>
          <p className="text-sm text-text-secondary mb-6 flex-1 relative z-10">
            Every consequential trade is shown as an exact order before execution and requires explicit trader approval.
          </p>
          <div className="bg-background rounded-lg border border-borderLight/50 p-4 font-mono text-xs flex justify-between items-center text-neon-amber">
            <span>[ ORDER CARD ]</span>
            <Lock size={12} />
          </div>
        </motion.div>

        {/* Module 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-surface/20 border border-borderLight/50 p-8 rounded-sm backdrop-blur-md flex flex-col hover:border-cyan-500/30 transition-colors relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          <div className="w-10 h-10 rounded border border-borderLight flex items-center justify-center mb-6 relative z-10 bg-background/50">
            <ShieldCheck size={18} className="text-neon-green" />
          </div>
          <h3 className="text-lg font-medium text-text-primary tracking-wide mb-3 relative z-10">DETERMINISTIC VALIDATION</h3>
          <p className="text-sm text-text-secondary mb-6 flex-1 relative z-10">
            Trading constraints are validated outside the model before an order reaches execution.
          </p>
          <div className="bg-background rounded-lg border border-borderLight/50 p-4 font-mono text-xs flex flex-col gap-2 text-text-secondary">
            <div className="flex justify-between items-center">
              <span>Risk checks</span>
              <span className="text-neon-green">PASS</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Margin limits</span>
              <span className="text-neon-green">PASS</span>
            </div>
          </div>
        </motion.div>

        {/* Module 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-surface/20 border border-borderLight/50 p-8 rounded-sm backdrop-blur-md flex flex-col hover:border-cyan-500/30 transition-colors relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          <div className="w-10 h-10 rounded border border-borderLight flex items-center justify-center mb-6 text-xs font-mono text-cyan-500 relative z-10 bg-background/50">
            010
          </div>
          <h3 className="text-lg font-medium text-text-primary tracking-wide mb-3 relative z-10">UNTRUSTED MARKET DATA</h3>
          <p className="text-sm text-text-secondary mb-6 flex-1 relative z-10">
            Market data, instrument names and external text are treated as data, not as instructions. This mitigates prompt-injection risk.
          </p>
          <div className="bg-background rounded-lg border border-borderLight/50 p-4 font-mono text-[10px] sm:text-xs flex flex-col text-text-tertiary">
            <span>MARKET DATA &rarr; UNTRUSTED DATA</span>
            <span className="my-1 border-b border-borderLight border-dashed" />
            <span className="text-cyan-500">SAFE CONTEXT</span>
          </div>
        </motion.div>

        {/* Module 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-surface/20 border border-borderLight/50 p-8 rounded-sm backdrop-blur-md flex flex-col hover:border-cyan-500/30 transition-colors relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          <div className="w-10 h-10 rounded border border-borderLight flex items-center justify-center mb-6 font-mono text-xs text-text-secondary relative z-10 bg-background/50">
            [ ]
          </div>
          <h3 className="text-lg font-medium text-text-primary tracking-wide mb-3 relative z-10">AUDITABLE EXECUTION</h3>
          <p className="text-sm text-text-secondary mb-6 flex-1 relative z-10">
            Requests, approvals, order transitions and broker outcomes can be traced through the execution lifecycle.
          </p>
          <div className="bg-background rounded-lg border border-borderLight/50 p-4 font-mono text-[9px] sm:text-[10px] text-text-secondary flex justify-between overflow-x-auto no-scrollbar gap-2">
            <span>REQ</span>&rarr;<span>APP</span>&rarr;<span>SUB</span>&rarr;<span>STAT</span>&rarr;<span>OUT</span>
          </div>
        </motion.div>
      </div>

      {/* Final CTA */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center pb-32"
      >
        <h2 className="text-4xl md:text-5xl font-light text-text-primary tracking-tight mb-4">
          READY TO TRADE WITH CONTROL?
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl font-light leading-relaxed mb-10">
          Natural language on the front. Deterministic execution underneath.
        </p>
        <GlowButton 
          variant="primary" 
          onClick={() => navigate('/terminal/command')} 
          className="px-10 py-5 text-lg tracking-widest"
        >
          ENTER COPILOT
        </GlowButton>
        <span className="mt-6 text-sm font-mono tracking-widest text-text-tertiary">
          PS-04 &middot; TRADEGUARD AI
        </span>
      </motion.div>

    </section>
  );
}
