import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, FileText, Code, Layers, Users } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Import markdown files as raw text
import indexMd from '../../../gitdoc/index.md?raw';
import apiReferenceMd from '../../../gitdoc/api_reference.md?raw';
import architectureMd from '../../../gitdoc/architecture.md?raw';
import contributionGuideMd from '../../../gitdoc/contribution_guide.md?raw';
import uiEnhancementsMd from '../../../gitdoc/ui_enhancements.md?raw';

interface DocSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string;
}

const docs: DocSection[] = [
  { id: 'home', title: 'Overview', icon: Book, content: indexMd },
  { id: 'api', title: 'API Reference', icon: Code, content: apiReferenceMd },
  { id: 'architecture', title: 'Architecture', icon: Layers, content: architectureMd },
  { id: 'ui', title: 'UI Enhancements', icon: FileText, content: uiEnhancementsMd },
  { id: 'contributing', title: 'Contributing', icon: Users, content: contributionGuideMd },
];

export function Docs() {
  const [activeDoc, setActiveDoc] = useState('home');
  const currentDoc = docs.find(d => d.id === activeDoc) || docs[0];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 glass-panel p-6 rounded-2xl">
              <h2 className="text-lg font-bold text-white mb-4">Documentation</h2>
              <nav className="space-y-2">
                {docs.map((doc) => {
                  const Icon = doc.icon;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => setActiveDoc(doc.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        activeDoc === doc.id
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {doc.title}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-3">
            <motion.div
              key={activeDoc}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-8 rounded-2xl"
            >
              <div className="prose prose-invert prose-indigo max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {currentDoc.content}
                </ReactMarkdown>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
