import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import MapView from './pages/Map';
import Insights from './pages/Insights';
import Performance from './pages/Performance';
import Toast from './components/Toast';
import { useSimulation } from './hooks/useSimulation';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Radio, Search } from 'lucide-react';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const simulation = useSimulation();

  const renderPage = () => {
    return (
      <motion.div
        key={activePage}
        initial={{ opacity: 0, x: 10, scale: 0.99 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -10, scale: 0.99 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          opacity: { duration: 0.2 }
        }}
        style={{ width: '100%', minHeight: '100%', position: 'relative' }}
      >
        {(() => {
          switch (activePage) {
            case 'dashboard': return <Dashboard simulation={simulation} />;
            case 'orders': return <Orders simulation={simulation} />;
            case 'map': return <MapView simulation={simulation} />;
            case 'insights': return <Insights simulation={simulation} />;
            case 'performance': return <Performance simulation={simulation} />;
            default: return <Dashboard simulation={simulation} />;
          }
        })()}
      </motion.div>
    );
  };

  return (
    <Layout>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top Premium Banner */}
        <header className="glass-effect" style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '0 2rem',
          borderBottom: '1px solid var(--border)',
          zIndex: 50,
          position: 'sticky',
          top: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
              <Shield size={16} color="var(--primary)" />
              <span style={{ fontWeight: 600, letterSpacing: '0.05em' }}>AI-POWERED DELIVERY INTELLIGENCE</span>
            </div>
            <div style={{ height: '20px', width: '1px', background: 'var(--border)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="live-dot" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginRight: '1rem' }}>
                Simulation Active
              </span>
              <button 
                onClick={() => simulation.setIsDemoMode(!simulation.isDemoMode)}
                style={{
                  background: simulation.isDemoMode ? 'var(--primary)' : 'var(--surface-lighter)',
                  color: simulation.isDemoMode ? 'white' : 'var(--text-dim)',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.65rem',
                  borderRadius: '20px',
                  fontWeight: 800,
                  transition: 'var(--transition)',
                  border: simulation.isDemoMode ? '1px solid var(--primary-glow)' : '1px solid var(--border)',
                  boxShadow: simulation.isDemoMode ? '0 0 10px var(--primary-glow)' : 'none'
                }}
              >
                {simulation.isDemoMode ? 'DEMO MODE: ON' : 'DEMO MODE: OFF'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input 
                type="text" 
                placeholder="Search resources..."
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  padding: '0.5rem 1rem 0.5rem 2.75rem',
                  color: 'white',
                  fontSize: '0.85rem',
                  width: '240px',
                  outline: 'none'
                }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--surface-lighter)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Radio size={16} color="var(--primary)" />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Region: IN-CHENNAI</span>
            </div>
          </div>
        </header>

        <main style={{ 
          flex: 1, 
          padding: '2rem',
          position: 'relative',
          background: 'radial-gradient(circle at 50% 0%, rgba(0, 210, 255, 0.05), transparent 70%)'
        }}>
          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>

          {/* Toast Notification Container */}
          <AnimatePresence>
            {simulation.notification && (
              <Toast 
                message={simulation.notification.message}
                type={simulation.notification.type}
                onClose={() => simulation.setNotification(null)}
              />
            )}
          </AnimatePresence>
          
          {/* Global Simulation Controller (Floating) */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-effect" 
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              padding: '1.25rem',
              borderRadius: '20px',
              display: 'flex',
              gap: '1.5rem',
              zIndex: 1000,
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              border: '1px solid rgba(0, 210, 255, 0.2)'
            }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Operational Traffic
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['normal', 'heavy', 'jam'].map((type) => (
                  <motion.button 
                    key={type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => simulation.simulateTraffic(type as any)}
                    style={{ 
                      background: simulation.traffic === type 
                        ? (type === 'normal' ? 'var(--primary)' : type === 'heavy' ? 'var(--warning)' : 'var(--danger)') 
                        : 'var(--surface-lighter)', 
                      padding: '0.5rem 1rem', 
                      fontSize: '0.75rem',
                      borderRadius: '8px',
                      textTransform: 'capitalize'
                    }}
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
            </div>
            <div style={{ width: '1px', background: 'var(--border)', margin: '0 0.25rem' }} />
            <motion.button 
              className="btn-primary" 
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--primary-glow)' }}
              whileTap={{ scale: 0.95 }}
              onClick={simulation.optimizeRoutes}
              style={{ alignSelf: 'center', height: 'fit-content' }}
            >
              Optimize Engine
            </motion.button>
          </motion.div>
        </main>
      </div>
    </Layout>
  );
}

export default App;
