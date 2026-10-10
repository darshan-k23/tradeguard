import { motion } from 'framer-motion';

const steps = [
  { id: '01', title: 'USER MESSAGE', desc: '"Buy 10 TCS at market"', color: 'text-cyan-500' },
  { id: '02', title: 'AI INTERPRETATION', desc: 'Parsing semantics and context', color: 'text-purple-500' },
  { id: '03', title: 'STRUCTURED INTENT', desc: 'BUY TCS 10 MKT', color: 'text-text-primary' },
  { id: '04', title: 'VALIDATION', desc: 'Deterministic constraints check', color: 'text-neon-amber' },
  { id: '05', title: 'ORDER PREVIEW', desc: 'Locked parameters staged', color: 'text-text-secondary' },
  { id: '06', title: 'APPROVAL', desc: 'Explicit trader signature', color: 'text-neon-green' },
  { id: '07', title: 'EXECUTION', desc: 'Broker routing and live status', color: 'text-cyan-500' },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative z-30 min-h-screen py-32 flex flex-col justify-center bg-background border-t border-borderLight/30">
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 xl:px-24">
        
        {/* Editorial Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-24 flex flex-col items-center text-center"
        >
          <div className="text-xs font-mono text-purple-500 mb-6 tracking-widest flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-purple-500/50"></span>
            THE PIPELINE
            <span className="w-12 h-px bg-purple-500/50"></span>
          </div>
          <h2 className="text-[clamp(3rem,6vw,5rem)] font-light text-text-primary tracking-[-0.02em] leading-[1.1] max-w-4xl">
            HOW TRADEGUARD THINKS
          </h2>
          <p className="mt-8 text-xl text-text-secondary max-w-2xl font-light leading-relaxed">
            Your words become a validated trade — never an uncontrolled one. A strict, unidirectional processing pipeline guarantees safety.
          </p>
        </motion.div>

        {/* Pipeline Diagram */}
        <div className="relative mt-24">
          
          {/* Desktop Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-borderLight/30 -translate-y-1/2" />
          
          {/* Mobile Line */}
          <div className="block lg:hidden absolute left-4 top-0 bottom-0 w-px bg-borderLight/30" />

          {/* Steps */}
          <div className="flex flex-col lg:flex-row justify-between relative z-10 gap-12 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-row lg:flex-col items-center lg:items-center gap-6 lg:gap-8 group relative lg:flex-1"
              >
                {/* Node */}
                <div className="relative w-8 h-8 rounded-full bg-background border-2 border-borderLight flex items-center justify-center z-10 group-hover:border-text-primary transition-colors flex-shrink-0 lg:w-4 lg:h-4 lg:border-[3px]">
                  {/* Subtle pulse for active feel on hover */}
                  <div className="absolute inset-0 rounded-full bg-text-primary scale-0 group-hover:scale-50 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="flex flex-col lg:items-center lg:text-center mt-0 lg:-mt-2 w-full">
                  <span className={`text-[10px] font-mono tracking-widest uppercase mb-2 ${step.color}`}>
                    {step.title}
                  </span>
                  <span className="text-sm text-text-secondary font-light max-w-[140px]">
                    {step.desc}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animated Flow Particle (Desktop) */}
          <motion.div 
            className="hidden lg:block absolute top-1/2 left-0 w-16 h-px bg-cyan-500 shadow-[0_0_8px_rgba(0,240,255,0.8)] -translate-y-1/2"
            animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          />

          {/* Animated Flow Particle (Mobile) */}
          <motion.div 
            className="block lg:hidden absolute top-0 left-4 w-px h-16 bg-cyan-500 shadow-[0_0_8px_rgba(0,240,255,0.8)] -translate-x-1/2"
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          />
        </div>

      </div>
    </section>
  );
}
