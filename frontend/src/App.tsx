import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Marketplace } from './pages/Marketplace';
import { AgentDetails } from './pages/AgentDetails';
import { Docs } from './pages/Docs';

function App() {
  return (
    <Router>
       <div className="relative min-h-screen overflow-hidden">
          {/* Background Elements */}
          <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
          </div>

          <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 h-20 transition-all duration-300">
              <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                  {/* Navbar Content */}
                  <div className="flex items-center gap-3 font-display font-bold text-xl tracking-tight">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                          <span className="text-lg">A</span>
                      </div>
                      <span className="text-white">AGAMA<span className="text-indigo-400">.MARKET</span></span>
                  </div>
                   <div className="flex items-center gap-8 text-sm font-medium text-slate-400">
                      <Link to="/" className="hover:text-white transition-colors">Marketplace</Link>
                      <a href="#" className="hover:text-white transition-colors">Deploy</a>
                       <Link to="/docs" className="hover:text-white transition-colors">Docs</Link>
                      <button className="btn-primary text-xs px-5 py-2.5">Connect Wallet</button>
                   </div>
              </div>
          </nav>

          <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/agent/:id" element={<AgentDetails />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
       </div>
    </Router>
  );
}

export default App;
