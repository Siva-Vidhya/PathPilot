import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Map as MapIcon, 
  TrendingUp, 
  Settings, 
  ShieldCheck,
  Bell,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'orders', icon: Package, label: 'Orders' },
    { id: 'map', icon: MapIcon, label: 'Map View' },
    { id: 'insights', icon: TrendingUp, label: 'Insights' },
    { id: 'performance', icon: ShieldCheck, label: 'Performance' },
  ];

  return (
    <aside className="glass-effect" style={{
      width: 'var(--sidebar-width)',
      height: '100vh',
      position: 'sticky',
      top: 0,
      padding: '2rem 1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem',
      zIndex: 100,
      borderRight: '1px solid var(--border)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 0.5rem' }}>
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          style={{ 
            width: '42px', 
            height: '42px', 
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 210, 255, 0.4)'
          }}>
          <Zap color="white" size={24} fill="white" />
        </motion.div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
          Path<span style={{ color: 'var(--primary)' }}>Pilot</span>
        </h1>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActivePage(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.85rem 1rem',
              background: activePage === item.id ? 'rgba(255,255,255,0.03)' : 'transparent',
              color: activePage === item.id ? 'var(--primary)' : 'var(--text-dim)',
              border: 'none',
              borderRadius: '12px',
              textAlign: 'left',
              width: '100%',
              transition: 'var(--transition)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {activePage === item.id && (
              <motion.div 
                layoutId="activeTab"
                style={{
                  position: 'absolute',
                  left: 0,
                  width: '3px',
                  height: '24px',
                  background: 'var(--primary)',
                  boxShadow: '0 0 10px var(--primary)',
                  borderRadius: '0 4px 4px 0'
                }}
              />
            )}
            <item.icon size={20} style={{ opacity: activePage === item.id ? 1 : 0.7 }} />
            <span style={{ 
              fontWeight: activePage === item.id ? 700 : 500,
              fontSize: '0.95rem'
            }}>{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ 
          padding: '1rem', 
          background: 'rgba(255,255,255,0.03)', 
          borderRadius: '12px',
          border: '1px solid var(--border)',
          marginBottom: '0.5rem'
        }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>ENGINE STATUS</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="live-dot" style={{ background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>System Live</span>
          </div>
        </div>
        <button className="btn-secondary" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.6rem 1rem' }}>
          <Bell size={18} /> Notifications
        </button>
        <button className="btn-secondary" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', padding: '0.6rem 1rem' }}>
          <Settings size={18} /> Settings
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
