import { motion } from 'framer-motion';
import { Pill } from '../ui/Pill';

export function ProductSection() {
  return (
    <section id="product" className="relative z-30 min-h-screen py-32 px-4 md:px-12 xl:px-24 flex flex-col justify-center max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-24"
      >
        <Pill variant="ai" className="mb-6 border-cyan-500/30 text-cyan-400 bg-cyan-900/10">CORE CAPABILITIES</Pill>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-text-primary tracking-tight mb-6">
          THE TRADING COPILOT
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl font-light leading-relaxed">
          TradeGuard AI turns natural-language intent into structured, validated trading actions — while keeping execution under the trader's control.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Capability 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-surface/20 border border-borderLight/50 p-8 rounded-sm backdrop-blur-md hover:border-cyan-500/30 transition-colors group relative overflow-hidden"
        >
          {/* Subtle grid background inside card */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          <div className="text-xs font-mono text-cyan-500 mb-4 tracking-widest uppercase">Natural Language</div>
          <h3 className="text-2xl text-text-primary font-medium mb-4">Speak naturally</h3>
          <p className="text-sm text-text-secondary mb-8">Ask questions about your portfolio, market data, positions and options using plain English.</p>
          
          <div className="bg-background rounded-xl p-4 border border-borderLight/50 font-mono text-sm relative overflow-hidden">
            <div className="text-text-tertiary mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary"></span>
              "What's my P&L today?"
            </div>
            <div className="bg-surfaceHover p-3 rounded-lg border border-borderLight flex justify-between items-center relative z-10 group-hover:border-cyan-500/30 transition-colors">
              <span className="text-text-secondary">DAY P&L</span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-neon-green font-bold text-base shadow-glow-green"
              >
                +₹4,280
              </motion.span>
            </div>
            {/* Background decorative glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] pointer-events-none" />
          </div>
        </motion.div>

        {/* Capability 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-surface/20 border border-borderLight/50 p-8 rounded-sm backdrop-blur-md hover:border-cyan-500/30 transition-colors group relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          <div className="text-xs font-mono text-cyan-500 mb-4 tracking-widest uppercase">Smart Order Preparation</div>
          <h3 className="text-2xl text-text-primary font-medium mb-4">Intent becomes an exact order</h3>
          <p className="text-sm text-text-secondary mb-8">TradeGuard structures natural language into exact, deterministic parameters.</p>
          
          <div className="bg-background rounded-xl p-4 border border-borderLight/50 font-mono text-sm">
            <div className="text-text-tertiary mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary"></span>
              "Buy 10 TCS at market"
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-surfaceHover p-2 rounded flex justify-between border border-borderLight group-hover:border-neon-green/30 transition-colors">
                <span className="text-text-secondary">ACTION</span>
                <span className="text-neon-green font-bold">BUY</span>
              </div>
              <div className="bg-surfaceHover p-2 rounded flex justify-between border border-borderLight">
                <span className="text-text-secondary">SYMBOL</span>
                <span className="text-text-primary font-bold">TCS</span>
              </div>
              <div className="bg-surfaceHover p-2 rounded flex justify-between border border-borderLight">
                <span className="text-text-secondary">QTY</span>
                <span className="text-text-primary font-bold">10 SHARES</span>
              </div>
              <div className="bg-surfaceHover p-2 rounded flex justify-between border border-borderLight">
                <span className="text-text-secondary">TYPE</span>
                <span className="text-text-primary font-bold">MARKET</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Capability 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-surface/20 border border-borderLight/50 p-8 rounded-sm backdrop-blur-md hover:border-cyan-500/30 transition-colors group relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          <div className="text-xs font-mono text-cyan-500 mb-4 tracking-widest uppercase">Human Control</div>
          <h3 className="text-2xl text-text-primary font-medium mb-4">AI proposes. You authorize.</h3>
          <p className="text-sm text-text-secondary mb-8">Execution is securely locked behind a deterministic approval boundary.</p>
          
          <div className="bg-background rounded-xl border border-borderLight/50 font-mono text-xs overflow-hidden">
            <div className="bg-surface p-3 border-b border-borderLight flex justify-between items-center text-text-secondary">
              <span>AI PREPARED ORDER</span>
              <span className="text-[10px] text-neon-amber px-2 py-0.5 rounded border border-neon-amber/20 bg-neon-amber/10">🔒 EXECUTION LOCKED</span>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex gap-4 items-center text-base">
                <span className="text-neon-green font-bold tracking-widest">BUY</span>
                <span className="text-text-primary font-bold tracking-widest">TCS</span>
                <span className="text-text-secondary">10 shares</span>
                <span className="text-text-secondary">MARKET</span>
              </div>
              <div className="w-full py-2.5 rounded bg-cyan-900/30 border border-cyan-500/30 text-cyan-500 text-center tracking-widest uppercase font-sans font-medium text-xs group-hover:bg-cyan-500 group-hover:text-background transition-colors">
                APPROVE ORDER
              </div>
            </div>
          </div>
        </motion.div>

        {/* Capability 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-surface/20 border border-borderLight/50 p-8 rounded-sm backdrop-blur-md hover:border-cyan-500/30 transition-colors group relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          <div className="text-xs font-mono text-cyan-500 mb-4 tracking-widest uppercase">Live Control</div>
          <h3 className="text-2xl text-text-primary font-medium mb-4">Stay in control</h3>
          <p className="text-sm text-text-secondary mb-8">Monitor live order status, price alerts, portfolio state, and standing instructions.</p>
          
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="bg-background rounded-lg p-3 border border-borderLight flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-glow-cyan animate-pulse" />
              <span className="text-text-secondary">Order Status</span>
            </div>
            <div className="bg-background rounded-lg p-3 border border-borderLight flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-neon-amber shadow-glow-amber animate-pulse" />
              <span className="text-text-secondary">Price Alerts</span>
            </div>
            <div className="bg-background rounded-lg p-3 border border-borderLight flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-glow-purple" />
              <span className="text-text-secondary">Portfolio State</span>
            </div>
            <div className="bg-background rounded-lg p-3 border border-borderLight flex items-center gap-3 group-hover:border-cyan-500/30 transition-colors">
              <div className="w-2 h-2 rounded-full bg-neon-green shadow-glow-green" />
              <span className="text-text-secondary">Instructions</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
