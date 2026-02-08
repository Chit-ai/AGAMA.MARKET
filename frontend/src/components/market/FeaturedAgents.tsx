import { useState } from 'react';
import { AgentCard } from '../ui/AgentCard';
import { Sparkles, RefreshCw, Terminal, Database, Palette, Cpu } from 'lucide-react';
import type { Agent } from '../../types/agent';

interface FeaturedAgentsProps {
    agents: Agent[];
    loading: boolean;
}

export function FeaturedAgents({ agents, loading }: FeaturedAgentsProps) {
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Coding', 'Research', 'Utility', 'Creative'];

    return (
        <section className="py-32 max-w-7xl mx-auto px-6 relative">
             <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
                <div>
                    <h2 className="text-4xl font-display font-bold text-white flex items-center gap-3 mb-3">
                        <Sparkles className="w-8 h-8 text-indigo-500" />
                        Featured Agents
                    </h2>
                    <p className="text-slate-400 text-lg max-w-md">Discover top-rated autonomous agents ready to deploy into your workflow.</p>
                </div>

                <div className="flex items-center gap-1 bg-slate-900/50 p-1.5 rounded-xl border border-white/5 backdrop-blur-sm self-start md:self-auto">
                    {filters.map(filter => {
                        const getIcon = () => {
                            if (filter === 'Coding') return <Terminal className="w-4 h-4" />;
                            if (filter === 'Research') return <Database className="w-4 h-4" />;
                            if (filter === 'Creative') return <Palette className="w-4 h-4" />;
                            if (filter === 'Utility') return <Cpu className="w-4 h-4" />;
                            return <Sparkles className="w-4 h-4" />;
                        };

                        return (
                            <button 
                                key={filter} 
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 relative overflow-hidden flex items-center gap-2 ${
                                    activeFilter === filter 
                                    ? 'text-white shadow-lg pl-4 pr-6' 
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {activeFilter === filter && (
                                    <div className="absolute inset-0 bg-indigo-600 rounded-lg -z-10" />
                                )}
                                {getIcon()}
                                {filter}
                            </button>
                        );
                    })}
                </div>
             </div>

             {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {[1, 2, 3].map(i => (
                         <div key={i} className="h-[340px] rounded-2xl bg-slate-800/30 animate-pulse border border-white/5" />
                     ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {agents.map((agent) => (
                        <AgentCard key={agent?.sattva?.hash || Math.random()} agent={agent} />
                    ))}
                    
                    {/* Empty State */}
                    {agents.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-40 border border-dashed border-slate-800 rounded-3xl bg-slate-900/20 backdrop-blur-sm">
                            <div className="w-20 h-20 bg-slate-900/80 rounded-full flex items-center justify-center mb-6 shadow-glow border border-white/5 group relative">
                                <RefreshCw className="w-8 h-8 text-slate-600 group-hover:rotate-180 transition-transform duration-700" />
                                <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-ping opacity-20" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-300 mb-3">No Agents Discovered Yet</h3>
                            <p className="text-slate-500 mb-8 max-w-md text-center text-lg">
                                The crawler is warming up or no agents matched your criteria. 
                                <br />Try adjusting filters or be the first to publish.
                            </p>
                            <button className="btn-primary flex items-center gap-2 px-8 py-3.5">
                                Register New Agent
                            </button>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
