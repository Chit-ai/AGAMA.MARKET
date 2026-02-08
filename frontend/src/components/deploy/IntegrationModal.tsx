import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, Terminal, Settings, Copy } from 'lucide-react';
import { CodeSnippet } from './CodeSnippet';
import { SandboxConsole } from './SandboxConsole';
import type { Agent } from '../../types/agent';

interface IntegrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    agent: Agent;
}

export function IntegrationModal({ isOpen, onClose, agent }: IntegrationModalProps) {
    const [activeTab, setActiveTab] = useState<'code' | 'sandbox' | 'settings'>('code');

    if (!isOpen) return null;

    const pythonCode = `
import requests

# Invoke ${agent.name}
response = requests.post(
    "https://api.agama.market/v1/invoke",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    },
    json={
        "agent_id": "${agent.id}",
        "task": "Extract insights from this report..."
    }
)

print(response.json())
`.trim();

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Window */}
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-3xl bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-800/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                                <Terminal className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white leading-none">Connect: {agent.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs text-slate-400 font-mono">ONLINE • v{agent.sattva?.version || '1.0.0'}</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-white/5 bg-slate-900/50 px-6 gap-6">
                        {[
                            { id: 'code', label: 'Integration Code', icon: Code },
                            { id: 'sandbox', label: 'Live Sandbox', icon: Terminal },
                            { id: 'settings', label: 'Configuration', icon: Settings },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as 'code' | 'sandbox' | 'settings')}
                                className={`flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors relative ${
                                    activeTab === tab.id 
                                        ? 'text-white border-primary' 
                                        : 'text-slate-500 border-transparent hover:text-slate-300'
                                }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="p-6 overflow-y-auto bg-slate-950/30 flex-1">
                        {activeTab === 'code' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Endpoint</label>
                                    <div className="flex items-center gap-2 p-3 bg-black/40 border border-white/10 rounded-lg font-mono text-sm text-slate-300">
                                        <span className="text-green-400 font-bold">POST</span>
                                        <span className="flex-1 truncate">https://api.agama.market/v1/invoke</span>
                                        <button className="p-1.5 hover:bg-white/10 rounded text-slate-500 hover:text-white">
                                            <Copy className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Python SDK</label>
                                    <CodeSnippet code={pythonCode} language="python" />
                                </div>
                            </div>
                        )}

                        {activeTab === 'sandbox' && (
                            <SandboxConsole agentName={agent.name} />
                        )}

                        {activeTab === 'settings' && (
                            <div className="text-center py-12 text-slate-500">
                                <Settings className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <h4 className="text-lg font-medium text-slate-300 mb-2">Environment Configuration</h4>
                                <p className="max-w-md mx-auto mb-6">Configure custom environment variables and secrets for this agent instance.</p>
                                <button className="btn-secondary">Manage Variables</button>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-white/5 bg-slate-900 flex justify-end gap-3">
                        <button onClick={onClose} className="btn-secondary">Cancel</button>
                        <button className="btn-primary shadow-glow">Deploy Instance</button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
