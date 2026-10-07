export function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative z-30 border-t border-borderLight/30 bg-background py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-glow-cyan animate-pulse"></span>
            <span className="font-bold text-lg tracking-widest text-text-primary">PS-04</span>
          </div>
          <span className="text-sm font-mono tracking-widest text-text-secondary">TRADEGUARD AI</span>
          <span className="text-xs text-text-tertiary">"Safe natural-language trading copilot"</span>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono tracking-widest uppercase text-text-secondary">
          <button onClick={() => scrollTo('product')} className="hover:text-cyan-500 transition-colors">Product</button>
          <button onClick={() => scrollTo('how-it-works')} className="hover:text-cyan-500 transition-colors">How It Works</button>
          <button onClick={() => scrollTo('security')} className="hover:text-cyan-500 transition-colors">Security</button>
        </div>

      </div>
    </footer>
  );
}
