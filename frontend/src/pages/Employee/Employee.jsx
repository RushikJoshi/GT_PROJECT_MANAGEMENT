import React from 'react';
import Card from '../../components/UI/Card';
import Badge from '../../components/UI/Badge';
import { AvatarGroup } from '../../components/UI/Avatar';
import { 
  CheckCircle2, Clock, AlertCircle, TrendingUp, 
  Calendar as CalendarIcon, MoreVertical, Plus
} from 'lucide-react';

const EmployeeDashboard = () => {
  // placeholder data; real implementation would fetch per-user info
  const stats = [
    { label: "My Tasks", value: 12, icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Completed", value: 5, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Overdue", value: 1, icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" }
  ];

  const myTasks = [
    { id: 1, title: "Finish UI mockups", project: "Design", status: "In Progress", priority: "High", time: "1h ago", users: [{name:'ME'}] },
    { id: 2, title: "Reply to client email", project: "Support", status: "To Do", priority: "Medium", time: "3h ago", users: [{name:'ME'}] },
    { id: 3, title: "Update documentation", project: "Dev", status: "Review", priority: "Low", time: "1d ago", users: [{name:'ME'}] }
  ];

  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back, Jane</h1>
          <p className="text-sm text-[#6B7280] font-medium mt-1">Here's what's on your plate today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-[#E5E7EB] rounded-lg px-4 py-2 flex items-center gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <CalendarIcon size={16} className="text-[#6B7280]" />
            <span className="text-sm font-semibold">Oct 24, 2024</span>
          </div>
          <button className="bg-[#2563EB] text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2">
            <Plus size={18} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((s,i)=>(
          <Card key={i} padding="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1">{s.label}</p>
                <h3 className="text-2xl font-semibold">{s.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${s.bg} ${s.color}`}>
                <s.icon size={20} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* tasks list */}
      <Card padding="p-0 overflow-hidden">
        <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-center justify-between">
          <h3 className="font-semibold text-sm">My Tasks</h3>
          <button className="text-[11px] font-semibold text-[#2563EB] uppercase tracking-wider hover:underline">View All</button>
        </div>
        <div className="divide-y divide-[#E5E7EB]">
          {myTasks.map((task) => (
            <div 
              key={task.id} 
              className="px-6 py-4 flex items-center justify-between hover:bg-[#F9FAFB] cursor-pointer group transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all">
                  <Plus size={14} fill="currentColor" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold group-hover:text-[#2563EB] transition-colors">{task.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest">{task.project}</span>
                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-[10px] text-[#6B7280] font-medium">{task.status}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <AvatarGroup users={task.users} size="24px" />
                <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-200 rounded-md transition-all">
                  <MoreVertical size={16} className="text-[#6B7280]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* upcoming deadlines */}
      <Card padding="p-6">
        <h3 className="font-semibold text-sm mb-4">Upcoming Deadlines</h3>
        <div className="space-y-4">
          {[
            { label: 'Submit timesheet', date: 'Tomorrow', color: 'bg-rose-500' },
            { label: 'Weekly sync', date: 'In 2 days', color: 'bg-blue-500' },
          ].map((item,i)=>(
            <div key={i} className="flex items-center gap-4 group cursor-pointer">
              <div className={`w-1.5 h-10 rounded-full ${item.color} shrink-0`} />
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#111827] group-hover:text-[#2563EB] transition-colors">{item.label}</p>
                <p className="text-[10px] text-[#6B7280] font-medium mt-0.5">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default EmployeeDashboard;
