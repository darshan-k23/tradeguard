import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MarketScene } from '../components/3d/MarketScene';
import { GlowButton } from '../components/ui/GlowButton';
import { Pill } from '../components/ui/Pill';
import { StatusBadge } from '../components/ui/StatusBadge';
import { ProductSection } from '../components/landing/ProductSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { SecuritySection } from '../components/landing/SecuritySection';
import { Footer } from '../components/landing/Footer';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onEnter: () => void;
}

const TICKER_DATA = [
  { symbol: 'NIFTY 50', price: '22,450.00', change: 1.2 },
  { symbol: 'BANKNIFTY', price: '47,520.10', change: -0.5 },
  { symbol: 'TCS', price: '3,890.45', change: 2.1 },
  { symbol: 'RELIANCE', price: '2,950.00', change: 0.8 },
  { symbol: 'INFY', price: '1,420.75', change: -1.1 },
  { symbol: 'HDFC', price: '1,560.20', change: 1.5 },
];

function GridBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
    </div>
  );
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'product', 'how-it-works', 'security'];
      let current = 'hero';
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element && window.scrollY >= element.offsetTop - window.innerHeight / 3) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden font-sans">
      
      {/* Navigation - Fixed to top */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-6 lg:px-8 py-4 lg:py-6 bg-background/40 backdrop-blur-xl border-b border-borderLight/30"
      >
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-md p-1">
          <span className="w-3 h-3 rounded-full bg-cyan-500 shadow-glow-cyan animate-pulse group-hover:bg-cyan-400 transition-colors"></span>
          <span className="font-bold text-xl tracking-widest text-text-primary group-hover:text-white transition-colors">PS-04</span>
        </button>
        
        <div className="hidden md:flex items-center gap-8 text-xs font-mono font-medium tracking-widest text-text-secondary uppercase">
          <button 
            onClick={() => scrollTo('product')} 
            className={cn("transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded px-2 py-1", activeSection === 'product' ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)] border-b border-cyan-500/50" : "hover:text-cyan-500 border-b border-transparent")}
          >
            Product
          </button>
          <button 
            onClick={() => scrollTo('how-it-works')} 
            className={cn("transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded px-2 py-1", activeSection === 'how-it-works' ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)] border-b border-cyan-500/50" : "hover:text-cyan-500 border-b border-transparent")}
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollTo('security')} 
            className={cn("transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded px-2 py-1", activeSection === 'security' ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)] border-b border-cyan-500/50" : "hover:text-cyan-500 border-b border-transparent")}
          >
            Security
          </button>
        </div>

        <GlowButton variant="secondary" onClick={onEnter} className="font-mono uppercase text-xs tracking-wider border-cyan-500/30 text-cyan-500 px-4 py-2">
          Enter Copilot
        </GlowButton>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen min-h-[600px] flex flex-col justify-center">
        {/* 1. Background Grid */}
        <GridBackground />

        {/* 2. 3D Core Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          <MarketScene opacity={0.8} scale={1.8} intensity={1.5} />
        </div>

        {/* 3. Floating UI Layer */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-[30%] left-[10%] hidden lg:flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-500">
               <span className="w-8 h-px bg-cyan-500/50"></span>
               AI.CORE.ACTIVE
            </div>
            <div className="glass-panel p-3 text-xs w-56 text-text-secondary border-cyan-500/20 backdrop-blur-md bg-surface/50">
              Real-time intent parsing initialized. Latency: 12ms.
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute top-[25%] right-[10%] hidden lg:flex flex-col items-end gap-2 text-right"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-neon-green">
               MARKET.SYNC
               <span className="w-8 h-px bg-neon-green/50"></span>
            </div>
            <StatusBadge status="online" label="Secure Connection" className="bg-surface/50 border border-borderLight px-3 py-1.5 rounded-md backdrop-blur-md" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="absolute bottom-[20%] right-[15%] hidden lg:flex flex-col items-end gap-2"
          >
             <Pill variant="ai" className="shadow-glow-cyan px-3 py-1">Model: PS-04-Alpha</Pill>
             <div className="font-mono text-xs text-text-tertiary">Awaiting user authorization...</div>
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative z-30 flex-1 flex flex-col items-center justify-center text-center px-4 mt-16 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="pointer-events-auto flex flex-col items-center"
          >
            <Pill variant="outline" className="mb-8 px-4 py-1 border-cyan-500/30 text-cyan-400 bg-cyan-900/10 backdrop-blur-md">
              The Next Evolution in Trading
            </Pill>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-text-primary tracking-tight mb-6 max-w-5xl leading-[1.1]">
              TRADE AT THE <br/>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400">
                SPEED OF THOUGHT
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary font-light max-w-2xl mb-12 leading-relaxed">
              An AI copilot that understands your intent, <br className="hidden md:block" />
              but never trades without your explicit approval.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
              <GlowButton variant="primary" onClick={onEnter} className="px-8 py-4 text-base tracking-widest">
                ENTER COPILOT
              </GlowButton>
              <GlowButton variant="secondary" onClick={() => scrollTo('how-it-works')} className="px-8 py-4 text-base tracking-widest bg-surface/50 backdrop-blur-sm hover:bg-surface transition-colors">
                SEE HOW IT WORKS
              </GlowButton>
            </div>
          </motion.div>
        </div>

        {/* 5. Bottom Ticker Marquee */}
        <div className="absolute bottom-0 left-0 right-0 z-30 w-full h-14 bg-surface/80 backdrop-blur-xl border-t border-b border-borderLight flex items-center overflow-hidden pointer-events-auto">
         <motion.div 
           className="flex gap-16 px-6 whitespace-nowrap items-center font-mono text-sm"
           animate={{ x: [0, -2000] }}
           transition={{ ease: "linear", duration: 40, repeat: Infinity }}
         >
            {/* Duplicate for infinite scrolling effect */}
            {[...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="text-text-primary font-medium tracking-wider">{item.symbol}</span>
                <span className="text-text-secondary">{item.price}</span>
                <span className={item.change >= 0 ? "text-neon-green" : "text-neon-red"}>
                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                </span>
              </div>
            ))}
         </motion.div>
        </div>
      </section>

      {/* 6. Page Content Sections */}
      <ProductSection />
      <HowItWorksSection />
      <SecuritySection />
      <Footer />
    </div>
  );
}
