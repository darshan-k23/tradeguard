import { motion } from 'framer-motion';
import { GlowButton } from '../ui/GlowButton';
import { ArrowDown, Lock } from 'lucide-react';

export function SecuritySection() {

  return (
    <section id="security" className="relative z-30 min-h-screen py-32 flex flex-col justify-center bg-background border-t border-borderLight/30 overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 xl:px-24">
        
        {/* Editorial Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-24"
        >
          <div className="text-xs font-mono text-neon-amber mb-6 tracking-widest flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-neon-amber/50"></span>
            SECURITY BOUNDARY
            <span className="w-12 h-px bg-neon-amber/50"></span>
          </div>
          <h2 className="text-[clamp(3rem,6vw,5rem)] font-light text-text-primary tracking-[-0.02em] leading-[1.1] max-w-5xl mb-8 uppercase">
            AI CAN PREPARE.<br />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-neon-amber via-white to-cyan-400">
              ONLY YOU CAN AUTHORIZE.
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl font-light leading-relaxed">
            Execution is strictly gated by explicit trader approval. TradeGuard separates AI interpretation from trade routing, ensuring you retain absolute control over every order.
          </p>
        </motion.div>

        {/* Hero Visual Diagram */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex flex-col items-center justify-center py-24 mb-32 w-full max-w-2xl mx-auto"
        >
          {/* Subtle grid and lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-px h-full bg-gradient-to-b from-transparent via-borderLight to-transparent absolute" />
          </div>

          <div className="flex flex-col items-center gap-6 font-mono z-10 w-full">
            <div className="text-2xl font-light tracking-widest text-cyan-500 bg-background px-4 py-2">AI</div>
            
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <ArrowDown size={20} className="text-borderFocus" />
            </motion.div>
            
            <div className="border border-cyan-500/30 bg-surface/80 backdrop-blur-md px-10 py-4 rounded-sm text-sm tracking-widest uppercase text-text-secondary shadow-[0_0_15px_rgba(0,240,255,0.1)] w-full text-center max-w-xs">
              PREPARE ONLY
            </div>
            
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}>
              <ArrowDown size={20} className="text-borderFocus" />
            </motion.div>
            
            <div className="w-20 h-20 rounded-full border border-neon-amber/50 bg-background flex items-center justify-center text-neon-amber shadow-[0_0_20px_rgba(255,170,0,0.15)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-neon-amber/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <Lock size={28} className="relative z-10" />
            </div>
            
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}>
              <ArrowDown size={20} className="text-borderFocus" />
            </motion.div>

            <div className="text-2xl font-medium tracking-widest text-text-primary bg-background px-4 py-2">TRADER</div>
            
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}>
              <ArrowDown size={20} className="text-borderFocus" />
            </motion.div>

            <div className="border border-neon-green/30 bg-surface/80 backdrop-blur-md px-10 py-4 rounded-sm text-sm tracking-widest uppercase text-neon-green shadow-[0_0_15px_rgba(0,255,0,0.1)] w-full text-center max-w-xs">
              AUTHORIZE
            </div>
            
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.8 }}>
              <ArrowDown size={20} className="text-borderFocus" />
            </motion.div>

            <div className="text-xl font-light tracking-widest text-text-secondary bg-background px-4 py-2">BROKER</div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center text-center pt-12 pb-24 border-t border-borderLight/30"
        >
          <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-light text-text-primary tracking-tight mb-6">
            READY TO TRADE WITH CONTROL?
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl font-light leading-relaxed mb-12">
            Natural language on the front. Deterministic execution underneath.
          </p>
          <GlowButton 
            variant="primary" 
            onClick={() => window.location.href = '/terminal/command'} 
            className="px-12 py-6 text-lg tracking-widest"
          >
            ENTER COPILOT
          </GlowButton>
          <span className="mt-8 text-sm font-mono tracking-widest text-text-tertiary">
            TRADEGUARD AI &middot; SECURITY PROTOCOL
          </span>
        </motion.div>

      </div>
    </section>
  );
}
