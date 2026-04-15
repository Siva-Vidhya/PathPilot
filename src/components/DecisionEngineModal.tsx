import { useState } from 'react';
import { 
  X, 
  Clock, 
  User, 
  AlertCircle,
  Calendar,
  Zap,
  ArrowRight
} from 'lucide-react';
import type { DeliveryOrder } from '../types';
import { motion } from 'framer-motion';

interface DecisionEngineModalProps {
  order: DeliveryOrder;
  onClose: () => void;
  onAction: (status: 'pending' | 'delivered' | 'failed', reason?: string) => void;
}

const DecisionEngineModal: React.FC<DecisionEngineModalProps> = ({ order, onClose, onAction }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const suggestions = [
    { 
      id: 'retry', 
      title: 'Retry in 60 mins', 
      reason: 'Sensor data indicates high likelihood of customer presence after 5:30 PM.',
      icon: Clock,
      impact: '+1.2km route offset',
      color: 'var(--primary)'
    },
    { 
      id: 'neighbor', 
      title: 'Certified Drop-off', 
      reason: 'Resident at #126 is a verified secondary delivery point for this zone.',
      icon: User,
      impact: '0km offset / Immediate',
      color: 'var(--accent)'
    },
    { 
      id: 'reschedule', 
      title: 'Strategic Reschedule', 
      reason: 'AI re-allocation for tomorrow’s morning slot (Peak efficiency: 94%).',
      icon: Calendar,
      impact: 'Fuel conservation priority',
      color: 'var(--secondary)'
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 10, 20, 0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      backdropFilter: 'blur(12px)'
    }}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="glass-effect" 
        style={{
          width: '540px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2.5rem',
          borderRadius: '28px',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 20px rgba(0, 210, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative'
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ 
              width: '44px', 
              height: '44px', 
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0, 210, 255, 0.3)'
            }}>
              <Zap size={22} color="white" fill="white" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Neural Decision Engine</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '0.05em' }}>PREDICTIVE RESOLUTION v4.0</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ rotate: 90, color: 'white' }}
            onClick={onClose} 
            style={{ background: 'transparent', color: 'var(--text-dim)', transition: '0.3s' }}
          >
            <X size={28} />
          </motion.button>
        </div>

        <div style={{ 
          marginBottom: '2rem', 
          padding: '1.25rem', 
          background: 'rgba(239, 68, 68, 0.05)', 
          borderRadius: '16px',
          border: '1px solid rgba(239, 68, 68, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <AlertCircle size={18} color="var(--danger)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--danger)', textTransform: 'uppercase' }}>Delivery Exception Detected</span>
          </div>
          <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{order.customerName}</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>{order.address}</p>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowRight size={14} /> RECOMMENDED PROTOCOLS:
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          {suggestions.map((opt) => (
            <motion.div 
              key={opt.id}
              whileHover={{ x: 5, background: 'rgba(255,255,255,0.03)' }}
              onClick={() => setSelectedOption(opt.id)}
              style={{
                padding: '1.25rem',
                borderRadius: '20px',
                border: `2px solid ${selectedOption === opt.id ? opt.color : 'rgba(255,255,255,0.05)'}`,
                background: selectedOption === opt.id ? `${opt.color}10` : 'rgba(255,255,255,0.02)',
                cursor: 'pointer',
                transition: 'var(--transition)',
                boxShadow: selectedOption === opt.id ? `0 0 20px ${opt.color}15` : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ padding: '0.45rem', borderRadius: '10px', background: selectedOption === opt.id ? opt.color : 'rgba(255,255,255,0.05)' }}>
                    <opt.icon size={18} color={selectedOption === opt.id ? 'white' : 'var(--text-dim)'} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '1.05rem', color: selectedOption === opt.id ? 'white' : 'var(--text-dim)' }}>{opt.title}</span>
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: opt.color, textTransform: 'uppercase' }}>{opt.impact}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.5, marginLeft: '3.1rem' }}>{opt.reason}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1.25rem' }}>
          <button className="btn-secondary" style={{ flex: 1, padding: '1rem' }} onClick={onClose}>Abort</button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary" 
            style={{ flex: 1.5, padding: '1rem' }} 
            disabled={!selectedOption}
            onClick={() => onAction('failed', `Neural Resolve: ${selectedOption}`)}
          >
            Execute Decision
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DecisionEngineModal;
