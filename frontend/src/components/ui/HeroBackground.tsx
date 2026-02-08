import { motion } from 'framer-motion';
import { useMemo } from 'react';

export function HeroBackground() {
  // Generate random nodes for the neural network visualization
  const nodes = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
  }, []);

  // Generate connections between nodes
  const connections = useMemo(() => {
    return nodes.flatMap((node, i) => 
      nodes.slice(i + 1).filter(other => {
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        return Math.sqrt(dx * dx + dy * dy) < 20; // Only connect close nodes
      }).map(other => ({
        id: `${node.id}-${other.id}`,
        x1: node.x,
        y1: node.y,
        x2: other.x,
        y2: other.y,
      }))
    ).slice(0, 60); // Limit total connections
  }, [nodes]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-slate-950 to-slate-950" />
      
      {/* Animated Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3], 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2], 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[100px]" 
      />

      {/* Neural Network SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        {connections.map((conn, i) => (
          <motion.line
            key={conn.id}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2, delay: i * 0.05 + 1 }}
          />
        ))}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill="#818cf8"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1] 
            }}
            transition={{ 
              duration: node.duration, 
              delay: node.delay, 
              repeat: Infinity,
            }}
          />
        ))}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
            <stop offset="50%" stopColor="rgba(99, 102, 241, 0.5)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
    </div>
  );
}
