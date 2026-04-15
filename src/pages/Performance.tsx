import { 
  ShieldCheck, 
  MoreVertical,
  Activity,
  Zap,
  Target,
  Trophy,
  Award,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PerformanceProps {
  simulation: any;
}

const Performance: React.FC<PerformanceProps> = ({ simulation }) => {
  const { agents } = simulation;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <header>
        <motion.h2 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}
          className="text-gradient"
        >
          Fleet Performance
        </motion.h2>
        <motion.p 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ color: 'var(--text-dim)', fontSize: '1.05rem' }}
        >
          Agent Synchronization: <span style={{ color: 'var(--accent)', fontWeight: 700 }}>HIGH PERFORMANCE</span>
        </motion.p>
      </header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.75rem' }}
      >
        {agents.map((agent: any, index: number) => (
          <motion.div 
            key={agent.id} 
            variants={item}
            className="premium-card shimmer-bg" 
            style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', position: 'relative' }}
          >
            {index === 0 && (
              <div style={{ 
                position: 'absolute', 
                top: '-0.5rem', 
                right: '1.5rem', 
                background: 'var(--primary)', 
                color: 'white', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '8px', 
                fontSize: '0.7rem', 
                fontWeight: 800,
                boxShadow: '0 0 15px var(--primary-glow)'
              }}>
                TOP PERFORMER
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <img src={agent.avatar} alt={agent.name} style={{ width: '64px', height: '64px', borderRadius: '18px', border: '2px solid var(--border)' }} />
                  <div style={{ 
                    position: 'absolute', 
                    bottom: '-4px', 
                    right: '-4px', 
                    width: '16px', 
                    height: '16px', 
                    borderRadius: '50%', 
                    background: 'var(--accent)', 
                    border: '3px solid var(--background)',
                    boxShadow: '0 0 10px var(--accent)'
                  }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{agent.name}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 500 }}>
                    {agent.id} • <span style={{ color: agent.status === 'active' ? 'var(--accent)' : 'var(--warning)', fontWeight: 700 }}>{agent.status.toUpperCase()}</span>
                  </p>
                </div>
              </div>
              <button style={{ background: 'transparent', color: 'var(--text-dim)' }}><MoreVertical size={20} /></button>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '1rem', 
              padding: '1.25rem', 
              background: 'rgba(255,255,255,0.02)', 
              borderRadius: '16px',
              border: '1px solid var(--border)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '0.4rem', fontWeight: 800, letterSpacing: '0.05em' }}>DELIVERIES</p>
                <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>{agent.completedToday}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '0.4rem', fontWeight: 800, letterSpacing: '0.05em' }}>SUCCESS</p>
                <p style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent)' }}>{agent.successRate}%</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '0.4rem', fontWeight: 800, letterSpacing: '0.05em' }}>SCORE</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                  <Award size={14} color="var(--primary)" />
                  <p style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>{agent.efficiencyScore}</p>
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                <span style={{ color: 'var(--text-dim)' }}>Workload Capacity</span>
                <span style={{ color: agent.workload > 85 ? 'var(--danger)' : 'white' }}>{agent.workload}%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${agent.workload}%` }}
                  transition={{ duration: 1 }}
                  style={{ 
                    height: '100%', 
                    background: agent.workload > 85 ? 'var(--danger)' : agent.workload > 60 ? 'var(--warning)' : 'var(--primary)',
                    boxShadow: `0 0 10px ${agent.workload > 85 ? 'var(--danger)' : 'var(--primary-glow)'}`
                  }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-secondary" style={{ flex: 1, fontSize: '0.85rem', fontWeight: 700 }}>Telemetry Logs</button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary" 
                style={{ flex: 1, fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}
              >
                <Zap size={16} fill="white" /> Re-Optimize
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* System Metrics */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="premium-card"
        style={{ background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.05) 0%, transparent 100%)' }}
      >
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Trophy size={22} color="var(--warning)" /> System-Wide Collaboration Metrics
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {[
            { label: 'Avg System Workload', value: '58.4%', icon: Activity, color: 'var(--primary)' },
            { label: 'Balanced Assets', value: '12 Agents', icon: Users, color: 'var(--accent)' },
            { label: 'Network Reliability', value: '99.98%', icon: ShieldCheck, color: 'var(--secondary)' },
            { label: 'Compliance Index', value: '0.94', icon: Target, color: 'var(--warning)' },
          ].map((metric, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ 
                padding: '0.85rem', 
                borderRadius: '14px', 
                background: metric.color + '15', 
                color: metric.color,
                boxShadow: `0 0 15px ${metric.color}20`
              }}>
                <metric.icon size={22} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{metric.label}</p>
                <p style={{ fontWeight: 800, fontSize: '1.15rem' }}>{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Performance;
