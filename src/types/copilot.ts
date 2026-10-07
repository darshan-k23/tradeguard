export type MessageType = 'text' | 'order_preview' | 'order_monitor' | 'metric_card' | 'stock_card' | 'system_alert';

export type OrderState = 
  | 'DRAFT'
  | 'VALIDATED'
  | 'AWAITING_APPROVAL'
  | 'APPROVED'
  | 'SUBMITTING'
  | 'SUBMITTED'
  | 'PARTIALLY_FILLED'
  | 'FILLED'
  | 'REJECTED'
  | 'FAILED';

export interface BaseChatMessage {
  id: string;
  sender: 'user' | 'sentinel' | 'system';
  timestamp: Date;
}

export interface TextMessage extends BaseChatMessage {
  type: 'text';
  content: string;
}

export interface OrderPreviewPayload {
  id?: string;
  status?: OrderState;
  action: 'BUY' | 'SELL' | 'MODIFY' | 'CANCEL';
  symbol: string;
  qty: number | string;
  orderType: 'MARKET' | 'LIMIT' | 'SL' | 'SL-M';
  price?: number | string;
  product?: 'CNC' | 'MIS' | 'NRML';
}

export interface OrderPreviewMessage extends BaseChatMessage {
  type: 'order_preview';
  payload: OrderPreviewPayload;
}

export interface OrderMonitorPayload {
  id: string;
  status: OrderState;
  action: 'BUY' | 'SELL' | 'MODIFY' | 'CANCEL';
  symbol: string;
  qty: number | string;
  orderType: 'MARKET' | 'LIMIT' | 'SL' | 'SL-M';
  price?: number | string;
  product?: 'CNC' | 'MIS' | 'NRML';
  filledQty?: number;
  avgPrice?: number;
}

export interface OrderMonitorMessage extends BaseChatMessage {
  type: 'order_monitor';
  payload: OrderMonitorPayload;
}

export interface MetricCardPayload {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export interface MetricCardMessage extends BaseChatMessage {
  type: 'metric_card';
  payload: MetricCardPayload;
}

export interface StockCardPayload {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface StockCardMessage extends BaseChatMessage {
  type: 'stock_card';
  payload: StockCardPayload;
}

export interface SystemAlertPayload {
  title: string;
  message: string;
  level: 'info' | 'warning' | 'error' | 'success';
}

export interface SystemAlertMessage extends BaseChatMessage {
  type: 'system_alert';
  payload: SystemAlertPayload;
}

export type ChatMessage = 
  | TextMessage 
  | OrderPreviewMessage 
  | OrderMonitorMessage 
  | MetricCardMessage 
  | StockCardMessage 
  | SystemAlertMessage;
