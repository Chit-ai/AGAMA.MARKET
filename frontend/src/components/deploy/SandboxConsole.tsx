import { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Cpu } from 'lucide-react';

interface Message {
    role: 'user' | 'agent' | 'system';
    content: string;
}

interface SandboxConsoleProps {
    agentName: string;
}

export function SandboxConsole({ agentName }: SandboxConsoleProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'system', content: `Initializing secure connection to ${agentName}...` },
        { role: 'system', content: 'Connection established. Handshake complete.' },
        { role: 'agent', content: `Hello. I am ${agentName}. How can I assist you today?` }
    ]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isThinking) return;
        
        const userMsg: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);

        try {
            // Call the real Sandbox API
            const response = await fetch('http://localhost:8000/api/v1/sandbox/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: input,
                    language: 'python' // Defaulting to Python for now
                })
            });
            
            const data = await response.json();
            
            let outputMsg = "";
            if (data.error) {
                outputMsg = `Error: ${data.error}`;
            } else {
                outputMsg = data.output || `(No output. Exit code: ${data.exit_code})`;
            }

            setMessages(prev => [...prev, { 
                role: 'agent', 
                content: outputMsg 
            }]);

        } catch (err) {
            setMessages(prev => [...prev, { 
                role: 'system', 
                content: `Connection Error: Failed to execute code. Is the execution service running?` 
            }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="flex flex-col h-[400px] bg-black/80 rounded-lg border border-white/10 overflow-hidden font-mono text-sm shadow-inner">
            {/* Terminal Header */}
            <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-green-500" />
                <span className="text-slate-400 text-xs">secure_shell@{agentName.toLowerCase()}:~</span>
                <div className="ml-auto flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-slate-700">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                            msg.role === 'user' 
                                ? 'bg-primary/20 text-white border border-primary/30 rounded-tr-none' 
                                : msg.role === 'system'
                                    ? 'text-xs text-green-500/80 font-mono tracking-wide'
                                    : 'bg-slate-800/50 text-slate-300 border border-white/10 rounded-tl-none'
                        }`}>
                            {msg.role === 'system' && <span className="mr-2">&gt;&gt;&gt;</span>}
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isThinking && (
                    <div className="flex items-center gap-2 text-slate-500 text-xs animate-pulse">
                        <Cpu className="w-3 h-3" />
                        <span>Processing request...</span>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white/5 border-t border-white/5 flex gap-2">
                <span className="text-green-500 py-2">$</span>
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 bg-transparent outline-none text-white placeholder-slate-600"
                    placeholder="Execute command..."
                    autoFocus
                />
                <button 
                    onClick={handleSend}
                    className="p-2 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors"
                >
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
