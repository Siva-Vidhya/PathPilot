import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className="glass-effect"
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        padding: '1rem 1.5rem',
        borderRadius: '16px',
        border: `1px solid ${type === 'success' ? 'var(--accent)' : 'var(--danger)'}`,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        minWidth: '300px',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <CheckCircle2 size={20} color={type === 'success' ? 'var(--accent)' : 'var(--danger)'} />
        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{message}</span>
      </div>
      <button 
        onClick={onClose}
        style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex' }}
      >
        <X size={16} />
      </button>

      {/* Progress Bar */}
      <motion.div 
        initial={{ width: '100%' }}
        animate={{ width: 0 }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
        style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          height: '3px', 
          background: type === 'success' ? 'var(--accent)' : 'var(--danger)',
          borderRadius: '0 0 16px 16px'
        }} 
      />
    </motion.div>
  );
};

export default Toast;
