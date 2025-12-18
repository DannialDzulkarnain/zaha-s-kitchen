import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  highlight?: boolean;
  badge?: string;
  accentClassName?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, desc, highlight, badge, accentClassName }) => {
  return (
    <div
      className={`p-8 rounded-[2.5rem] border transition-all hover:shadow-2xl hover:-translate-y-2 ${
        highlight ? 'bg-stone-900 border-stone-800 text-white' : 'bg-stone-50 border-stone-100 text-stone-900'
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${accentClassName || 'bg-white text-stone-900'}`}
        >
          <Icon className="w-7 h-7" />
        </div>
        {badge && (
          <span
            className={`text-[10px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full ${
              highlight ? 'bg-white/10 text-white' : 'bg-stone-200 text-stone-600'
            }`}
          >
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-xl font-black mb-3 tracking-tight">{title}</h3>
      <p className={`text-sm font-medium leading-relaxed ${highlight ? 'text-stone-400' : 'text-stone-500'}`}>{desc}</p>
    </div>
  );
};

export default FeatureCard;
