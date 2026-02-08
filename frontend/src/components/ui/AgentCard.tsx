import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Clock } from 'lucide-react';
import { CategoryAvatar } from './CategoryAvatar';

interface AgentProps {
    agent: any; 
    onConnect?: () => void;
}

export function AgentCard({ agent }: AgentProps) {
    const isVerified = agent.is_verified || true; 

    // Determine category based on keywords or role
    const getCategory = () => {
        const text = (agent.role + ' ' + (agent.domain || []).join(' ') + ' ' + (agent.name || '')).toLowerCase();
        
        if (text.includes('code') || text.includes('dev') || text.includes('script') || text.includes('engineer')) return 'coding';
        if (text.includes('research') || text.includes('data') || text.includes('analysis') || text.includes('search')) return 'research';
        if (text.includes('art') || text.includes('image') || text.includes('creative') || text.includes('design') || text.includes('paint')) return 'creative';
        if (text.includes('tool') || text.includes('util') || text.includes('helper') || text.includes('automation')) return 'utility';
        
        return 'default';
    };

    const category = getCategory();

    return (
        <Link to={`/agent/${agent.id}`} className="block h-full group"> 
        <motion.div 
            whileHover={{ y: -8 }}
            className="glass-card rounded-2xl flex flex-col h-full bg-slate-900 border border-white/5 hover:border-indigo-500/50 shadow-lg hover:shadow-indigo-500/20"
        >
            {/* Header / Banner */}
            <div className="h-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative p-6 border-b border-white/5 overflow-hidden transition-colors duration-500 group-hover:from-slate-800 group-hover:to-indigo-950/30">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
                
                <div className="relative z-10 flex justify-between items-start">
                    <div className="transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                        <CategoryAvatar category={category} size="md" />
                    </div>
                    
                     {isVerified && (
                        <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1 uppercase backdrop-blur-sm shadow-sm">
                            <Shield className="w-3 h-3" /> Verified
                        </div>
                    )}
                </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-indigo-400 transition-colors mb-2 truncate">
                        {agent.sattva?.name || agent.name}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                         <span className="bg-white/5 px-2 py-0.5 rounded text-slate-400 border border-white/5">v{agent.sattva?.version || '1.0.0'}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> 2h ago</span>
                    </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow font-light">
                   {agent.sattva?.description || agent.description || "No description provided."}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {(agent.domain || agent.sankalpa?.domain || []).slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-slate-800 border border-white/5 text-slate-300 group-hover:border-indigo-500/20 group-hover:bg-indigo-500/5 transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                     <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>4.9</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-white group-hover:text-indigo-400 transition-colors">
                        View Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>

            {/* Hover Glow Border */}
            <div className="absolute inset-0 rounded-2xl border border-indigo-500/0 group-hover:border-indigo-500/50 transition-colors duration-500 pointer-events-none" />
        </motion.div>
        </Link>
    );
}
