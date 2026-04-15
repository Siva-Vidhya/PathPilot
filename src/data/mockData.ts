import type { DeliveryOrder, Agent, Activity } from '../types';

const now = new Date().toISOString();

export const initialOrders: DeliveryOrder[] = [
  {
    id: 'ORD-INT-8201',
    customerName: 'Rajesh Kumar',
    address: 'Nungambakkam High Rd, Chennai',
    status: 'in-transit',
    priority: 'high',
    predictedAvailability: 0.94,
    predictedTime: '14:20 - 14:45',
    scheduledTime: '14:30',
    lat: 13.0581,
    lng: 80.2376,
    clusterId: 'CHENNAI-NORTH-1',
    commStatus: 'delivered',
    agentId: 'AGENT-01'
  },
  {
    id: 'ORD-INT-8202',
    customerName: 'Priya Sharma',
    address: 'Mylapore Bazaar St, Chennai',
    status: 'pending',
    priority: 'medium',
    predictedAvailability: 0.42,
    predictedTime: '15:10 - 15:40',
    scheduledTime: '15:30',
    lat: 13.0330,
    lng: 80.2677,
    clusterId: 'CHENNAI-SOUTH-A'
  },
  {
    id: 'ORD-INT-8203',
    customerName: 'Sanjay Viswanathan',
    address: 'Adyar Main Rd, Chennai',
    status: 'in-transit',
    priority: 'high',
    predictedAvailability: 0.88,
    predictedTime: '14:50 - 15:15',
    scheduledTime: '15:00',
    lat: 13.0067,
    lng: 80.2571,
    clusterId: 'CHENNAI-SOUTH-A',
    commStatus: 'none',
    agentId: 'AGENT-01'
  },
  {
    id: 'ORD-INT-8204',
    customerName: 'Ananya Iyer',
    address: 'T. Nagar, Usman Rd, Chennai',
    status: 'pending',
    priority: 'low',
    predictedAvailability: 0.15,
    predictedTime: '16:00 - 16:30',
    scheduledTime: '16:15',
    lat: 13.0418,
    lng: 80.2341,
    clusterId: 'CHENNAI-NORTH-1'
  },
  {
    id: 'ORD-INT-8205',
    customerName: 'Vikram Singh',
    address: 'Guindy Industrial Estate, Chennai',
    status: 'delivered',
    priority: 'high',
    predictedAvailability: 0.98,
    predictedTime: '11:45 - 12:10',
    scheduledTime: '12:00',
    lat: 13.0067,
    lng: 80.2206,
    clusterId: 'CHENNAI-SOUTH-A',
    commStatus: 'read',
    agentId: 'AGENT-02'
  }
];

export const initialAgents: Agent[] = [
  {
    id: 'AGENT-01',
    name: 'Arjun Reddy',
    status: 'active',
    efficiencyScore: 92,
    completedToday: 14,
    successRate: 98,
    avatar: 'https://i.pravatar.cc/150?u=arjun',
    workload: 65,
    lat: 13.0827,
    lng: 80.2707
  },
  {
    id: 'AGENT-02',
    name: 'Kavita Rao',
    status: 'active',
    efficiencyScore: 88,
    completedToday: 11,
    successRate: 94,
    avatar: 'https://i.pravatar.cc/150?u=kavita',
    workload: 85,
    lat: 13.0100,
    lng: 80.2200
  },
  {
    id: 'AGENT-03',
    name: 'Rohan Gupta',
    status: 'on-break',
    efficiencyScore: 95,
    completedToday: 9,
    successRate: 99,
    avatar: 'https://i.pravatar.cc/150?u=rohan',
    workload: 40,
    lat: 13.0500,
    lng: 80.2500
  }
];

export const initialActivities: Activity[] = [
  {
    id: '1',
    type: 'ai_decision',
    message: 'Operational context shifted to Chennai Hub.',
    timestamp: '2 mins ago',
    impact: 'Localized'
  },
  {
    id: '2',
    type: 'comm_update',
    message: 'Customer Rajesh Kumar notified of arrival.',
    timestamp: '5 mins ago',
    impact: 'Engagement +'
  },
  {
    id: '3',
    type: 'system_alert',
    message: 'Heavy traffic detected on Anna Salai.',
    timestamp: '12 mins ago',
    impact: 'ETA +8m'
  }
];
