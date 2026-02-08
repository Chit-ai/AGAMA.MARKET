import { Link } from 'react-router-dom';
import { Wallet, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-slate-900/80 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-2 group">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                <span className="font-bold text-lg">Ā</span>
             </div>
             <span className="font-display font-bold text-lg tracking-tight text-white">
               AGAMA<span className="text-slate-500 font-normal">.MARKET</span>
             </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6 text-sm font-medium text-slate-400">
               {['Marketplace', 'Deploy', 'Docs'].map((item) => (
                 <a 
                   key={item} 
                   href="#" 
                   className="hover:text-white transition-colors relative group py-1"
                 >
                   {item}
                   <span className="absolute bottom-0 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                 </a>
               ))}
            </nav>
            <div className="w-px h-6 bg-white/10" />
            <button className="flex items-center gap-2 btn-primary text-sm shadow-glow">
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-16 left-0 right-0 z-40 bg-slate-900 border-b border-white/10 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
               {['Marketplace', 'Deploy', 'Docs'].map((item) => (
                 <a key={item} href="#" className="text-slate-300 hover:text-white font-medium py-2 border-b border-white/5">
                   {item}
                 </a>
               ))}
               <button className="w-full btn-primary flex justify-center items-center gap-2 mt-2">
                 <Wallet className="w-4 h-4" /> Connect Wallet
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
