import { motion } from 'framer-motion';
import { 
  Fingerprint, Compass, Zap, Radio, 
  MessageCircle, BarChart3, ShieldCheck, Eye,
  Lock
} from 'lucide-react';

const LIMBS = [
  { id: 'sattva', icon: Fingerprint, label: 'Sattva', desc: 'Essence & Identity', detail: 'Defines the agent\'s core identity, versioning, and authorship.', color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { id: 'sankalpa', icon: Compass, label: 'Sankalpa', desc: 'Intention & Goal', detail: 'Specifies the agent\'s purpose, role, and domain context.', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  { id: 'shakti', icon: Zap, label: 'Shakti', desc: 'Power & Tools', detail: 'Lists available models, tools, and computational resources.', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { id: 'ahvana', icon: Radio, label: 'Ahvana', desc: 'Invocation/API', detail: 'Standardized API schema for invoking the agent.', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { id: 'samvada', icon: MessageCircle, label: 'Samvada', desc: 'Dialogue', detail: 'Communication protocols and interaction patterns.', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  { id: 'parinama', icon: BarChart3, label: 'Parinama', desc: 'Evolution/Output', detail: 'Structured outputs and state changes produced.', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'maryada', icon: ShieldCheck, label: 'Maryada', desc: 'Safety Boundaries', detail: 'Constraints, permissions, and ethical guardrails.', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  { id: 'sakshi', icon: Eye, label: 'Sakshi', desc: 'Witness/Logs', detail: 'Audit logs and observability hooks for verification.', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
];

export function UniversalContractGrid() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-950/30 border-y border-white/5">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] animate-pulse-slow" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-slate-400">
              <Lock className="w-3 h-3" />
              <span>CRYPTOGRAPHICALLY VERIFIABLE</span>
           </div>
           
           <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">The Universal Agent Contract</h2>
           <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Every agent on this platform conforms to the <span className="font-mono text-indigo-400 font-bold">ĀGAMA v1.0</span> specification.
              Eight mandatory limbs ensure every agent is discoverable, safe, and interoperable.
           </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {LIMBS.map((limb, index) => (
            <motion.div
              key={limb.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
              className="glass-card p-6 rounded-2xl group cursor-pointer relative overflow-hidden hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${limb.bg} ${limb.border} border group-hover:scale-110`}>
                    <limb.icon className={`w-6 h-6 ${limb.color}`} />
                  </div>
                  <div className="text-[10px] font-mono font-bold text-slate-600 group-hover:text-slate-500 transition-colors uppercase tracking-widest">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-200 mb-1 group-hover:text-white transition-colors relative z-10">
                  {limb.label}
              </h3>
              <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-3 relative z-10">{limb.desc}</p>
              
              {/* Detailed Description Reveal */}
              <div className="mt-4 pt-4 border-t border-white/5 relative z-10">
                  <p className="text-sm text-slate-400 leading-snug">
                      {limb.detail}
                  </p>
              </div>

               {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
