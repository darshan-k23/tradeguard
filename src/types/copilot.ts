export type MessageType = 
  | 'text' 
  | 'read_only_result'
  | 'order_preview' 
  | 'approval_required'
  | 'order_status'
  | 'system_alert';

export type OrderState = 
  | 'PREPARED'
  | 'VALIDATED'
  | 'AWAITING_APPROVAL'
  | 'APPROVED'
  | 'SUBMITTING'
  | 'SUBMITTED'
  | 'PARTIALLY_FILLED'
  | 'FILLED'
  | 'REJECTED'
  | 'FAILED';

export interface PreparedOrder {
  id: string;
  approvalId: string;
  action: 'BUY' | 'SELL' | 'MODIFY' | 'CANCEL';
  symbol: string;
  quantity: number | string;
  orderType: 'MARKET' | 'LIMIT' | 'SL' | 'SL-M';
  price?: number | string; // For limit/trigger prices
  product: 'CNC' | 'MIS' | 'NRML';
  estimatedValue?: number;
  status: OrderState;
  
  // Useful for MODIFY/CANCEL
  targetOrderId?: string;
  originalOrder?: Partial<PreparedOrder>;
}

export interface BaseChatMessage {
  id: string;
  sender: 'user' | 'tradeguard' | 'system';
  timestamp: Date;
}

export interface TextMessage extends BaseChatMessage {
  type: 'text';
  content: string;
}

export interface ReadOnlyResultMessage extends BaseChatMessage {
  type: 'read_only_result';
  payload: {
    resultType: 'metric' | 'stock' | 'generic';
    data: any;
  };
}

export interface OrderPreviewMessage extends BaseChatMessage {
  type: 'order_preview';
  payload: {
    order: PreparedOrder;
  };
}

export interface ApprovalRequiredMessage extends BaseChatMessage {
  type: 'approval_required';
  payload: {
    order: PreparedOrder;
  };
}

export interface OrderStatusMessage extends BaseChatMessage {
  type: 'order_status';
  payload: {
    order: PreparedOrder;
    filledQty?: number;
    avgPrice?: number;
    message?: string; // Reason for rejection or failure
  };
}

export interface SystemAlertMessage extends BaseChatMessage {
  type: 'system_alert';
  payload: {
    title: string;
    message: string;
    level: 'info' | 'warning' | 'error' | 'success';
  };
}

export type ChatMessage = 
  | TextMessage 
  | ReadOnlyResultMessage
  | OrderPreviewMessage 
  | ApprovalRequiredMessage
  | OrderStatusMessage
  | SystemAlertMessage;
