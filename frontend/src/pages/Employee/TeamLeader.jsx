import React from 'react';
import { Search, Plus, Filter, MoreHorizontal } from 'lucide-react';
import { Avatar } from '../../components/UI/Avatar';
import Badge from '../../components/UI/Badge';

export const TeamLeader = () => {
  const employees = [
    {
      name: 'Sofia Brown',
      role: 'Full-stack Developer',
      email: 'sofia@example.com',
      status: 'Active',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    {
      name: 'Michael Martinez',
      role: 'UI/UX Designer',
      email: 'michael@example.com',
      status: 'Inactive',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
    {
      name: 'Marry Williams',
      role: 'Product Manager',
      email: 'marry@example.com',
      status: 'Active',
    },
    {
      name: 'Anastasia Novak',
      role: 'Marketing Specialist',
      email: 'anastasia@example.com',
      status: 'Active',
    },
    {
      name: 'David Thomas',
      role: 'Frontend Developer',
      email: 'david@example.com',
      status: 'Inactive',
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-white animate-fade-in overflow-hidden">
      {/* HEADER */}
      <header className="h-16 px-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
        <h1 className="text-[18px] font-semibold text-gray-800">Employees</h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            <Plus size={16} strokeWidth={3} />
            <span>Add Employee</span>
          </button>
          <Search size={18} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
          <Filter size={18} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
        </div>
      </header>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-8">
        <div className="max-w-[1400px] mx-auto space-y-8">
          <div className="bg-white border border-gray-100 rounded-[20px] overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {employees.map((e, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50/30 transition-colors group"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <Avatar name={e.name} src={e.avatar} size="36px" />
                      <div className="text-sm font-semibold text-gray-700">
                        {e.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-gray-500">
                      {e.role}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {e.email}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          e.status === 'Active' ? 'success' : 'warning'
                        }
                      >
                        {e.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-all">
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeader;