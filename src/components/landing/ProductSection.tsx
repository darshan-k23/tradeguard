import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export function ProductSection() {
  const features = [
    {
      num: "01",
      heading: "NATURAL LANGUAGE\nBECOMES INTENT",
      desc: "Speak naturally. Ask questions about your portfolio, positions, and options using plain English.",
      visual: (
        <div className="relative w-full max-w-lg mx-auto md:ml-auto">
          <div className="bg-background rounded-xl p-6 border border-borderLight/50 font-mono text-sm relative overflow-hidden shadow-2xl">
            <div className="text-text-tertiary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-glow-cyan animate-pulse"></span>
              "What's my P&L today?"
            </div>
            <div className="bg-surfaceHover p-4 rounded-lg border border-borderLight flex justify-between items-center relative z-10 transition-colors">
              <span className="text-text-secondary tracking-widest text-xs">DAY P&L</span>
              <span className="text-neon-green font-bold text-lg shadow-glow-green drop-shadow-[0_0_8px_rgba(0,255,0,0.4)]">
                +₹4,280
              </span>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-[50px] pointer-events-none" />
          </div>
        </div>
      )
    },
    {
      num: "02",
      heading: "INTENT BECOMES\nAN EXACT ORDER",
      desc: "TradeGuard structures natural language into precise, deterministic parameters instantly.",
      visual: (
        <div className="relative w-full max-w-lg mx-auto md:ml-auto">
          <div className="bg-background rounded-xl p-6 border border-borderLight/50 font-mono text-sm shadow-2xl">
            <div className="text-text-tertiary mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 shadow-glow-purple"></span>
              "Buy 10 TCS at market"
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs tracking-widest">
              <div className="bg-surfaceHover p-3 rounded flex flex-col gap-1 border border-borderLight">
                <span className="text-text-secondary text-[10px]">ACTION</span>
                <span className="text-neon-green font-bold text-sm">BUY</span>
              </div>
              <div className="bg-surfaceHover p-3 rounded flex flex-col gap-1 border border-borderLight">
                <span className="text-text-secondary text-[10px]">SYMBOL</span>
                <span className="text-text-primary font-bold text-sm">TCS</span>
              </div>
              <div className="bg-surfaceHover p-3 rounded flex flex-col gap-1 border border-borderLight">
                <span className="text-text-secondary text-[10px]">QTY</span>
                <span className="text-text-primary font-bold text-sm">10</span>
              </div>
              <div className="bg-surfaceHover p-3 rounded flex flex-col gap-1 border border-borderLight">
                <span className="text-text-secondary text-[10px]">TYPE</span>
                <span className="text-text-primary font-bold text-sm">MARKET</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      num: "03",
      heading: "AI PREPARES.\nTRADER AUTHORIZES.",
      desc: "Execution is securely locked behind a deterministic approval boundary. AI proposes, you control.",
      visual: (
        <div className="relative w-full max-w-lg mx-auto md:ml-auto">
          <div className="bg-background rounded-xl border border-borderLight/50 font-mono text-xs overflow-hidden shadow-2xl">
            <div className="bg-surface p-4 border-b border-borderLight flex justify-between items-center text-text-secondary tracking-widest text-[10px]">
              <span>AI PREPARED ORDER</span>
              <span className="text-[10px] text-neon-amber px-2 py-1 rounded border border-neon-amber/20 bg-neon-amber/10 flex items-center gap-1 shadow-glow-amber-sm">
                <Lock size={10} /> LOCKED
              </span>
            </div>
            <div className="p-6 flex flex-col gap-6">
              <div className="flex gap-4 items-center text-lg">
                <span className="text-neon-green font-bold tracking-widest">BUY</span>
                <span className="text-text-primary font-bold tracking-widest">TCS</span>
                <span className="text-text-secondary">10</span>
                <span className="text-text-secondary">MKT</span>
              </div>
              <div className="w-full py-3 rounded bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-center tracking-widest uppercase font-sans font-medium text-xs hover:bg-cyan-500 hover:text-background transition-colors cursor-pointer">
                AUTHORIZE EXECUTION
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      num: "04",
      heading: "EXECUTION\nSTAYS TRACEABLE.",
      desc: "Monitor live order status, price alerts, portfolio state, and standing instructions with absolute clarity.",
      visual: (
        <div className="relative w-full max-w-lg mx-auto md:ml-auto">
          <div className="grid grid-cols-2 gap-4 font-mono text-xs tracking-widest uppercase">
            <div className="bg-background rounded-lg p-5 border border-borderLight flex flex-col gap-3 shadow-xl">
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-glow-cyan animate-pulse" />
              <span className="text-text-secondary">Order Status</span>
            </div>
            <div className="bg-background rounded-lg p-5 border border-borderLight flex flex-col gap-3 shadow-xl">
              <div className="w-2 h-2 rounded-full bg-neon-amber shadow-glow-amber animate-pulse" />
              <span className="text-text-secondary">Alerts</span>
            </div>
            <div className="bg-background rounded-lg p-5 border border-borderLight flex flex-col gap-3 shadow-xl">
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-glow-purple" />
              <span className="text-text-secondary">Portfolio</span>
            </div>
            <div className="bg-background rounded-lg p-5 border border-borderLight flex flex-col gap-3 shadow-xl border-cyan-500/30 bg-cyan-900/5">
              <div className="w-2 h-2 rounded-full bg-neon-green shadow-glow-green" />
              <span className="text-text-primary">Trace Log</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="product" className="relative z-30 min-h-screen py-32 flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 xl:px-24">
        
        {/* Editorial Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="text-xs font-mono text-cyan-500 mb-6 tracking-widest flex items-center gap-4">
            <span className="w-12 h-px bg-cyan-500/50"></span>
            CORE CAPABILITIES
          </div>
          <h2 className="text-[clamp(3rem,6vw,5rem)] font-light text-text-primary tracking-[-0.02em] leading-[1.1] max-w-4xl">
            THE TRADING COPILOT
          </h2>
          <p className="mt-8 text-xl text-text-secondary max-w-2xl font-light leading-relaxed">
            TradeGuard AI turns natural-language intent into structured, validated trading actions — while keeping execution strictly under your control.
          </p>
        </motion.div>

        {/* Feature Sequence */}
        <div className="flex flex-col gap-32 md:gap-48">
          {features.map((feature) => (
            <motion.div 
              key={feature.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row items-center gap-12 lg:gap-24"
            >
              <div className="w-full md:w-1/2 flex flex-col">
                <div className="text-cyan-500/30 font-mono text-6xl md:text-8xl font-light mb-6 tracking-tighter">
                  {feature.num}
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-text-primary tracking-[-0.02em] leading-[1.1] mb-6 whitespace-pre-line">
                  {feature.heading}
                </h3>
                <p className="text-lg text-text-secondary font-light leading-relaxed max-w-md">
                  {feature.desc}
                </p>
              </div>
              <div className="w-full md:w-1/2">
                {feature.visual}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
