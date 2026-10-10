import type { PreparedOrder } from '../types/copilot';

// Mock DB for the fake API
const orderDB = new Map<string, PreparedOrder>();

function generateId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export const tradeGuardApi = {
  
  async prepareOrder(params: {
    action: 'BUY' | 'SELL' | 'MODIFY' | 'CANCEL';
    symbol: string;
    quantity: number | string;
    orderType: 'MARKET' | 'LIMIT' | 'SL' | 'SL-M';
    price?: number | string;
    product?: 'CNC' | 'MIS' | 'NRML';
  }): Promise<PreparedOrder> {
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const order: PreparedOrder = {
      id: generateId('ORD'),
      approvalId: generateId('AUTH'),
      action: params.action,
      symbol: params.symbol,
      quantity: params.quantity,
      orderType: params.orderType,
      price: params.price,
      product: params.product || 'CNC',
      status: 'PREPARED',
      // In a real system, the estimated value would come from a live pricing service on the backend
      estimatedValue: params.orderType === 'MARKET' ? undefined : (Number(params.quantity) * Number(params.price))
    };

    orderDB.set(order.approvalId, order);
    orderDB.set(order.id, order);

    return order;
  },

  async approveOrder(approvalId: string): Promise<PreparedOrder> {
    await new Promise(resolve => setTimeout(resolve, 400));
    const order = orderDB.get(approvalId);
    if (!order) throw new Error('Order not found or expired');
    
    // State transition
    order.status = 'SUBMITTING';
    return { ...order };
  },

  async rejectOrder(approvalId: string): Promise<PreparedOrder> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const order = orderDB.get(approvalId);
    if (!order) throw new Error('Order not found');

    order.status = 'REJECTED';
    return { ...order };
  },

  async getOrderStatus(orderId: string): Promise<PreparedOrder> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const order = orderDB.get(orderId);
    if (!order) throw new Error('Order not found');
    
    // Simulate progression from SUBMITTING -> SUBMITTED -> FILLED for demo purposes
    if (order.status === 'SUBMITTING') {
      order.status = 'SUBMITTED';
    } else if (order.status === 'SUBMITTED') {
      order.status = 'FILLED';
    }

    return { ...order };
  }
};
