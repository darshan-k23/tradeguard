import type { ChatMessage } from '../types/copilot';
import { marketStore } from '../store/marketStore';

export async function processIntent(text: string): Promise<ChatMessage[]> {
  const lowerText = text.toLowerCase();
  const messages: ChatMessage[] = [];

  const createMsg = (type: ChatMessage['type'], content?: string, payload?: any): ChatMessage => ({
    id: Date.now().toString() + Math.random().toString(36).substring(7),
    sender: type === 'system_alert' ? 'system' : 'sentinel',
    type,
    content,
    payload,
    timestamp: new Date()
  } as ChatMessage);

  // 1. P&L Query
  if (lowerText.includes("p&l") || lowerText.includes("profit")) {
    messages.push(createMsg('text', "Here's your current Day P&L summary:"));
    messages.push(createMsg('metric_card', undefined, {
      label: "Day P&L",
      value: "₹27,292.50",
      trend: "up",
      trendValue: "2.4%"
    }));
    return messages;
  }

  // 2. Losing Positions Query
  if (lowerText.includes("losing") || lowerText.includes("loss")) {
    const hdfc = marketStore.get("HDFCBANK");
    messages.push(createMsg('text', "These positions are currently trading below your average entry price:"));
    messages.push(createMsg('stock_card', undefined, {
      symbol: "HDFCBANK",
      price: hdfc.price,
      change: hdfc.change,
      changePercent: hdfc.changePercent
    }));
    return messages;
  }

  // 3. Alerts
  if (lowerText.includes("alert")) {
    const pctMatch = text.match(/(\w+)\s+(falls|rises|drops|jumps)\s+(\d+)%/i);
    const valMatch = text.match(/(\w+)\s+crosses\s+(\d+)/i);
    
    if (pctMatch) {
      const [, symbol, dir, pct] = pctMatch;
      messages.push(createMsg('system_alert', undefined, {
        title: "Alert Registered",
        message: `I will monitor ${symbol.toUpperCase()} and alert you if it ${dir.toLowerCase()} by ${pct}%.`,
        level: "info"
      }));
      return messages;
    }
    
    if (valMatch) {
      const [, symbol, price] = valMatch;
      messages.push(createMsg('system_alert', undefined, {
        title: "Alert Registered",
        message: `I will notify you when ${symbol.toUpperCase()} crosses ₹${price}.`,
        level: "info"
      }));
      return messages;
    }
  }

  // 4. Orders
  if (lowerText.includes("buy") || lowerText.includes("sell")) {
    const action = lowerText.includes("buy") ? 'BUY' : 'SELL';
    const orderRegex = /(\d+)\s+([a-zA-Z]+)/gi;
    let match;
    let found = false;

    while ((match = orderRegex.exec(text)) !== null) {
      found = true;
      const qty = parseInt(match[1], 10);
      const symbol = match[2].toUpperCase();
      
      const orderId = `ORD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      const marketData = marketStore.get(symbol);

      messages.push(createMsg('order_preview', undefined, {
        id: orderId,
        action,
        symbol,
        qty,
        orderType: 'MARKET',
        price: marketData.price,
        product: 'CNC'
      }));
    }

    if (found) {
      messages.unshift(createMsg('text', "I have prepared the order previews for your review:"));
      return messages;
    }
  }

  // Default fallback
  messages.push(createMsg('text', "I have analyzed your intent. Currently, portfolio margin allows for this position sizing. Would you like to proceed with a detailed risk analysis?"));
  return messages;
}
