import { motion } from 'framer-motion';
import { SearchBar } from './SearchBar';
import { Cpu, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { HeroBackground } from '../ui/HeroBackground';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-40 overflow-hidden min-h-[90vh] flex flex-col justify-center">
        {/* Dynamic Background */}
        <HeroBackground />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            {/* Protocol Badge */}
            <motion.div 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, ease: "easeOut" }}
               className="flex justify-center mb-10"
            >
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/50 border border-white/10 text-sm font-medium text-slate-300 backdrop-blur-md shadow-xl ring-1 ring-white/5 hover:ring-white/10 transition-all hover:bg-slate-800/50 cursor-pointer group">
                    <Sparkles className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                    <span className="tracking-wide">Powered by <span className="text-white font-semibold">ĀGAMA v1.0</span> Protocol</span>
                    <span className="flex items-center gap-1.5 ml-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-emerald-500/80 font-mono">ONLINE</span>
                    </span>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto text-center">
                
                {/* Headline */}
                <motion.h1 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                   className="text-6xl sm:text-7xl lg:text-8xl font-display font-bold leading-[1.05] mb-8 tracking-tight"
                >
                    <span className="text-white drop-shadow-sm">Deploy</span>
                    <br />
                    <span className="inline-block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x pb-2">
                        Intelligent Agents
                    </span>
                </motion.h1>
                
                {/* Subtitle */}
                <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                   className="text-lg sm:text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto font-light"
                >
                    The unified marketplace for <span className="text-slate-200 font-medium">compliant</span>, <span className="text-slate-200 font-medium">verifiable</span>, and <span className="text-slate-200 font-medium">composable</span> AI agents.
                    Orchestrate decentralized intelligence with a single protocol.
                </motion.p>

                {/* Search Bar */}
                <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                   className="max-w-2xl mx-auto mb-20 relative z-20"
                >
                    <SearchBar />
                </motion.div>

                {/* Visual Stats / Trust Signals */}
                <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                   className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
                >
                    {[
                        { icon: Cpu, label: 'Active Agents', value: '1,234+', desc: 'Running in realtime' },
                        { icon: ShieldCheck, label: 'Verified Code', value: '100%', desc: 'Audited contracts' },
                        { icon: Zap, label: 'Invocations', value: '10M+', desc: 'This month' }
                    ].map((stat, i) => (
                        <div key={i} className="glass-card p-6 rounded-2xl text-left hover:-translate-y-1 transition-transform duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                                    <stat.icon className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div className="text-xs font-mono text-slate-500 bg-slate-900/50 px-2 py-1 rounded border border-white/5">
                                    LIVE
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
                            <div className="text-sm font-medium text-slate-300">{stat.label}</div>
                            <div className="text-xs text-slate-500 mt-1">{stat.desc}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>

        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
    </section>
  );
}
