import React from 'react';
import { 
  Users, 
  PackageCheck, 
  Clock, 
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';

interface DashboardProps {
  simulation: any;
}

const Dashboard: React.FC<DashboardProps> = ({ simulation }) => {
  const { agents, activities, systemAccuracy } = simulation;

  const stats = [
    { label: 'Active Agents', value: agents.length, icon: Users, color: '#00D2FF', suffix: '' },
    { label: 'Deliveries Today', value: agents.reduce((acc: number, a: any) => acc + a.completedToday, 0), icon: PackageCheck, color: '#10b981', suffix: '' },
    { label: 'Avg. Delivery Time', value: 24, icon: Clock, color: '#8b5cf6', suffix: ' min' },
    { label: 'Success Rate', value: systemAccuracy, icon: AlertTriangle, color: '#ef4444', suffix: '%', decimals: 1 },
  ];

  const chartData = agents.map((a: any) => ({
    name: a.name.split(' ')[0],
    efficiency: a.efficiencyScore,
    success: a.successRate
  }));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
          Operations Center
        </motion.h2>
        <motion.p 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}
        >
          AI Decision Framework: <span style={{ color: 'var(--primary)', fontWeight: 700 }}>SYNCHRONIZED</span>
        </motion.p>
      </header>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}
      >
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            variants={item}
            className="premium-card shimmer-bg" 
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.75rem' }}
          >
            <div style={{ 
              padding: '1rem', 
              borderRadius: '16px', 
              background: stat.color + '15',
              color: stat.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 20px ${stat.color}20`
            }}>
              <stat.icon size={28} />
            </div>
            <div>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{stat.label}</p>
              <h3 style={{ fontSize: '1.85rem', fontWeight: 800 }}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem' }}>
        {/* Performance Chart */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="premium-card"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Fleet Efficiency Matrix</h3>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary-glow)' }} /> Efficiency
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--secondary)', boxShadow: '0 0 10px var(--secondary-glow)' }} /> Success Rate
              </span>
            </div>
          </div>
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              < BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-dim)" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="var(--text-dim)" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                />
                <Bar dataKey="efficiency" fill="var(--primary)" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="success" fill="var(--secondary)" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Recent Activities */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="premium-card" 
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem' }}>Intelligence Feed</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '400px', overflowY: 'auto' }}>
            {activities.map((activity: any, index: number) => (
              <motion.div 
                key={activity.id} 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                style={{ display: 'flex', gap: '1.25rem' }}
              >
                <div style={{ 
                  marginTop: '0.4rem',
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%', 
                  background: activity.type === 'ai_decision' ? 'var(--primary)' : activity.type === 'comm_update' ? 'var(--accent)' : 'var(--warning)',
                  boxShadow: `0 0 15px ${activity.type === 'ai_decision' ? 'var(--primary)' : 'var(--warning)'}`
                }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                  <p style={{ fontSize: '0.95rem', lineHeight: 1.5, fontWeight: 500 }}>{activity.message}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 500 }}>{activity.timestamp}</span>
                    {activity.impact && (
                      <span style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--accent)', 
                        fontWeight: 700, 
                        display: 'flex', 
                        alignItems: 'center',
                        background: 'rgba(16, 185, 129, 0.1)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '6px'
                      }}>
                        <ArrowUpRight size={14} /> {activity.impact}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-secondary" 
            style={{ marginTop: 'auto', width: '100%', fontSize: '0.9rem', fontWeight: 600 }}
          >
            Access Historical Data
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
