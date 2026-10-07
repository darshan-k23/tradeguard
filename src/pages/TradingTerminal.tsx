import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from '../components/terminal/Sidebar';
import { TopBar } from '../components/terminal/TopBar';
import { EquityChart } from '../components/terminal/EquityChart';
import { HoldingsTable } from '../components/terminal/HoldingsTable';
import { CopilotPanel } from '../components/terminal/copilot';
import { MetricCard } from '../components/ui/MetricCard';
import { InstructionsView } from '../components/terminal/instructions/InstructionsView';
import { AnimatedNumber } from '../components/ui/AnimatedNumber';
import { MarketScene } from '../components/3d/MarketScene';

export function TradingTerminal() {
  const { tab } = useParams<{ tab: string }>();
  const activeTab = tab || 'command';

  return (
    <div className="flex h-screen w-screen bg-background overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10 md:opacity-30">
          <MarketScene />
        </div>
        
        <TopBar />
        
        <main className="flex-1 overflow-y-auto lg:overflow-hidden z-10 pb-[72px] md:pb-0 relative">
          
          {activeTab === 'command' && (
            <div className="h-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_420px] lg:grid-rows-[auto_minmax(0,1fr)] gap-4 md:gap-6 p-4 md:p-6 lg:p-0 lg:gap-0">
              
              {/* 1. Metrics */}
              <motion.div 
                initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                className="lg:col-start-1 lg:row-start-1 lg:p-6 lg:pb-3 flex flex-col gap-4"
              >
                <div className="flex overflow-x-auto snap-x md:grid md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4 pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
                  <motion.div variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }} className="w-64 md:w-auto shrink-0 snap-center">
                    <MetricCard label="Portfolio Value" value={<AnimatedNumber value={1245600.00} prefix="₹" />} trend="up" trendValue="1.2% (₹14,947)" className="bg-surface/50 border-borderLight h-full backdrop-blur-md" />
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }} className="w-64 md:w-auto shrink-0 snap-center">
                    <MetricCard label="Day P&L" value={<span className="text-neon-green">+<AnimatedNumber value={27292.50} prefix="₹" /></span>} trend="up" trendValue="2.4%" className="bg-surface/50 border-borderLight h-full backdrop-blur-md" />
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }} className="w-64 md:w-auto shrink-0 snap-center">
                    <MetricCard label="Available Cash" value={<AnimatedNumber value={350000.00} prefix="₹" />} className="bg-surface/50 border-borderLight h-full backdrop-blur-md" />
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }} className="w-64 md:w-auto shrink-0 snap-center">
                    <MetricCard label="Active Orders" value="3 Pending" className="bg-surface/50 border-borderLight h-full backdrop-blur-md" />
                  </motion.div>
                </div>
              </motion.div>

              {/* 2. Copilot */}
              <motion.div 
                className="lg:col-start-2 lg:row-start-1 lg:row-span-2 h-[500px] lg:h-full w-full border border-borderLight lg:border-0 lg:border-l lg:border-borderLight rounded-xl lg:rounded-none overflow-hidden shrink-0 shadow-lg lg:shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-20"
              >
                <CopilotPanel />
              </motion.div>

              {/* 3. Holdings & Chart */}
              <motion.div 
                className="lg:col-start-1 lg:row-start-2 lg:p-6 lg:pt-3 flex flex-col gap-6 lg:overflow-y-auto no-scrollbar"
              >
                <div className="hidden md:flex h-64 lg:h-80 w-full shrink-0">
                  <EquityChart />
                </div>
                <div className="flex-1 flex min-h-[300px]">
                  <HoldingsTable />
                </div>
              </motion.div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="p-4 md:p-6 h-full">
              <InstructionsView />
            </div>
          )}

          {!['command', 'instructions'].includes(activeTab) && (
            <div className="flex-1 flex items-center justify-center flex-col gap-4 opacity-50 h-full">
              <span className="text-cyan-500 animate-pulse text-4xl">. . .</span>
              <p className="text-text-secondary font-mono uppercase tracking-widest text-sm">Work in progress</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
