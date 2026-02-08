import { Terminal, Database, Palette, Cpu, Globe } from 'lucide-react';

interface CategoryAvatarProps {
  category: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CATEGORY_CONFIG: any = {
  coding: {
    icon: Terminal,
    gradient: 'from-blue-600 to-cyan-500',
    shadow: 'shadow-blue-500/20',
    border: 'border-blue-400/30'
  },
  research: {
    icon: Database,
    gradient: 'from-violet-600 to-purple-500',
    shadow: 'shadow-violet-500/20',
    border: 'border-violet-400/30'
  },
  creative: {
    icon: Palette,
    gradient: 'from-pink-600 to-rose-500',
    shadow: 'shadow-pink-500/20',
    border: 'border-pink-400/30'
  },
  utility: {
    icon: Cpu,
    gradient: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-500/20',
    border: 'border-amber-400/30'
  },
  default: {
    icon: Globe,
    gradient: 'from-slate-600 to-slate-500',
    shadow: 'shadow-slate-500/20',
    border: 'border-slate-400/30'
  }
};

export function CategoryAvatar({ category, size = 'md', className = '' }: CategoryAvatarProps) {
  // Normalize category to lowercase or default
  const config = CATEGORY_CONFIG[category.toLowerCase()] || CATEGORY_CONFIG.default;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`relative group ${sizeClasses[size]} ${className}`}>
      {/* Outer Glow/Shadow */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${config.gradient} blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
      
      {/* Main Glass Container */}
      <div className={`relative h-full w-full rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center border-t border-white/20 shadow-xl ${config.shadow} backdrop-blur-md`}>
        {/* Inner Glint */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/0 via-white/10 to-white/20 pointer-events-none" />
        
        {/* Icon */}
        <Icon className={`${iconSizes[size]} text-white drop-shadow-md`} />
      </div>
    </div>
  );
}
