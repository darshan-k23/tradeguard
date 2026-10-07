import { useState, useEffect } from 'react';

type Listener = () => void;

interface MarketData {
  [symbol: string]: {
    price: number;
    change: number;
    changePercent: number;
  };
}

class MarketStore {
  private data: MarketData = {
    TCS: { price: 3890.45, change: 45.20, changePercent: 1.18 },
    RELIANCE: { price: 2950.00, change: -15.50, changePercent: -0.52 },
    HDFCBANK: { price: 1530.20, change: -12.40, changePercent: -0.80 },
    INFY: { price: 1420.75, change: 10.25, changePercent: 0.73 }
  };
  private listeners: Set<Listener> = new Set();

  get(symbol: string) {
    return this.data[symbol] || { price: 1000.00, change: 0, changePercent: 0 };
  }

  getAll() {
    return this.data;
  }

  updatePrice(symbol: string, newPrice: number) {
    if (!this.data[symbol]) return;
    
    const oldPrice = this.data[symbol].price;
    const change = newPrice - oldPrice; // simplistic mock
    const changePercent = (change / oldPrice) * 100;
    
    this.data[symbol] = {
      price: newPrice,
      change: this.data[symbol].change + change,
      changePercent: this.data[symbol].changePercent + changePercent
    };
    
    this.notify();
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }
}

export const marketStore = new MarketStore();

export function useMarketStore() {
  const [data, setData] = useState(marketStore.getAll());

  useEffect(() => {
    const handleUpdate = () => {
      // Create a new object to trigger React re-render
      setData({ ...marketStore.getAll() });
    };
    return marketStore.subscribe(handleUpdate);
  }, []);

  return data;
}

