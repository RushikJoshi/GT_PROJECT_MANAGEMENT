import React from 'react';
import { 
  CheckSquare, Calendar, FileText, 
  Users, Settings
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const WorkspaceSidebar = () => {
  const location = useLocation();

  const tools = [
    { id: 'tasks', icon: CheckSquare, path: '/tasks' },
    { id: 'calendar', icon: Calendar, path: '/calendar', hasDate: true },
    { id: 'documents', icon: FileText, path: '/documents' },
    { id: 'members', icon: Users, path: '/teams' },
  ];

  return (
    <aside className="w-[80px] bg-white border-r border-[#E5E7EB] flex flex-col items-center py-6 h-full z-10 shrink-0">
      <div className="text-[13px] font-semibold text-gray-800 mb-8">Tools</div>

      <div className="flex-1 flex flex-col items-center gap-6 w-full">
        {tools.map((tool) => {
          const isActive = location.pathname.startsWith(tool.path);
          return (
            <NavLink
              key={tool.id}
              to={tool.path}
              className={({isActive}) => `
                relative w-12 h-12 rounded-xl flex items-center justify-center transition-all group
                ${isActive ? 'bg-white border-2 border-[#2563EB] shadow-lg shadow-blue-500/10' : 'hover:bg-gray-50'}
              `}
            >
              <tool.icon 
                size={24} 
                className={isActive ? 'text-[#2563EB]' : 'text-[#a0aec0] group-hover:text-gray-600'} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              {tool.hasDate && (
                <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-semibold mt-1.5 ${isActive ? 'text-[#2563EB]' : 'text-[#a0aec0] opacity-0 group-hover:opacity-100'}`}>
                  31
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      <div className="pb-4">
        <NavLink to="/settings" className="w-12 h-12 rounded-xl flex items-center justify-center text-[#a0aec0] hover:bg-gray-100 hover:text-gray-600 transition-all">
          <Settings size={24} strokeWidth={2} />
        </NavLink>
      </div>
    </aside>
  );
};

export default WorkspaceSidebar;
