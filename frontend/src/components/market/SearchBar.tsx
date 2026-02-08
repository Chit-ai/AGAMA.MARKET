import { Search, Command, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');

  const suggestions = [
    { label: 'Coding Agent', type: 'Role', color: 'text-primary' },
    { label: 'Research Assistant', type: 'Role', color: 'text-accent' },
    { label: 'Image Generation', type: 'Capability', color: 'text-secondary' },
    { label: 'Data Analysis', type: 'Capability', color: 'text-primary' },
  ];

  return (
    <div className="relative w-full z-50">
      <div 
        className={`relative group flex items-center w-full backdrop-blur-xl border rounded-2xl px-6 py-5 transition-all duration-300 shadow-xl ${
            isFocused 
            ? 'bg-slate-800/60 border-primary/50 ring-2 ring-primary/30 shadow-2xl shadow-primary/20' 
            : 'bg-slate-900/60 border-white/10 hover:border-white/20 hover:bg-slate-800/40'
        }`}
      >
        <div className={`p-2 rounded-lg transition-all mr-3 ${isFocused ? 'bg-primary/20' : 'bg-white/5'}`}>
          <Search className={`w-5 h-5 transition-colors ${isFocused ? 'text-primary' : 'text-slate-400'}`} />
        </div>
        <input 
            type="text" 
            placeholder="Search by name, role, or capability..." 
            className="bg-transparent border-none outline-none text-white w-full placeholder-slate-500 font-medium text-base"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
        />
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
            <Command className="w-3.5 h-3.5" />
            <span className="font-semibold">K</span>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isFocused && (
            <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-3 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="px-6 py-3 bg-white/5 border-b border-white/10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-slate-300">Trending Searches</span>
                </div>
                <div className="p-2">
                  {suggestions.map((s, i) => (
                      <button 
                          key={i} 
                          className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 flex items-center justify-between group transition-all"
                          onClick={() => setQuery(s.label)}
                      >
                          <span className="text-slate-300 group-hover:text-white font-medium">{s.label}</span>
                          <span className={`text-xs ${s.color} bg-white/5 px-3 py-1 rounded-lg border border-white/10 group-hover:border-white/20`}>{s.type}</span>
                      </button>
                  ))}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
