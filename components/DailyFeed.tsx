import React from 'react';
import { TEMPLATES } from '../data/applicationData';
import { Template } from '../types';
import { TrendingUp, Calendar } from 'lucide-react';

interface Props {
  onSelect: (t: Template) => void;
}

const DailyFeed: React.FC<Props> = ({ onSelect }) => {
  // Simple algorithm to pick "daily" templates based on date
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  
  const dailyPicks = TEMPLATES.filter((_, index) => {
    // Pick 3 templates that rotate daily
    return (index + dayOfYear) % 5 === 0;
  }).slice(0, 4);

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <TrendingUp className="text-red-500" /> Trending Today
        </h2>
        <span className="text-sm text-gray-500 flex items-center gap-1">
          <Calendar size={14} /> {today.toDateString()}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dailyPicks.map(t => (
          <div 
            key={t.id} 
            onClick={() => onSelect(t)}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md cursor-pointer transition hover:-translate-y-1 group"
          >
            <div className="text-xs font-bold text-blue-600 uppercase mb-2">{t.category}</div>
            <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 line-clamp-2">{t.title}</h3>
            <div className="mt-3 flex gap-1">
              {t.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full">#{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyFeed;
