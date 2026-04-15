import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Activity,
  AlertTriangle,
  Zap,
  Layers,
  ShieldCheck,
  CheckCircle2,
  GitCompare,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Fix for default marker icons in Leaflet with React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Numbered Icon Factory
const createNumberedIcon = (number: number, isOptimized: boolean) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background: ${isOptimized ? 'var(--primary)' : 'var(--text-dim)'};
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 800;
      border: 2px solid white;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
    ">${number}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

interface MapViewProps {
  simulation: any;
}

// Component to recenter map
const RecenterMap = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const MapView: React.FC<MapViewProps> = ({ simulation }) => {
  const { orders, unoptimizedOrders, isOptimized, traffic, optimizeRoutes } = simulation;
  const [showComparison, setShowComparison] = useState(false);
  const center: [number, number] = [13.0827, 80.2707]; // Chennai
  
  const displayOrders = showComparison ? unoptimizedOrders : orders;

  // Dynamically calculate route path based on current orders sequence
  const routePoints: [number, number][] = displayOrders
    .filter((o: any) => o.status !== 'delivered')
    .map((o: any) => [o.lat, o.lng] as [number, number]);

  const getTrafficColor = () => {
    switch (traffic) {
      case 'jam': return '#ef4444';
      case 'heavy': return '#f59e0b';
      default: return '#00D2FF';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', gap: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}
            className="text-gradient"
          >
            Spatial Intelligence
          </motion.h2>
          <motion.p 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ color: 'var(--text-dim)', fontSize: '1.05rem' }}
          >
            Hub Location: <span style={{ color: 'white', fontWeight: 600 }}>Chennai, Tamil Nadu</span>
          </motion.p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {isOptimized && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => setShowComparison(!showComparison)}
              className="glass-effect"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.8rem 1.25rem',
                borderRadius: '14px',
                border: showComparison ? '1px solid var(--primary)' : '1px solid var(--border)',
                background: showComparison ? 'var(--primary-glow)' : 'transparent',
                color: showComparison ? 'var(--primary)' : 'var(--text-dim)',
                fontSize: '0.85rem',
                fontWeight: 700
              }}
            >
              <GitCompare size={18} />
              {showComparison ? 'Viewing: Unoptimized' : 'Compare: Unoptimized'}
            </motion.button>
          )}
          
          <div className="glass-effect" style={{ padding: '0.8rem 1.5rem', borderRadius: '16px', display: 'flex', gap: '2rem', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: showComparison ? 'var(--text-dim)' : 'var(--primary)', boxShadow: showComparison ? 'none' : '0 0 10px var(--primary)' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{showComparison ? 'Raw Sequence' : 'Active Route'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Activity size={18} color={getTrafficColor()} />
              <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>REGION: <span style={{ color: getTrafficColor() }}>CHENNAI-HUB</span></span>
            </div>
          </div>
        </div>
      </header>

      <div style={{ flex: 1, position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
        <MapContainer 
          key={showComparison ? 'unoptimized' : 'optimized'}
          center={center} 
          zoom={13} 
          style={{ height: 'calc(100vh - 250px)', width: '100%', minHeight: '400px', background: '#0B0F1A' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          <RecenterMap center={center} />

          {/* Render Orders as Numbered Markers */}
          {displayOrders
            .filter((o: any) => o.status !== 'delivered')
            .map((order: any, idx: number) => (
            <Marker 
              key={order.id} 
              position={[order.lat, order.lng]}
              icon={createNumberedIcon(idx + 1, !showComparison)}
            >
              <Popup>
                <div style={{ color: '#000', padding: '0.5rem' }}>
                  <strong style={{ fontSize: '1rem' }}>{order.customerName}</strong><br />
                  <span style={{ color: '#666', fontSize: '0.8rem' }}>{order.address}</span><br />
                  <div style={{ marginTop: '0.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                    SEQUENCE: {idx + 1}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Route Polyline (Standard & Glow) */}
          <Polyline 
            positions={routePoints} 
            pathOptions={{
              color: showComparison ? 'var(--text-dim)' : getTrafficColor(),
              weight: 8,
              opacity: 0.2,
              lineCap: 'round'
            }}
          />
          <Polyline 
            positions={routePoints} 
            pathOptions={{
              color: showComparison ? 'var(--text-dim)' : getTrafficColor(),
              weight: 3,
              opacity: 1,
              dashArray: showComparison ? "10, 10" : "0"
            }}
          />
        </MapContainer>

        {/* Map Overlays */}
        <div style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass-effect" 
            style={{ padding: '1.5rem', borderRadius: '20px', width: '280px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid var(--border)' }}
          >
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Zap size={20} color="var(--primary)" fill="var(--primary)" /> Route Engine v2.4
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>Active Nodes</span>
                <span style={{ fontWeight: 700 }}>{displayOrders.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>Distance Gain</span>
                <span style={{ fontWeight: 700, color: 'var(--accent)' }}>
                  {isOptimized ? '+18.4%' : '0%'}
                </span>
              </div>
              
              <AnimatePresence mode="wait">
                {isOptimized && !showComparison ? (
                  <motion.div
                    key="optimized"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                  >
                    <CheckCircle2 size={16} color="var(--accent)" />
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700 }}>ROUTE OPTIMIZED ✔</span>
                  </motion.div>
                ) : (
                  <motion.button 
                    key="btn"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px var(--primary-glow)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={optimizeRoutes}
                    className="btn-primary" 
                    style={{ width: '100%', fontSize: '0.85rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '0.8rem' }}
                  >
                    <Layers size={16} /> Optimize Sequence
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <AnimatePresence>
            {showComparison && (
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                className="glass-effect" 
                style={{ 
                  padding: '1rem', 
                  borderRadius: '16px', 
                  border: '1px solid var(--warning)', 
                  background: 'rgba(245, 158, 11, 0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--warning)' }}>
                  <AlertTriangle size={20} strokeWidth={2.5} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>RAW TRAJECTORY</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 600, opacity: 0.8 }}>PRE-INTELLIGENCE FLOW</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass-effect" 
            style={{ 
              padding: '0.75rem 1rem', 
              borderRadius: '14px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              width: 'fit-content',
              marginLeft: 'auto'
            }}
          >
            <ShieldCheck size={18} color="var(--accent)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Decryption: AES-256</span>
          </motion.div>
        </div>

        {/* Legend for numbers */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          zIndex: 1000,
          padding: '1rem',
          borderRadius: '16px',
          background: 'var(--glass)',
          border: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.05em' }}>SEQUENCE INDICATORS</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Active Nodes (1-N)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ArrowRight size={14} color="var(--text-dim)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Optimized Flow</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
