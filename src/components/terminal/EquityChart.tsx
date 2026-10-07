import { motion } from 'framer-motion';

export function EquityChart() {
  const points = "M 0 200 C 100 150, 200 250, 300 150 S 500 50, 600 100 S 800 200, 900 100 S 1000 50, 1200 80";
  const areaPoints = `${points} L 1200 300 L 0 300 Z`;

  return (
    <div className="flex-1 w-full relative flex flex-col p-6 rounded-lg bg-surface/30 border border-borderLight overflow-hidden">
      <div className="flex justify-between items-center z-10 relative">
        <h3 className="font-medium text-text-primary uppercase tracking-wide text-sm">Equity Curve</h3>
        <div className="flex gap-2 font-mono text-xs">
          {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((tf, i) => (
            <button key={i} className={`px-3 py-1 rounded transition-colors ${tf === '1M' ? 'bg-cyan-500/20 text-cyan-500 border border-cyan-500/30' : 'text-text-tertiary hover:text-text-secondary'}`}>
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0 z-0 pt-16">
        <svg viewBox="0 0 1200 300" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={areaPoints}
            fill="url(#chartGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.path
            d={points}
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </div>
  );
}
