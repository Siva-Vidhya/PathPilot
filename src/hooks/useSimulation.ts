import { useState, useCallback, useEffect, useRef } from 'react';
import { initialOrders, initialAgents, initialActivities } from '../data/mockData';
import type { DeliveryOrder, Agent, OrderStatus, Activity } from '../types';

const CHENNAI_CENTER: [number, number] = [13.0827, 80.2707];

export const useSimulation = () => {
  const [orders, setOrders] = useState<DeliveryOrder[]>(initialOrders);
  const [unoptimizedOrders, setUnoptimizedOrders] = useState<DeliveryOrder[]>(initialOrders);
  const [isOptimized, setIsOptimized] = useState(false);
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [traffic, setTraffic] = useState<'normal' | 'heavy' | 'jam'>('normal');
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [systemAccuracy, setSystemAccuracy] = useState(94.2);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  
  const timerRef = useRef<any>(null);

  const addActivity = useCallback((type: Activity['type'], message: string, impact?: string) => {
    const newActivity: Activity = {
      id: `ACT-${Date.now()}`,
      type,
      message,
      timestamp: 'Just now',
      impact
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus, reason?: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status, reason, updatedAt: new Date().toISOString() } : order
    ));
    if (status === 'delivered') {
      setSystemAccuracy(prev => Math.min(99.9, prev + 0.1));
      addActivity('order_update', `Order ${orderId} delivered successfully`, 'Accuracy improved');
    } else if (status === 'failed') {
      setSystemAccuracy(prev => Math.max(80, prev - 0.3));
      addActivity('ai_decision', `AI resolved failed delivery for ${orderId}`, 'Model recalibrating');
    }
  }, [addActivity]);

  const notifyCustomer = useCallback((orderId: string) => {
    const sequence: ('sent' | 'delivered' | 'read')[] = ['sent', 'delivered', 'read'];
    let step = 0;
    
    const interval = setInterval(() => {
      setOrders(prev => prev.map(o => 
        o.id === orderId ? { ...o, commStatus: sequence[step] } : o
      ));
      step++;
      if (step === sequence.length) {
        clearInterval(interval);
        addActivity('comm_update', `Customer notified for ${orderId}`, 'Engagement high');
      }
    }, 2000);
  }, [addActivity]);

  const optimizeRoutes = useCallback(() => {
    setOrders(prev => {
      // Keep a "Before" copy if not already optimized
      if (!isOptimized) {
        setUnoptimizedOrders([...prev]);
      }
      
      const pending = prev.filter(o => o.status === 'pending');
      const others = prev.filter(o => o.status !== 'pending');
      
      const optimized = [...pending].sort((a, b) => {
        const priorityScore = { high: 0, medium: 1, low: 2 };
        if (priorityScore[a.priority] !== priorityScore[b.priority]) {
          return priorityScore[a.priority] - priorityScore[b.priority];
        }
        // Spatial clustering: distance from Chennai center
        const distA = Math.sqrt(Math.pow(a.lat - CHENNAI_CENTER[0], 2) + Math.pow(a.lng - CHENNAI_CENTER[1], 2));
        const distB = Math.sqrt(Math.pow(b.lat - CHENNAI_CENTER[0], 2) + Math.pow(b.lng - CHENNAI_CENTER[1], 2));
        return distA - distB;
      });

      return [...others, ...optimized];
    });
    
    setIsOptimized(true);
    addActivity('route_change', 'AI optimized delivery sequence for Chennai Hub', 'Saved 18 mins');
    setNotification({ message: 'Fleet Routing Optimized (Chennai Region)', type: 'success' });
  }, [addActivity, isOptimized]);

  const simulateTraffic = useCallback((condition: 'normal' | 'heavy' | 'jam') => {
    setTraffic(condition);
    const delayMap = { normal: 0, heavy: 15, jam: 45 };
    setOrders(prev => prev.map(o => {
      // Only shift if it's a realistic time string
      if (o.predictedTime && o.predictedTime.includes(':')) {
        const parts = o.predictedTime.split(' - ');
        const shifted = parts.map(p => shiftTime(p, delayMap[condition])).join(' - ');
        return { ...o, predictedTime: shifted };
      }
      return o;
    }));
    addActivity('route_change', `Traffic status updated to ${condition}`, condition === 'jam' ? 'Delays expected' : undefined);
  }, [addActivity]);

  const reassignOrder = useCallback((orderId: string, agentId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, agentId, updatedAt: new Date().toISOString() } : o));
    setAgents(prev => prev.map(agent => {
      if (agent.id === agentId) {
        return { ...agent, currentOrderId: orderId, workload: Math.min(100, agent.workload + 15) };
      }
      if (agent.currentOrderId === orderId) {
        return { ...agent, currentOrderId: undefined, workload: Math.max(0, agent.workload - 15) };
      }
      return agent;
    }));
    addActivity('agent_alert', `Order ${orderId} reassigned to ${agentId}`, 'Workload balanced');
    setNotification({ message: `Reassigned ${orderId} for optimal coverage`, type: 'info' });
  }, [addActivity]);

  // Demo Mode Simulation Loop
  useEffect(() => {
    if (isDemoMode) {
      timerRef.current = setInterval(() => {
        const eventType = Math.random();
        if (eventType < 0.3) {
          const conditions: ('normal' | 'heavy' | 'jam')[] = ['normal', 'heavy', 'jam'];
          simulateTraffic(conditions[Math.floor(Math.random() * 3)]);
        } else if (eventType < 0.6) {
          setOrders(prev => prev.map(o => Math.random() > 0.7 ? {
            ...o,
            predictedAvailability: Math.min(1, Math.max(0, o.predictedAvailability + (Math.random() - 0.5) * 0.2))
          } : o));
        } else if (eventType < 0.8) {
          optimizeRoutes();
        } else if (eventType < 0.9) {
          setOrders(prev => {
            const inTransit = prev.filter(o => o.status === 'in-transit');
            if (inTransit.length > 0) {
              const target = inTransit[Math.floor(Math.random() * inTransit.length)];
              updateOrderStatus(target.id, 'delivered');
            }
            return prev;
          });
        }
      }, 6000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isDemoMode, simulateTraffic, optimizeRoutes, updateOrderStatus]);

  return {
    orders,
    unoptimizedOrders,
    isOptimized,
    setIsOptimized,
    agents,
    traffic,
    activities,
    systemAccuracy,
    isDemoMode,
    setIsDemoMode,
    updateOrderStatus,
    optimizeRoutes,
    simulateTraffic,
    reassignOrder,
    notifyCustomer,
    notification,
    setNotification
  };
};

function shiftTime(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(h, m + minutes);
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}
