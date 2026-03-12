import React from 'react';
import { 
  X, Calendar, Clock, Video, 
  Paperclip, Bell, RefreshCcw, 
  ChevronDown, Plus, Star
} from 'lucide-react';
import { Avatar } from '../UI/Avatar';

const EventModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const participants = [
    { name: 'Marry Williams', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', lead: true },
    { name: 'Anastasia Novak', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { name: 'Sofia Brown', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    { name: 'David Thomas', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-fade-in p-4">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative animate-drop-in max-h-[90vh]">
        
        {/* LEFT SECTION: MAIN FIELDS */}
        <div className="flex-1 p-8 md:p-10 space-y-8 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Create event</h2>
            <button className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
              <RefreshCcw size={16} />
              <span className="text-xs font-bold">Repeat event</span>
            </button>
          </div>

          {/* DATE & TIME ROW */}
          <div className="flex flex-wrap items-center gap-4">
             <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex items-center gap-3 flex-1 min-w-[180px]">
                <Calendar size={18} className="text-gray-400" />
                <span className="text-sm font-semibold text-gray-700">12 Apr 2024</span>
             </div>
             <div className="flex items-center gap-2 grow">
                <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 grow text-center">13:00</div>
                <span className="text-gray-400 font-bold">—</span>
                <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 grow text-center">13:30</div>
             </div>
          </div>

          {/* TITLE INPUT */}
          <input 
            type="text" 
            placeholder="Project status update meeting"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-semibold text-gray-800 placeholder:text-gray-300 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
          />

          {/* MEETING PROVIDER */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
             <div className="border border-gray-200 rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 min-w-[180px] bg-white cursor-pointer hover:bg-gray-50">
                <div className="flex items-center gap-3">
                   <Video size={18} className="text-blue-500" />
                   <span className="text-sm font-semibold">Google meet</span>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
             </div>
             <span className="text-sm text-gray-400 font-medium">Link will be generated automatically</span>
          </div>

          {/* DESCRIPTION / NOTES */}
          <div className="border border-gray-200 rounded-xl p-5 space-y-4">
             <div className="text-sm font-semibold text-gray-700">Let's discuss: 👇</div>
             <ul className="text-xs text-gray-500 space-y-2 list-disc pl-4 leading-relaxed font-medium">
                <li>What progress have we made toward the campaign's launch</li>
                <li>What are the major challenges or obstacles that have arisen</li>
                <li>Are we on track to meet our next set of milestones</li>
                <li>Have there been any delays, and if so, what are the reasons and proposed adjustments to the timeline?</li>
             </ul>
          </div>

          {/* BOTTOM ACTIONS */}
          <div className="flex items-center gap-3 pt-2">
             <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-400 hover:text-gray-600 rounded-xl text-xs font-bold transition-all">
                <Paperclip size={16} />
                <span>Attach file</span>
             </button>
             <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-400 hover:text-gray-600 rounded-xl text-xs font-bold transition-all">
                <Bell size={16} />
                <span>Set reminder</span>
             </button>
          </div>
        </div>

        {/* RIGHT SECTION: SIDEBAR */}
        <div className="w-full md:w-[320px] bg-gray-50/50 border-l border-gray-100 p-8 space-y-10">
          <div>
            <h4 className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-3">Create in</h4>
            <div className="text-sm font-bold text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">Marketing campaign</div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-3">Type</h4>
            <div className="flex items-center gap-3 bg-white border border-gray-100 px-4 py-2.5 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-all">
               <div className="w-5 h-5 bg-orange-100 rounded-md border border-orange-200" />
               <span className="text-sm font-semibold text-gray-700">Meeting & Interview</span>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-4">Participants</h4>
            <div className="space-y-4">
               {participants.map((person, i) => (
                 <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                       <div className="relative">
                          <Avatar name={person.name} src={person.avatar} size="32px" />
                          {person.lead && <div className="absolute -top-1 -left-1 text-blue-500 fill-blue-500"><Star size={10} fill="currentColor" /></div>}
                       </div>
                       <span className="text-sm font-semibold text-gray-700">{person.name}</span>
                    </div>
                 </div>
               ))}
               <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-blue-600 transition-all pt-2 group">
                  <Plus size={16} className="text-gray-300 group-hover:text-blue-500" />
                  <span>Add participants</span>
               </button>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-end gap-6 bg-white/80 backdrop-blur-md border-t border-gray-50">
           <button 
             onClick={onClose}
             className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-all"
           >
             Cancel
           </button>
           <button 
             onClick={onClose}
             className="bg-[#0095FF] text-white px-10 py-3 rounded-xl text-sm font-black shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all"
           >
             Create event
           </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
