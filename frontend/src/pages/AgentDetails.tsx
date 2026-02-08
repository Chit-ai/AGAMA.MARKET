import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    Terminal, Shield, Cpu, Activity, ArrowLeft, 
    Code, Zap, Radio, Compass, Lock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { IntegrationModal } from '../components/deploy/IntegrationModal';

export function AgentDetails() {
    const { id } = useParams();
    const [agent, setAgent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:8000/api/v1/agents/${id}`)
            .then(res => res.json())
            .then(data => {
                setAgent(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching agent:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 blur-md animate-pulse" />
                </div>
            </div>
        </div>
    );

    if (!agent) return <div className="p-20 text-center text-slate-400">Agent not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
            {/* Back Nav */}
            <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Marketplace
            </Link>

            {/* Header Section */}
            <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden mb-12">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
                
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-32 h-32 rounded-3xl bg-slate-900 flex items-center justify-center border border-white/10 shadow-2xl relative group">
                        <Terminal className="w-14 h-14 text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 rounded-3xl border border-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <div className="flex-grow pt-2">
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">{agent.name}</h1>
                             {agent.is_verified && (
                                <span className="flex items-center gap-1.5 text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20 font-semibold uppercase tracking-wide">
                                    <Shield className="w-3.5 h-3.5" /> Certified
                                </span>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-slate-400 font-mono text-sm mb-6">
                            <span className="bg-white/5 px-2 py-1 rounded border border-white/5">v{agent.version}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-600" />
                            <span>{agent.sattva?.hash?.substring(0, 8) || '0x7f...3a2b'}</span>
                        </div>
                        
                        <p className="text-slate-300 text-lg max-w-2xl mb-8 leading-relaxed font-light">
                            {agent.agama_json?.sattva?.description || "An autonomous agent conforming to the ĀGAMA protocol."}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="btn-primary flex items-center gap-2.5 px-8 py-3.5"
                            >
                                <Zap className="w-5 h-5 fill-white" />
                                Connect & Deploy
                            </button>
                            <a 
                                href={agent.agama_json?.sattva?.repository} 
                                target="_blank" 
                                rel="noreferrer"
                                className="px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white font-medium flex items-center gap-2.5 transition-all active:scale-[0.98]"
                            >
                                <Code className="w-4 h-4" />
                                View Source
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* The 8 Limbs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Sankalpa */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-8 rounded-3xl"
                    >
                        <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                                <Compass className="w-5 h-5 text-indigo-400" />
                            </div>
                            Sankalpa (Intention)
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="p-5 rounded-2xl bg-slate-950/30 border border-white/5">
                                <label className="text-xs text-slate-500 uppercase tracking-widest font-bold block mb-3">Primary Goal</label>
                                <p className="text-slate-200 leading-relaxed">{agent.goal}</p>
                            </div>
                            <div className="p-5 rounded-2xl bg-slate-950/30 border border-white/5">
                                <label className="text-xs text-slate-500 uppercase tracking-widest font-bold block mb-3">Role</label>
                                <p className="text-slate-200 capitalize flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                                    {agent.role}
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-slate-500 uppercase tracking-widest font-bold block mb-4">Domain Keywords</label>
                            <div className="flex flex-wrap gap-2.5">
                                {agent.domain.map((tag: string) => (
                                    <span key={tag} className="px-4 py-1.5 rounded-full bg-slate-800 border border-white/10 text-slate-300 text-sm hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-colors cursor-default">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Ahvana (Invocation) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-8 rounded-3xl"
                    >
                         <h2 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                                <Radio className="w-5 h-5 text-cyan-400" />
                            </div>
                            Ahvana (Interface)
                        </h2>
                        
                        <div className="rounded-2xl bg-slate-950 border border-white/10 overflow-hidden">
                            <div className="flex items-center gap-4 text-slate-400 px-6 py-3 border-b border-white/5 bg-white/[0.02]">
                                <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/30 px-2 py-1 rounded border border-cyan-500/20">POST</span>
                                <span className="font-mono text-sm">/v1/agent/invoke</span>
                            </div>
                            <div className="p-6 overflow-x-auto">
                                <pre className="text-sm font-mono text-slate-300 leading-relaxed custom-scrollbar">
                                    {JSON.stringify(agent.agama_json?.ahvana || { input: "string", stream: true }, null, 2)}
                                </pre>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <motion.div 
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         className="glass-card p-6 rounded-3xl"
                    >
                         <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                <Activity className="w-5 h-5 text-amber-400" />
                            </div>
                            Shakti (Capabilities)
                        </h2>
                        
                        <div className="space-y-4">
                             {/* Tools */}
                             <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/30 border border-white/5">
                                <Cpu className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-1">Models</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed">GPT-4 Turbo, Claude 3 Opus</p>
                                </div>
                             </div>
                             
                             <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/30 border border-white/5">
                                <Zap className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-1">Tools</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed">Browser, Python Interpreter, FileSystem</p>
                                </div>
                             </div>
                        </div>
                    </motion.div>

                    <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20 group">
                         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 mix-blend-overlay" />
                         <div className="absolute top-0 right-0 p-32 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                         
                         <div className="relative z-10">
                            <Lock className="w-8 h-8 text-white/80 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Secure Sandbox</h3>
                            <p className="text-indigo-100 text-sm mb-6 leading-relaxed opacity-90">
                                Instantly spin up this agent in an isolated, cryptographically verified environment.
                            </p>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
                            >
                                Launch Sandbox
                            </button>
                         </div>
                    </div>
                </div>
            </div>
            {/* Integration Modal */}
            {agent && (
                <IntegrationModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)} 
                    agent={agent} 
                />
            )}
        </div>
    );
}
