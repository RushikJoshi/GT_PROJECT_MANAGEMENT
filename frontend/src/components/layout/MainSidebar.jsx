import React, { useState } from 'react';
import { 
  ChevronDown, Search, Plus, 
  MoreVertical, Hash, Folder, ChevronRight, Users, User
} from 'lucide-react';
import { Avatar, AvatarGroup } from '../UI/Avatar';
import { NavLink } from 'react-router-dom';
import CreateProjectModal from '../modals/CreateProjectModal';

const MainSidebar = () => {
  const [openProjects, setOpenProjects] = useState(true);
  const [openWebsiteFolder, setOpenWebsiteFolder] = useState(true);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const teams = [
    { name: 'Marketing', members: [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }, { name: 'E' }] },
    { name: 'Design', members: [{ name: 'F' }, { name: 'G' }] },
    { name: 'Development', members: [{ name: 'H' }] },
  ];

  const projects = [
    { name: 'Blog Post Writing', type: 'page' },
    { name: 'Employee Training', type: 'page' },
    { name: 'Video Recording', type: 'page' },
    { 
      name: 'New Website', 
      type: 'folder', 
      isOpen: openWebsiteFolder, 
      setOpen: setOpenWebsiteFolder,
      items: [
        { name: 'Website Development' },
        { name: 'Website Translation' }
      ]
    },
    { name: 'Sales Funnel', type: 'page' },
    { name: 'Marketing Campaign', type: 'page', active: true },
    { name: 'Mobile App', type: 'page' },
    { name: 'CRM Integration', type: 'page' },
    { name: 'Webinar', type: 'page' }
  ];

  return (
    <aside className="w-[280px] bg-[#141b2d] h-full flex flex-col text-white shadow-xl flex-shrink-0 z-20">
      {/* HEADER: WORKSPACE SWITCHER */}
      <div className="px-6 h-16 flex items-center justify-between group cursor-pointer border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0">
              <img src='/logo.png' />
          </div>
          <div className="flex items-center gap-2 overflow-hidden">
            <h2 className="text-sm font-semibold tracking-tight truncate">Gitakshmi PMS</h2>
            <ChevronDown size={14} className="text-[#a0aec0]" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none py-4">
        {/* SEARCH BAR */}
        <div className="px-6 mb-6">
          <div className="relative group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-[#a0aec0] group-focus-within:text-white transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full bg-transparent border-none pl-7 pr-2 py-1 text-sm text-white placeholder:text-[#a0aec0] focus:ring-0"
            />
          </div>
        </div>

        {/* MY WORK */}
        <div className="px-3 mb-6">
          <NavLink to="/my-work" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}>
            <Avatar 
              name="John Doe" 
              size="32px" 
              className="border-2 border-amber-400"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            />
            <span className="text-sm font-medium">My work</span>
          </NavLink>
        </div>

        {/* EMPLOYEE DASHBOARD LINK */}
        <div className="px-3 mb-6">
          <NavLink to="/employee" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}>
            <User size={20} className="text-[#a0aec0]" />
            <span className="text-sm font-medium">My Dashboard</span>
          </NavLink>
        </div>

        {/* TEAM-LEADER / EMPLOYEE LIST LINK */}
        <div className="px-3 mb-6">
          <NavLink to="/employees" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}>
            <Users size={20} className="text-[#a0aec0]" />
            <span className="text-sm font-medium">Employees</span>
          </NavLink>
        </div>

        {/* TEAMS SECTION */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-6 mb-2 group cursor-pointer">
            <div className="flex items-center gap-2">
              <ChevronDown size={14} className="text-[#a0aec0]" />
              <span className="text-[11px] font-semibold text-[#a0aec0] uppercase tracking-wider">Teams</span>
            </div>
            <Plus size={16} className="text-[#a0aec0] hover:text-white opacity-0 group-hover:opacity-100 transition-all" />
          </div>

          <div className="space-y-0.5 px-3">
            {teams.map((team) => (
              <NavLink 
                key={team.name}
                to={`/teams/${team.name.toLowerCase()}`}
                className={({isActive}) => `
                  flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all group
                  ${isActive ? 'bg-[#2d3a54] text-white' : 'text-[#a0aec0] hover:bg-white/5 hover:text-white'}
                `}
              >
                <span className="text-sm font-medium">{team.name}</span>
                <div className="shrink-0">
                  <AvatarGroup users={team.members.map(m => ({ name: m.name }))} size="22px" limit={3} />
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        {/* PROJECTS SECTION */}
        <div className="mb-6">
          <div className="flex items-center justify-between px-6 mb-2 group cursor-pointer" onClick={() => setOpenProjects(!openProjects)}>
            <div className="flex items-center gap-2">
              {openProjects ? <ChevronDown size={14} className="text-[#a0aec0]" /> : <ChevronRight size={14} className="text-[#a0aec0]" />}
              <span className="text-[11px] font-semibold text-[#a0aec0] uppercase tracking-wider">Projects</span>
            </div>
            <Plus 
              size={16} 
              className="text-[#a0aec0] hover:text-white opacity-0 group-hover:opacity-100 transition-all cursor-pointer" 
              onClick={(e) => {
                e.stopPropagation();
                setIsProjectModalOpen(true);
              }}
            />
          </div>

          {openProjects && (
            <div className="space-y-0.5 px-3">
              {projects.map((proj, idx) => {
                if (proj.type === 'folder') {
                  return (
                    <div key={idx} className="space-y-0.5">
                      <div 
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#a0aec0] hover:bg-white/5 hover:text-white cursor-pointer transition-all"
                        onClick={() => proj.setOpen(!proj.isOpen)}
                      >
                        {proj.isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        <Folder size={14} className="text-blue-400" />
                        <span className="text-sm font-medium">{proj.name}</span>
                      </div>
                      {proj.isOpen && (
                        <div className="ml-6 space-y-0.5 border-l border-white/10 pl-2">
                          {proj.items.map((sub, sIdx) => {
                            const subPath = `/projects/${sub.name.toLowerCase().replace(/\s+/g, '-')}`;
                            return (
                              <NavLink 
                                key={sIdx} 
                                to={subPath}
                                className={({isActive}) => `
                                  block px-3 py-1.5 rounded-lg text-xs transition-all
                                  ${isActive ? 'text-white bg-white/10' : 'text-[#a0aec0] hover:bg-white/5 hover:text-white'}
                                `}
                              >
                                {sub.name}
                              </NavLink>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <NavLink 
                    key={idx}
                    to={`/projects/${proj.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className={({isActive}) => `
                      flex items-center gap-2 px-3 py-2 rounded-xl transition-all
                      ${isActive || proj.active ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/20' : 'text-[#a0aec0] hover:bg-white/5 hover:text-white'}
                    `}
                  >
                    <span className="text-sm font-medium truncate">{proj.name}</span>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* INVITE BOTTOM */}
      <div className="p-4 border-t border-white/5">
        <button className="w-full py-2.5 px-4 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
           <Plus size={14} /> Invite people
        </button>
      </div>

      <CreateProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
      />
    </aside>
  );
};

export default MainSidebar;
