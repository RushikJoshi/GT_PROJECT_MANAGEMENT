import React, { useState } from 'react';
import { 
  Plus, Search, Filter, LayoutGrid, Table as TableIcon,
  MoreHorizontal, ChevronDown, Clock,
  Calendar, CheckCircle2, User, Group, Bell
} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import Badge from '../components/UI/Badge';
import { Avatar, AvatarGroup } from '../components/UI/Avatar';
import EventModal from '../components/modals/EventModal';

const Tasks = () => {
  const [view, setView] = useState('table');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const { toggleRightPanel } = useOutletContext();

  const tasks = [
    { id: 1, title: "Define target audiences for this campaign", status: "New task", type: "Operational", date: "10 Apr 2024", time: "1h", responsible: "Sofia Brown", color: "bg-blue-100 text-blue-800" },
    { id: 2, title: "Develop campaign messaging draft", status: "New task", type: "Operational", date: "11 Apr 2024", time: "45m", responsible: "Anastasia Novak", color: "bg-blue-100 text-blue-800" },
    { id: 3, title: "Reach Coreviews of campaign messaging", status: "New task", labels: ["Feedback"], type: "Important", date: "11 Apr 2024", time: "1h", responsible: "Marry Williams", color: "bg-amber-100 text-amber-800" },
    { id: 4, title: "Design campaign creative (general)", status: "New task", type: "Design", date: "11 Apr 2024", time: "3h", responsible: "Michael Martinez", color: "bg-rose-100 text-rose-800" },
    { id: 5, title: "Design a landing page", status: "New task", type: "Design", date: "11 Apr 2024", time: "2h", responsible: "Michael Martinez", color: "bg-rose-100 text-rose-800" },
    { id: 6, title: "Develop a landing page", status: "New task", type: "Operational", date: "11 Apr 2024", time: "4h", responsible: "David Thomas", color: "bg-blue-100 text-blue-800" },
    { id: 7, title: "Test the landing page", status: "New task", labels: ["Blocked"], type: "Important", date: "11 Apr 2024", time: "1h 30m", responsible: "Sofia Brown", color: "bg-amber-100 text-amber-800" },
    { id: 8, title: "Contact Outdoor vendor and request a proposal", status: "New task", type: "High priority", date: "12 Apr 2024", time: "2h", responsible: "Sofia Brown", color: "bg-purple-100 text-purple-800" },
    { id: 9, title: "Design Facebook banners", status: "New task", type: "Design", date: "13 Apr 2024", time: "2h", responsible: "Michael Martinez", color: "bg-rose-100 text-rose-800" },
    { id: 10, title: "Design Google Ads banners", status: "New task", type: "Design", date: "14 Apr 2024", time: "1h 30m", responsible: "Michael Martinez", color: "bg-rose-100 text-rose-800" },
    { id: 11, title: "Design Outdoor banners", status: "New task", type: "Design", date: "15 Apr 2024", time: "2h", responsible: "Michael Martinez", color: "bg-rose-100 text-rose-800" },
    { id: 12, title: "Approve banners", status: "New task", labels: ["Feedback"], type: "Important", date: "15 Apr 2024", time: "45m", responsible: "Marry Williams", color: "bg-amber-100 text-amber-800" },
  ];

  const getTypeStyle = (type) => {
    switch (type) {
      case 'Operational': return 'bg-[#ebf5ff] text-[#3b82f6]';
      case 'Important': return 'bg-[#fff7ed] text-[#f97316]';
      case 'Design': return 'bg-[#fef2f2] text-[#ef4444]';
      case 'High priority': return 'bg-[#faf5ff] text-[#a855f7]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white animate-fade-in">
      {/* TOOLBAR */}
      <header className="h-16 px-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsTaskModalOpen(true)}
            className="bg-[#0095FF] text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            <Plus size={16} strokeWidth={3} />
            <span>Add now</span>
          </button>
          
          <div className="flex items-center bg-gray-50 p-1 rounded-full border border-gray-100">
             <button 
               onClick={() => setView('table')}
               className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${view === 'table' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400'}`}
             >
                <TableIcon size={14} />
                <span>Table view</span>
             </button>
             <button 
               onClick={() => setView('kanban')}
               className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${view === 'kanban' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400'}`}
             >
                <LayoutGrid size={14} />
                <span>Kanban board</span>
             </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6 text-gray-400 mr-4">
             <Search size={18} className="cursor-pointer hover:text-gray-600" />
             <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
                <Group size={18} />
                <span className="text-xs font-semibold">Group</span>
             </div>
             <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
                <Filter size={18} />
                <span className="text-xs font-semibold">Filter</span>
             </div>
          </div>
          
          <div className="flex items-center gap-2 border-l border-gray-100 pl-4">
             <AvatarGroup users={[{name: 'A'}, {name: 'B'}, {name: 'C'}, {name: 'D'}]} size="28px" />
             <div className="relative">
                <Bell size={20} className="text-gray-400 cursor-pointer" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-semibold rounded-full flex items-center justify-center border-2 border-white">12</span>
             </div>
             <Avatar name="User" size="32px" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" />
          </div>
        </div>
      </header>

      {/* TABLE CONTENT */}
      <div className="flex-1 overflow-auto bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-gray-50">
              <th className="px-6 py-4">
                <div className="flex items-center gap-3">
                   <ChevronDown size={14} className="text-gray-400" />
                   <span className="text-[11px] font-semibold text-gray-800 uppercase tracking-wider">Active tasks</span>
                   <span className="text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full font-semibold">20</span>
                </div>
              </th>
              <th className="px-4 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-4 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Due date</th>
              <th className="px-4 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Est. time</th>
              <th className="px-4 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right">Responsible</th>
              <th className="px-4 py-4 text-right"><Settings size={14} className="text-gray-300 ml-auto" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {tasks.map(task => (
              <tr 
                key={task.id} 
                className="hover:bg-gray-50/50 cursor-pointer group transition-colors"
                onClick={() => toggleRightPanel(task)}
              >
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                     <div className="w-4 h-4 border-2 border-gray-200 rounded flex-shrink-0" />
                     <span className="text-[13px] font-medium text-gray-600">{task.title}</span>
                     {task.labels && task.labels.map(l => (
                       <span key={l} className="text-[10px] bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded font-semibold uppercase tracking-tight">{l}</span>
                     ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                   <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-gray-100 flex items-center justify-center">
                         <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      </div>
                      <span className="text-[12px] text-gray-400">{task.status}</span>
                   </div>
                </td>
                <td className="px-4 py-3">
                   <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-200" />
                      <span className={`text-[11px] font-semibold px-3 py-1 rounded-lg ${getTypeStyle(task.type)}`}>
                        {task.type}
                      </span>
                   </div>
                </td>
                <td className="px-4 py-3">
                   <span className="text-[12px] text-gray-500">{task.date}</span>
                </td>
                <td className="px-4 py-3 text-[12px] text-gray-500">
                   {task.time}
                </td>
                <td className="px-4 py-3 text-right" colSpan={2}>
                   <div className="flex items-center justify-end gap-2">
                      <span className="text-[12px] font-medium text-gray-600">{task.responsible}</span>
                      <Avatar name={task.responsible} size="24px" className="ring-2 ring-white" />
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EventModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
      />
    </div>
  );
};

const Settings = ({ size, className }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

export default Tasks;
