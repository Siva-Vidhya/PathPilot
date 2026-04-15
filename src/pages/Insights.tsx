import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  MessageSquare, 
  Zap,
  Target,
  ArrowUpRight,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

const feedbackData = [
  { name: 'Mon', accuracy: 82, satisfaction: 85 },
  { name: 'Tue', accuracy: 85, satisfaction: 88 },
  { name: 'Wed', accuracy: 84, satisfaction: 86 },
  { name: 'Thu', accuracy: 89, satisfaction: 92 },
  { name: 'Fri', accuracy: 91, satisfaction: 93 },
  { name: 'Sat', accuracy: 93, satisfaction: 95 },
  { name: 'Sun', accuracy: 95, satisfaction: 96 },
];

const commsData = [
  { name: 'Out for Delivery', count: 450, color: '#00D2FF' },
  { name: 'Arriving Soon', count: 320, color: '#10b981' },
  { name: 'Failed/Retry', count: 85, color: '#ef4444' },
  { name: 'Rescheduled', count: 120, color: '#f59e0b' },
];

const COLORS = ['#00D2FF', '#10b981', '#ef4444', '#f59e0b'];

interface InsightsProps {
  simulation: any;
}

const Insights: React.FC<InsightsProps> = ({ simulation }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <header>
        <motion.h2 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}
          className="text-gradient"
        >
          Predictive Analytics
        </motion.h2>
        <motion.p 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ color: 'var(--text-dim)', fontSize: '1.05rem' }}
        >
          Neural Engine Training: <span style={{ color: 'var(--secondary)', fontWeight: 700 }}>98.2% CONVERGENCE</span>
        </motion.p>
      </header>

      {/* Top Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {[
          { label: 'Efficiency Gain', value: '+24.8%', icon: TrendingUp, color: 'var(--accent)', sub: '30-day baseline improvement' },
          { label: 'Comms Automated', value: '12,450', icon: MessageSquare, color: 'var(--primary)', sub: '96% customer engagement' },
          { label: 'Model Confidence', value: `${simulation.systemAccuracy.toFixed(1)}%`, icon: Target, color: 'var(--secondary)', sub: 'Active feedback loop' },
        ].map((card, i) => (
          <motion.div 
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="premium-card shimmer-bg" 
            style={{ borderLeft: `4px solid ${card.color}`, padding: '1.75rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.label}</span>
              <div style={{ color: card.color }}><card.icon size={20} /></div>
            </div>
            <h3 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>{card.value}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: card.color, fontSize: '0.85rem', fontWeight: 700 }}>
              <ArrowUpRight size={14} /> {card.sub}
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)', gap: '2rem' }}>
        {/* Learning Feedback System */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="premium-card"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Zap size={20} color="var(--warning)" fill="var(--warning)" /> Model Evolution Cycle
            </h3>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--primary)', boxShadow: '0 0 8px var(--primary)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)' }}>Route Accuracy</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)' }}>Customer Sat</span>
              </div>
            </div>
          </div>
          <div style={{ height: '360px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={feedbackData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-dim)" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="var(--text-dim)" fontSize={11} tickLine={false} axisLine={false} domain={[70, 100]} dx={-10} />
                <Tooltip 
                  contentStyle={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                />
                <Area type="monotone" dataKey="accuracy" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" />
                <Area type="monotone" dataKey="satisfaction" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorSat)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Communication Simulation Stats */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="premium-card" 
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '2rem' }}>Communication Distribution</h3>
          <div style={{ height: '280px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={commsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={100}
                  paddingAngle={10}
                  dataKey="count"
                  stroke="none"
                >
                  {commsData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase' }}>Protocol</p>
              <Shield size={24} color="var(--primary)" style={{ margin: '0.25rem 0' }} />
              <p style={{ fontSize: '1.1rem', fontWeight: 800 }}>V.4.2</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            {commsData.map((item, index) => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS[index], boxShadow: `0 0 8px ${COLORS[index]}` }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 600 }}>{item.name}</span>
                </div>
                <span style={{ fontWeight: 800, fontSize: '1rem' }}>{item.count}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Insights;
