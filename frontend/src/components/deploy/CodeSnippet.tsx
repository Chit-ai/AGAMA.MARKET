import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeSnippetProps {
    code: string;
    language: string;
}

export function CodeSnippet({ code, language }: CodeSnippetProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-lg overflow-hidden border border-white/10 bg-black/40 font-mono text-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                <span className="text-xs text-slate-400 uppercase">{language}</span>
                <button 
                    onClick={handleCopy}
                    className="text-slate-400 hover:text-white transition-colors"
                >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="text-slate-300">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
}
