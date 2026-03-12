import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Users, Briefcase, TrendingUp, Calendar, 
  Plus, Search, MoreHorizontal, Mail, 
  MessageCircle, Settings, Filter, ChevronDown
} from 'lucide-react';
import { Avatar, AvatarGroup } from '../components/UI/Avatar';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';

const TeamView = () => {
  const { teamId } = useParams();
  const teamName = teamId ? teamId.charAt(0).toUpperCase() + teamId.slice(1) : 'Marketing';

  const members = [
    { name: 'Sofia Brown', role: 'Full-stack Developer', status: 'Online', email: 'sofia@gim.agency', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    { name: 'Michael Martinez', role: 'UI/UX Designer', status: 'In a meeting', email: 'michael@gim.agency', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    { name: 'Marry Williams', role: 'Product Manager', status: 'Online', email: 'marry@gim.agency' },
    { name: 'Anastasia Novak', role: 'Marketing Specialist', status: 'Away', email: 'anastasia@gim.agency' },
    { name: 'David Thomas', role: 'Frontend Developer', status: 'Online', email: 'david@gim.agency' },
  ];

  const teamProjects = [
    { name: 'Marketing Campaign', progress: 75, status: 'Active', tasks: 12 },
    { name: 'Website Redesign', progress: 30, status: 'In Review', tasks: 8 },
    { name: 'Social Media Kit', progress: 95, status: 'Active', tasks: 4 },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-white animate-fade-in overflow-hidden">
      {/* TOOLBAR: Simplified to match Calendar/Tasks */}
      <header className="h-16 px-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pr-4 border-r border-gray-100">
             <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <Users size={20} />
             </div>
             <h1 className="text-[18px] font-bold text-gray-800">{teamName} Team</h1>
          </div>
          <button className="bg-[#0095FF] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/10">
            <Plus size={16} strokeWidth={3} />
            <span>Invite</span>
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-gray-400">
             <Search size={18} className="cursor-pointer hover:text-gray-600" />
             <Filter size={18} className="cursor-pointer hover:text-gray-600" />
             <Settings size={18} className="cursor-pointer hover:text-gray-600" />
          </div>
          <div className="w-px h-6 bg-gray-100" />
          <Avatar name="User" size="32px" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" />
        </div>
      </header>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-8">
        <div className="max-w-[1400px] mx-auto space-y-8">
          
          {/* STATS: Minimalist Row */}
          <div className="grid grid-cols-4 gap-6">
             {[
               { label: 'Active Tasks', value: '42', color: 'text-blue-500' },
               { label: 'Efficiency', value: '94%', color: 'text-emerald-500' },
               { label: 'Meetings', value: '8/wk', color: 'text-amber-500' },
               { label: 'Completion', value: '88%', color: 'text-rose-500' },
             ].map((stat, i) => (
               <div key={i} className="p-6 rounded-[20px] bg-gray-50/50 border border-gray-100/50">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
               </div>
             ))}
          </div>

          <div className="grid grid-cols-12 gap-8">
             {/* MEMBER LIST: Clean Table */}
             <div className="col-span-8 space-y-4">
                <div className="flex items-center justify-between mb-2">
                   <h2 className="text-[16px] font-bold text-gray-800">Team Members</h2>
                   <span className="text-xs font-medium text-gray-400">{members.length} members total</span>
                </div>
                
                <div className="bg-white border border-gray-100 rounded-[20px] overflow-hidden">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Member</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4"></th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                         {members.map((member, i) => (
                           <tr key={i} className="hover:bg-gray-50/30 transition-colors group">
                              <td className="px-6 py-4">
                                 <div className="flex items-center gap-3">
                                    <Avatar name={member.name} src={member.avatar} size="36px" />
                                    <div className="text-sm font-bold text-gray-700">{member.name}</div>
                                 </div>
                              </td>
                              <td className="px-6 py-4 text-xs font-semibold text-gray-500">{member.role}</td>
                              <td className="px-6 py-4">
                                 <Badge variant={member.status === 'Online' ? 'success' : 'warning'}>{member.status}</Badge>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                    <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-all"><MessageCircle size={14}/></button>
                                    <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-all"><MoreHorizontal size={14}/></button>
                                 </div>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>

             {/* PROJECTS: Simple Cards */}
             <div className="col-span-4 space-y-4">
                <div className="flex items-center justify-between mb-2">
                   <h2 className="text-[16px] font-bold text-gray-800">Project Pulse</h2>
                   <button className="text-[11px] font-bold text-blue-500 uppercase tracking-widest">View all</button>
                </div>

                <div className="space-y-3">
                   {teamProjects.map((project, i) => (
                     <div key={i} className="p-5 bg-white border border-gray-100 rounded-[20px] hover:border-blue-100 transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                           <h4 className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">{project.name}</h4>
                           <Badge variant="success" className="text-[9px] uppercase font-black">{project.status}</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase mb-2">
                           <span>Progress</span>
                           <span>{project.progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden mb-4">
                           <div className="h-full bg-blue-500 rounded-full" style={{ width: `${project.progress}%` }} />
                        </div>

                        <div className="flex items-center justify-between">
                           <span className="text-[11px] font-bold text-gray-400">{project.tasks} tasks left</span>
                           <AvatarGroup users={[{name: 'A'}]} size="20px" />
                        </div>
                     </div>
                   ))}
                   
                   <button className="w-full border-2 border-dashed border-gray-50 rounded-[20px] py-6 flex flex-col items-center justify-center gap-2 text-gray-300 hover:text-blue-400 hover:bg-blue-50/50 hover:border-blue-100 transition-all group">
                      <Plus size={24} className="group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">New Project</span>
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamView;
