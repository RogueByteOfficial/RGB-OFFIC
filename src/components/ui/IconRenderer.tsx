import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-5 h-5', size }) => {
  // @ts-ignore
  const IconComponent = (LucideIcons[name] || LucideIcons.Sparkles) as React.ElementType;
  return <IconComponent className={className} size={size} />;
};

export const availableIcons = [
  'Smartphone',
  'Globe',
  'Monitor',
  'Cloud',
  'TrendingUp',
  'Headphones',
  'ShieldCheck',
  'Sparkles',
  'Zap',
  'HeartHandshake',
  'Code',
  'Database',
  'Layers',
  'Cpu',
  'Rocket',
  'Lock',
  'Server',
  'Terminal',
  'Activity',
  'Award'
];
