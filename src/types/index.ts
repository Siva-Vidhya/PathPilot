export type OrderStatus = 'pending' | 'in-transit' | 'delivered' | 'failed' | 'cancelled';

export interface DeliveryOrder {
  id: string;
  customerName: string;
  address: string;
  lat: number;
  lng: number;
  status: OrderStatus;
  priority: 'low' | 'medium' | 'high';
  scheduledTime: string;
  predictedAvailability: number; // 0-1 confidence
  predictedTime: string;
  clusterId?: string;
  items: number;
  reason?: string;
  commStatus?: 'none' | 'sent' | 'delivered' | 'read';
  agentId?: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: 'active' | 'offline' | 'on-break';
  currentOrderId?: string;
  completedToday: number;
  successRate: number;
  efficiencyScore: number;
  workload: number; // 0-100
  location?: [number, number];
}

export interface SimulationState {
  trafficCondition: 'normal' | 'heavy' | 'jam';
  currentTime: string;
  activeOrders: DeliveryOrder[];
  agents: Agent[];
  systemAccuracy: number;
  isDemoMode: boolean;
}

export interface Activity {
  id: string;
  type: 'order_update' | 'ai_decision' | 'agent_alert' | 'route_change' | 'comm_update';
  message: string;
  timestamp: string;
  impact?: string;
}
