import React from 'react';
import { Clock, MoreHorizontal } from 'lucide-react';

const priorityColors = {
  High: 'bg-red-500',
  Medium: 'bg-orange-500',
  Low: 'bg-emerald-500'
};

const projectColors = {
  green: 'bg-[#B7E4C7]',
  blue: 'bg-[#BDE0FE]',
  purple: 'bg-[#E5D4FF]',
  orange: 'bg-[#FFD6A5]',
  pink: 'bg-[#FBCFE8]',
  gray: 'bg-[#E5E7EB]'
};

const TaskCard = ({ 
  title, 
  project, 
  projectColor = 'blue', 
  priority = 'Medium', 
  duration, 
  labels = [], 
  onClick 
}) => {
  const bgColor = projectColors[projectColor] || projectColors.blue;
  const priorityColor = priorityColors[priority] || priorityColors.Medium;

  return (
    <div 
      onClick={onClick}
      className={`
        relative group p-3 rounded-[12px] ${bgColor} border-2 border-transparent 
        hover:border-[#2563EB] hover:shadow-lg transition-all cursor-pointer 
        flex flex-col gap-2 min-h-[100px] shadow-sm
      `}
    >
      {/* HEADER: PRIORITY & OPTIONS */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${priorityColor}`} />
          <span className="text-[10px] font-black uppercase text-gray-700 tracking-tighter">{priority}</span>
        </div>
        <MoreHorizontal size={14} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* BODY: TITLE & PROJECT */}
      <div className="flex-1">
        <h4 className="text-[13px] font-bold text-gray-800 leading-snug mb-1 line-clamp-2">{title}</h4>
        <p className="text-[10px] font-bold text-gray-500/70 uppercase tracking-wider">{project}</p>
      </div>

      {/* FOOTER: DURATION & LABELS */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-1.5">
          {duration && (
            <div className="flex items-center gap-1 text-gray-600">
              <Clock size={12} />
              <span className="text-[11px] font-bold">{duration}</span>
            </div>
          )}
        </div>
        
        {labels.length > 0 && (
          <div className="flex gap-1">
            {labels.map((label, idx) => (
              <span key={idx} className="text-[9px] bg-white/40 text-gray-700 px-1.5 py-0.5 rounded font-black uppercase">
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
