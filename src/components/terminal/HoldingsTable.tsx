import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { marketStore, useMarketStore } from '../../store/marketStore';

const INITIAL_HOLDINGS = [
  { id: 1, symbol: 'TCS', company: 'Tata Consultancy Services', qty: 150, avg: 3650.00, ltp: 3890.45, pnl: 36067.50 },
  { id: 2, symbol: 'RELIANCE', company: 'Reliance Industries', qty: 200, avg: 2800.00, ltp: 2950.00, pnl: 30000.00 },
  { id: 3, symbol: 'HDFC', company: 'HDFC Bank Ltd.', qty: 500, avg: 1600.00, ltp: 1560.20, pnl: -19900.00 },
  { id: 4, symbol: 'INFY', company: 'Infosys Limited', qty: 300, avg: 1550.00, ltp: 1420.75, pnl: -38775.00 },
];

export function HoldingsTable() {
  const marketData = useMarketStore();
  const [tickTracker, setTickTracker] = useState<Record<number, 'up'|'down'|null>>({});

  const holdings = INITIAL_HOLDINGS.map(h => {
    const market = marketData[h.symbol] || { price: h.ltp };
    return {
      ...h,
      ltp: market.price,
      pnl: (market.price - h.avg) * h.qty
    };
  });

  // Simulate live price updates across the shared market store
  useEffect(() => {
    const interval = setInterval(() => {
      const updates: Record<number, 'up'|'down'> = {};
      
      // Randomly update 1 or 2 stocks
      const numUpdates = Math.floor(Math.random() * 2) + 1;
      for (let i=0; i<numUpdates; i++) {
        const idx = Math.floor(Math.random() * INITIAL_HOLDINGS.length);
        const stock = INITIAL_HOLDINGS[idx];
        const change = (Math.random() - 0.5) * 5; // -2.5 to +2.5
        
        const oldPrice = marketStore.get(stock.symbol).price;
        marketStore.updatePrice(stock.symbol, oldPrice + change);
        
        updates[stock.id] = change >= 0 ? 'up' : 'down';
      }
      
      setTickTracker(updates);

      // Clear the highlight after 500ms
      setTimeout(() => setTickTracker({}), 500);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-surface/30 border border-borderLight rounded-lg overflow-hidden flex flex-col shadow-lg">
      <div className="px-4 py-3 border-b border-borderLight flex justify-between items-center bg-surface/50">
        <h3 className="font-medium text-text-primary uppercase tracking-wide text-sm">Holdings</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left" aria-label="Portfolio Holdings">
          <thead className="text-xs uppercase bg-surface/80 text-text-secondary font-mono border-b border-borderLight">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Symbol</th>
              <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Company</th>
              <th scope="col" className="px-4 py-3 font-medium text-right">Qty</th>
              <th scope="col" className="px-4 py-3 font-medium text-right">Avg Price</th>
              <th scope="col" className="px-4 py-3 font-medium text-right">LTP</th>
              <th scope="col" className="px-4 py-3 font-medium text-right">Change (%)</th>
              <th scope="col" className="px-4 py-3 font-medium text-right">P&L</th>
              <th scope="col" className="px-4 py-3 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody className="font-mono" aria-live="polite">
            {holdings.map((h) => {
              const changePct = ((h.ltp - h.avg) / h.avg) * 100;
              const isProfit = h.pnl >= 0;
              const tick = tickTracker[h.id];

              return (
                <tr key={h.id} className="border-b border-borderLight/50 hover:bg-surfaceHover/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-text-primary font-sans">{h.symbol}</td>
                  <td className="px-4 py-3 text-text-tertiary hidden md:table-cell font-sans truncate max-w-[150px]">{h.company}</td>
                  <td className="px-4 py-3 text-right text-text-secondary">{h.qty}</td>
                  <td className="px-4 py-3 text-right text-text-secondary">₹{h.avg.toFixed(2)}</td>
                  
                  <motion.td 
                    className={`px-4 py-3 text-right ${tick === 'up' ? 'text-neon-green' : tick === 'down' ? 'text-neon-red' : 'text-text-primary'}`}
                    animate={{ backgroundColor: tick === 'up' ? 'rgba(0,255,102,0.1)' : tick === 'down' ? 'rgba(255,51,102,0.1)' : 'transparent' }}
                    transition={{ duration: 0.3 }}
                  >
                    ₹{h.ltp.toFixed(2)}
                  </motion.td>
                  
                  <td className={`px-4 py-3 text-right ${isProfit ? 'text-neon-green' : 'text-neon-red'}`}>
                    {changePct > 0 ? '+' : ''}{changePct.toFixed(2)}%
                  </td>
                  
                  <td className={`px-4 py-3 text-right font-medium ${isProfit ? 'text-neon-green' : 'text-neon-red'}`}>
                    {isProfit ? '+' : ''}₹{h.pnl.toFixed(2)}
                  </td>
                  
                  <td className="px-4 py-2 text-center">
                    <button aria-label={`Trade ${h.symbol}`} className="px-3 py-1 text-xs border border-borderLight text-text-secondary hover:text-cyan-500 hover:border-cyan-500/50 rounded transition-colors font-sans uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
                      Trade
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
