import React, { useState } from 'react';
import { 
  X, Briefcase, Users, Lock,  
  ChevronDown, Layout, Palette, Calendar,
  Star, Search, Plus
} from 'lucide-react';
import { AvatarGroup } from '../UI/Avatar';

const CreateProjectModal = ({ isOpen, onClose }) => {
  const [selectedColor, setSelectedColor] = useState('blue');

  if (!isOpen) return null;

  const projectColors = [
    { id: 'green', value: '#B7E4C7', label: 'Green' },
    { id: 'blue', value: '#BDE0FE', label: 'Blue' },
    { id: 'purple', value: '#E5D4FF', label: 'Purple' },
    { id: 'orange', value: '#FFD6A5', label: 'Orange' },
    { id: 'pink', value: '#FBCFE8', label: 'Pink' },
    { id: 'gray', value: '#E5E7EB', label: 'Gray' },
  ];

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-fade-in p-4">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col relative animate-drop-in max-h-[90vh]">
        
        {/* HEADER */}
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">Create new project</h2>
            <p className="text-sm text-gray-400 font-medium mt-1">Set up a new workspace with custom colors.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-8 overflow-y-auto">
          {/* PROJECT NAME */}
          <div className="space-y-3">
             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Project Name</label>
             <input 
                type="text" 
                placeholder="e.g. Website Development"
                className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-lg font-bold text-gray-800 placeholder:text-gray-300 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all outline-none"
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* TEAM ASSIGNMENT */}
             <div className="space-y-3">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Assign to Team</label>
                <div className="relative group">
                   <div className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3.5 flex items-center justify-between cursor-pointer hover:border-blue-400 transition-all">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center font-bold text-sm">📢</div>
                         <span className="text-sm font-bold text-gray-700">Marketing</span>
                      </div>
                      <ChevronDown size={18} className="text-gray-400" />
                   </div>
                </div>
             </div>

             {/* PRIVACY SETTINGS */}
             <div className="space-y-3">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Privacy</label>
                <div className="flex p-1 bg-gray-50 rounded-2xl border border-gray-100">
                   <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white shadow-sm text-xs font-bold text-gray-800">
                      <Lock size={14} />
                      <span>Private</span>
                   </button>
                   <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-gray-400 hover:text-gray-600">
                      <Users size={14} />
                      <span>Team</span>
                   </button>
                </div>
             </div>
          </div>

          {/* PROJECT COLOR SELECTION */}
          <div className="space-y-4">
             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Project Color & Theme</label>
             <div className="flex items-center gap-8 flex-wrap">
                <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                   {projectColors.map((color) => (
                     <button 
                       key={color.id}
                       onClick={() => setSelectedColor(color.id)}
                       title={color.label}
                       className={`
                         w-10 h-10 rounded-xl transition-all relative flex items-center justify-center
                         ${selectedColor === color.id ? 'scale-110 shadow-lg ring-2 ring-white' : 'hover:scale-105 opacity-80'}
                       `}
                       style={{ backgroundColor: color.value }}
                     >
                        {selectedColor === color.id && <Star size={14} className="text-white drop-shadow-sm" />}
                     </button>
                   ))}
                </div>
                
                <div className="flex-1 min-w-[200px]">
                   <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner"
                        style={{ backgroundColor: projectColors.find(c => c.id === selectedColor).value }}
                      >
                         <Briefcase size={24} className="text-gray-700/50" />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-gray-800">Preview Layout</p>
                         <p className="text-[10px] text-gray-400 font-medium">This color will be applied to all project tasks.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* INVITE MEMBERS */}
          <div className="space-y-4 pt-4">
             <div className="flex items-center justify-between px-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Initial Members</label>
                <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">Invite all team</button>
             </div>
             <div className="bg-gray-50/50 border border-gray-100 rounded-3xl p-6 flex items-center gap-6">
                <AvatarGroup users={[{name: 'A'}, {name: 'B'}, {name: 'C'}]} size="44px" />
                <button className="w-11 h-11 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:border-blue-300 hover:text-blue-500 transition-all bg-white">
                   <Plus size={20} />
                </button>
                <p className="text-xs font-medium text-gray-400">Invite specific people to this project workspace.</p>
             </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-6">
           <button 
             onClick={onClose}
             className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-all"
           >
             Go back
           </button>
           <button 
             onClick={onClose}
             className="bg-[#2563EB] text-white px-10 py-3.5 rounded-2xl text-sm font-black shadow-xl shadow-blue-500/20 hover:bg-blue-600 hover:translate-y-[-2px] transition-all"
           >
             Create Project
           </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
