import React from 'react';
import Card from '../components/UI/Card';
import Badge from '../components/UI/Badge';
import { Avatar, AvatarGroup } from '../components/UI/Avatar';
import { 
  CheckCircle2, Clock, AlertCircle, TrendingUp, 
  Calendar as CalendarIcon, MoreVertical, Plus,
  ChevronRight, Play
} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

const Dashboard = () => {
  const { toggleRightPanel } = useOutletContext();

  const stats = [
    { label: "Today's Tasks", value: 8, change: "+2", icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Overdue", value: 3, change: "-1", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Hours logged", value: "32h", change: "+4h", icon: Clock, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Efficiency", value: "94%", change: "+2%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const recentTasks = [
    { id: 1, title: "Website Redesign - Phase 1", project: "Marketing", status: "In Progress", priority: "High", time: "2h ago", users: [{name: 'JD'}, {name: 'AS'}] },
    { id: 2, title: "Fix API Authentication bug", project: "Development", status: "Review", priority: "Critical", time: "4h ago", users: [{name: 'MK'}] },
    { id: 3, title: "Create brand guidelines", project: "Design", status: "To Do", priority: "Medium", time: "6h ago", users: [{name: 'SW'}, {name: 'JD'}] },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Morning, John 👋</h1>
          <p className="text-sm text-[#6B7280] font-medium mt-1">Here is what is happening in your workspace today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-[#E5E7EB] rounded-lg px-4 py-2 flex items-center gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <CalendarIcon size={16} className="text-[#6B7280]" />
            <span className="text-sm font-semibold">Oct 24, 2024</span>
          </div>
          <button className="bg-[#2563EB] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2">
            <Plus size={18} />
            <span>Quick Task</span>
          </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} padding="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.change}
              </span>
              <span className="text-xs text-[#6B7280] font-medium">since yesterday</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* RECENT ACTIVITY / TASKS */}
        <div className="xl:col-span-2 space-y-6">
          <Card padding="p-0 overflow-hidden">
            <div className="px-6 py-5 border-b border-[#E5E7EB] flex items-center justify-between">
              <h3 className="font-bold text-sm">Recent Tasks</h3>
              <button className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider hover:underline">View All</button>
            </div>
            <div className="divide-y divide-[#E5E7EB]">
              {recentTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="px-6 py-4 flex items-center justify-between hover:bg-[#F9FAFB] cursor-pointer group transition-colors"
                  onClick={() => toggleRightPanel(task)}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-9 w-9 bg-white border border-[#E5E7EB] rounded-lg flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all">
                      <Play size={14} fill="currentColor" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold group-hover:text-[#2563EB] transition-colors">{task.title}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">{task.project}</span>
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

          {/* PROJECT PROGRESS CHART PREVIEW */}
          <Card padding="p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-sm">Team Workload</h3>
              <div className="flex gap-2">
                 <Badge variant="blue">Week</Badge>
                 <Badge variant="gray">Month</Badge>
              </div>
            </div>
            <div className="flex items-end justify-between h-48 gap-3">
              {[60, 40, 80, 50, 90, 70, 45].map((h, i) => (
                <div key={i} className="flex-1 space-y-2 group">
                  <div className="w-full bg-[#f3f4f6] rounded-t-lg relative h-full">
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-[#2563EB] rounded-t-lg transition-all duration-500 group-hover:opacity-80" 
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <p className="text-[9px] font-bold text-[#6B7280] text-center uppercase tracking-tighter">Day {i+1}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT: UPCOMING & QUICK ACTIONS */}
        <div className="space-y-6">
          <Card padding="p-6" className="bg-[#2563EB] border-none shadow-xl shadow-blue-500/20 text-white">
            <h3 className="font-bold text-sm mb-2">Workspace Tip</h3>
            <p className="text-xs text-blue-100 leading-relaxed mb-6">
              You can drag tasks from the waiting list directly onto the calendar to schedule them in seconds.
            </p>
            <button className="w-full bg-white text-[#2563EB] py-2.5 rounded-lg text-xs font-bold hover:bg-blue-50 transition-all">
              Try it now
            </button>
          </Card>

          <Card padding="p-6 text-center">
             <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={24} />
             </div>
             <h4 className="font-bold text-sm mb-1">3 Overdue Tasks</h4>
             <p className="text-xs text-[#6B7280] mb-6">These tasks passed their deadlines.</p>
             <button className="text-[#2563EB] text-xs font-bold flex items-center gap-1 mx-auto hover:underline">
                View Overdue <ChevronRight size={14} />
             </button>
          </Card>

          <Card padding="p-6">
            <h3 className="font-bold text-sm mb-6">Upcoming Deadlines</h3>
            <div className="space-y-5">
              {[
                { label: 'API Integration', date: 'Tomorrow', color: 'bg-rose-500' },
                { label: 'User Feedback', date: 'In 2 days', color: 'bg-orange-500' },
                { label: 'Final Polish', date: 'Oct 28', color: 'bg-blue-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className={`w-1.5 h-10 rounded-full ${item.color} shrink-0`} />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">{item.label}</p>
                    <p className="text-[10px] text-[#6B7280] font-medium mt-0.5">{item.date}</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;