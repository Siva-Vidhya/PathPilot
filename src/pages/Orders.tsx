import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  List as ListIcon,
  LayoutGrid,
  Users,
  Target,
  Zap
} from 'lucide-react';
import DecisionEngineModal from '../components/DecisionEngineModal';
import type { DeliveryOrder } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface OrdersProps {
  simulation: any;
}

const Orders: React.FC<OrdersProps> = ({ simulation }) => {
  const { orders, updateOrderStatus, optimizeRoutes } = simulation;
  const [viewMode, setViewMode] = useState<'list' | 'cluster'>('list');
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((o: DeliveryOrder) => 
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clusters = filteredOrders.reduce((acc: any, order: DeliveryOrder) => {
    const cid = order.clusterId || 'No Cluster';
    if (!acc[cid]) acc[cid] = [];
    acc[cid].push(order);
    return acc;
  }, {});

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'var(--accent)';
      case 'in-transit': return 'var(--primary)';
      case 'failed': return 'var(--danger)';
      default: return 'var(--text-dim)';
    }
  };

  const listContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemAnim = {
    hidden: { y: 15, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}
            className="text-gradient"
          >
            Delivery Intelligence
          </motion.h2>
          <motion.p 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ color: 'var(--text-dim)', fontSize: '1.05rem' }}
          >
            Active Deliveries: <span style={{ color: 'white', fontWeight: 600 }}>{orders.length}</span> • 
            Completed: <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{orders.filter((o: any) => o.status === 'delivered').length}</span>
          </motion.p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={optimizeRoutes}
            className="btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem' }}
          >
            <Zap size={18} fill="white" /> Optimize Sequence
          </motion.button>
          <div className="glass-effect" style={{ display: 'flex', padding: '0.35rem', borderRadius: '14px', border: '1px solid var(--border)' }}>
            <button 
              onClick={() => setViewMode('list')}
              style={{ 
                background: viewMode === 'list' ? 'var(--primary-glow)' : 'transparent',
                color: viewMode === 'list' ? 'var(--primary)' : 'var(--text-dim)',
                padding: '0.6rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem',
                borderRadius: '10px', fontWeight: 600
              }}
            >
              <ListIcon size={18} /> List
            </button>
            <button 
              onClick={() => setViewMode('cluster')}
              style={{ 
                background: viewMode === 'cluster' ? 'var(--primary-glow)' : 'transparent',
                color: viewMode === 'cluster' ? 'var(--primary)' : 'var(--text-dim)',
                padding: '0.6rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem',
                borderRadius: '10px', fontWeight: 600
              }}
            >
              <LayoutGrid size={18} /> Groups
            </button>
          </div>
        </div>
      </header>

      {/* Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}
      >
        <div style={{ position: 'relative', flex: 1 }}>
          <Search style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} size={20} />
          <input 
            type="text" 
            placeholder="Search by ID, Customer name or Location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '1.1rem 1.25rem 1.1rem 3.5rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              color: 'var(--text-main)',
              fontSize: '1rem',
              outline: 'none',
              transition: 'var(--transition)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
        </div>
        <button className="btn-secondary" style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', padding: '1.1rem 1.5rem' }}>
          <Filter size={18} /> Advanced Filters
        </button>
      </motion.div>

      {/* Orders Grid/List */}
      <AnimatePresence mode="wait">
        {viewMode === 'list' ? (
          <motion.div 
            key="list"
            variants={listContainer}
            initial="hidden"
            animate="show"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.75rem' }}
          >
            {filteredOrders.map((order: DeliveryOrder) => (
              <motion.div 
                key={order.id} 
                variants={itemAnim}
                className="premium-card shimmer-bg" 
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.75rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.05em' }}>{order.id}</span>
                  <div style={{ 
                    padding: '0.35rem 1rem', 
                    borderRadius: '30px', 
                    fontSize: '0.75rem', 
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    background: getStatusColor(order.status) + '15',
                    color: getStatusColor(order.status),
                    border: `1px solid ${getStatusColor(order.status)}30`
                  }}>
                    {order.status}
                  </div>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem' }}>{order.customerName}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-dim)', fontSize: '0.95rem' }}>
                    <MapPin size={16} /> {order.address}
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.75rem', 
                  padding: '1.25rem', 
                  background: 'rgba(255,255,255,0.03)', 
                  borderRadius: '14px',
                  border: '1px solid var(--border)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Target size={16} color="var(--primary)" />
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>PREDICTED AVAILABILITY</span>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: order.predictedAvailability > 0.7 ? 'var(--accent)' : 'var(--warning)' }}>
                      {Math.round(order.predictedAvailability * 100)}%
                    </span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${order.predictedAvailability * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      style={{ 
                        height: '100%', 
                        background: order.predictedAvailability > 0.7 ? 'var(--accent)' : order.predictedAvailability > 0.4 ? 'var(--warning)' : 'var(--danger)',
                        boxShadow: `0 0 10px ${order.predictedAvailability > 0.7 ? 'var(--accent)' : 'var(--warning)'}50`
                      }} 
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }}>
                      <Clock size={16} color="var(--primary)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>ETA WINDOW</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>{order.predictedTime}</span>
                    </div>
                  </div>
                  {order.status === 'in-transit' ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => simulation.notifyCustomer(order.id)}
                        style={{ 
                          background: order.commStatus === 'read' ? 'var(--accent)' : 'var(--surface-lighter)', 
                          color: order.commStatus === 'read' ? 'white' : 'var(--text-main)', 
                          fontSize: '0.85rem', 
                          fontWeight: 700,
                          padding: '0.6rem 1rem',
                          borderRadius: '10px',
                          border: '1px solid var(--border)'
                        }}
                      >
                        {order.commStatus === 'none' ? 'Notify' : order.commStatus?.toUpperCase()}
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedOrder(order)}
                        style={{ 
                          background: 'rgba(239, 68, 68, 0.15)', 
                          color: 'var(--danger)', 
                          fontSize: '0.85rem', 
                          fontWeight: 700,
                          padding: '0.6rem 1rem',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '10px'
                        }}
                      >
                        Fail
                      </motion.button>
                    </div>
                  ) : order.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                      <select 
                        onChange={(e) => simulation.reassignOrder(order.id, e.target.value)}
                        value={order.agentId || ''}
                        style={{
                          flex: 1,
                          background: 'var(--surface-lighter)',
                          border: '1px solid var(--border)',
                          borderRadius: '10px',
                          color: 'var(--text-main)',
                          padding: '0.6rem',
                          fontSize: '0.8rem',
                          outline: 'none'
                        }}
                      >
                        <option value="">Assign Agent</option>
                        {simulation.agents.map((a: any) => (
                          <option key={a.id} value={a.id}>{a.name}</option>
                        ))}
                      </select>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary" 
                        onClick={() => simulation.updateOrderStatus(order.id, 'in-transit')}
                        style={{ flex: 1, fontSize: '0.85rem', padding: '0.6rem 1rem' }}
                      >
                        Start
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="cluster"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          >
            {Object.keys(clusters).map(clusterId => (
              <div key={clusterId}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '0.4rem', borderRadius: '8px', background: 'var(--primary-glow)' }}>
                    <Users size={20} color="var(--primary)" />
                  </div>
                  Intelligence Cluster: {clusterId}
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, opacity: 0.6 }}>— {clusters[clusterId].length} prioritized agents</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                  {clusters[clusterId].map((order: DeliveryOrder) => (
                    <motion.div 
                      key={order.id} 
                      whileHover={{ y: -5, borderColor: 'var(--primary)' }}
                      className="premium-card" 
                      style={{ padding: '1.5rem', borderStyle: 'solid', background: 'rgba(255,255,255,0.02)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{order.customerName}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 700 }}>
                          <Clock size={14} /> {order.scheduledTime}
                        </div>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={14} /> {order.address}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {selectedOrder && (
        <DecisionEngineModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
          onAction={(status, reason) => {
            updateOrderStatus(selectedOrder.id, status, reason);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

export default Orders;
