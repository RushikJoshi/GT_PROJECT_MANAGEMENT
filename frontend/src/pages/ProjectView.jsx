import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Briefcase, Calendar, Clock, CheckCircle2, 
  Plus, Search, Filter, MoreHorizontal,
  ChevronDown, LayoutGrid, Table as TableIcon,
  MessageSquare, Paperclip, Share2, Settings
} from 'lucide-react';
import { Avatar, AvatarGroup } from '../components/UI/Avatar';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import EventModal from '../components/modals/EventModal';

const ProjectView = () => {
  const { projectId } = useParams();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  
  const projName = projectId ? projectId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Marketing Campaign';

  const stats = [
    { label: 'Completed', value: '18/24', color: 'text-emerald-500' },
    { label: 'Time Spent', value: '124h', color: 'text-blue-500' },
    { label: 'Budget', value: '$12.5k', color: 'text-gray-800' },
    { label: 'Days Left', value: '14', color: 'text-orange-500' },
  ];

  const tasks = [
    { id: 1, title: 'Finalize brand guidelines', status: 'In Review', priority: 'High', date: 'Oct 24', time: '4h' },
    { id: 2, title: 'Hero section copywriting', status: 'In Progress', priority: 'Medium', date: 'Oct 25', time: '2h' },
    { id: 3, title: 'Responsive design audit', status: 'To Do', priority: 'Low', date: 'Oct 26', time: '6h' },
    { id: 4, title: 'Database schema optimization', status: 'Done', priority: 'High', date: 'Oct 22', time: '8h' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-white animate-fade-in overflow-hidden">
      {/* TOOLBAR */}
      <header className="h-16 px-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pr-4 border-r border-gray-100">
             <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                <Briefcase size={20} />
             </div>
             <h1 className="text-[18px] font-bold text-gray-800">{projName}</h1>
          </div>
          <button 
            onClick={() => setIsTaskModalOpen(true)}
            className="bg-[#0095FF] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/10"
          >
            <Plus size={16} strokeWidth={3} />
            <span>Add Task</span>
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-gray-400">
             <Share2 size={18} className="cursor-pointer hover:text-gray-600" />
             <Filter size={18} className="cursor-pointer hover:text-gray-600" />
             <Settings size={18} className="cursor-pointer hover:text-gray-600" />
          </div>
          <div className="w-px h-6 bg-gray-100" />
          <AvatarGroup users={[{name: 'A'}]} size="28px" />
        </div>
      </header>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-8">
        <div className="max-w-[1400px] mx-auto space-y-8">
          
          {/* STATS */}
          <div className="grid grid-cols-4 gap-6">
             {stats.map((stat, i) => (
               <div key={i} className="p-6 rounded-[20px] bg-gray-50/50 border border-gray-100/50">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
               </div>
             ))}
          </div>

          <div className="grid grid-cols-12 gap-8">
             {/* TASKS TABLE */}
             <div className="col-span-8 space-y-4">
                <div className="flex items-center justify-between mb-2">
                   <h2 className="text-[16px] font-bold text-gray-800">Recent Tasks</h2>
                   <div className="flex items-center bg-gray-50 p-1 rounded-lg">
                      <button className="p-1 px-2.5 bg-white shadow-sm rounded text-[10px] font-bold text-gray-800">TABLE</button>
                      <button className="p-1 px-2.5 text-[10px] font-bold text-gray-400 hover:text-gray-600">LIST</button>
                   </div>
                </div>
                
                <div className="bg-white border border-gray-100 rounded-[20px] overflow-hidden">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Task</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Priority</th>
                            <th className="px-6 py-4"></th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                         {tasks.map((task, i) => (
                           <tr key={i} className="hover:bg-gray-50/30 transition-colors group">
                              <td className="px-6 py-4 text-sm font-bold text-gray-700">{task.title}</td>
                              <td className="px-6 py-4">
                                 <Badge variant={task.status === 'Done' ? 'success' : 'info'}>{task.status}</Badge>
                              </td>
                              <td className="px-6 py-4">
                                 <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                                   task.priority === 'High' ? 'text-rose-600 bg-rose-50' : 'text-amber-600 bg-amber-50'
                                 }`}>
                                   {task.priority}
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <MoreHorizontal size={14} className="text-gray-300 ml-auto cursor-pointer" />
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>

             {/* ACTIVITY: Minimal Feed */}
             <div className="col-span-4 space-y-4">
                <h2 className="text-[16px] font-bold text-gray-800">Recent Activity</h2>
                <div className="space-y-4">
                   {[
                     { user: 'Sofia', action: 'uploaded files', target: 'Brand Assets', time: '2h ago', icon: Paperclip },
                     { user: 'David', action: 'moved task', target: 'Hero design', time: '4h ago', icon: CheckCircle2 },
                     { user: 'Michael', action: 'commented on', target: 'UX Audit', time: 'Yesterday', icon: MessageSquare },
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4 p-2">
                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                           <item.icon size={16} className="text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="text-[13px] text-gray-600 leading-snug">
                              <span className="font-bold text-gray-800">{item.user}</span> {item.action} <span className="text-blue-500 font-medium">{item.target}</span>
                           </p>
                           <span className="text-[10px] font-bold text-gray-300 uppercase block mt-1">{item.time}</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      <EventModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
      />
    </div>
  );
};

export default ProjectView;
