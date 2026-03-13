import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Plus, Search, Filter, 
  ChevronDown, Group, Bell, MoreHorizontal, Clock,
  MessageSquare, Star
} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { Avatar, AvatarGroup } from '../components/UI/Avatar';
import EventModal from '../components/modals/EventModal';
import TaskCard from '../components/UI/TaskCard';

const MyWork = () => {
  const { toggleRightPanel } = useOutletContext();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const days = [
    {
      date: '10 Tue',
      totalTime: '8h 0m',
      active: true,
      tasks: [
        { id: 1, title: 'Analyze proposals and choose 2-3 best candidates', subtitle: 'Website Translation', project: 'Procurement', projectColor: 'blue', priority: 'Medium', time: '1:00h' },
        { id: 2, title: 'Negotiate contract terms with John', project: 'Legal', projectColor: 'orange', priority: 'High', time: '12:30 - 14:00' },
        { id: 3, title: 'Prepare the information about the webinar and pass it to Sofia', subtitle: 'Webinar', project: 'Marketing', projectColor: 'green', priority: 'Medium', time: '3:00h' },
        { id: 4, title: 'Get ready for the executive meeting', project: 'Management', projectColor: 'gray', priority: 'High', time: '1:30h' },
        { id: 5, title: 'Reach Consensus on campaign messaging', subtitle: 'Marketing campaign', project: 'Marketing', projectColor: 'green', priority: 'Low', time: '1:00h', labels: ['Feedback'] },
      ]
    },
    {
      date: '11 Wed',
      totalTime: '6h 30m',
      tasks: [
        { id: 6, title: 'Executive meeting', project: 'Management', projectColor: 'gray', priority: 'High', time: '9:30 - 11:00' },
        { id: 7, title: 'Check resumes and test assignments from candidates', project: 'Procurement', projectColor: 'blue', priority: 'Medium', time: '2:30h', labels: ['4 days left'] },
        { id: 8, title: 'Discuss design drafts and make a decision', subtitle: 'Website Development', project: 'Design', projectColor: 'purple', priority: 'High', time: '13:00 - 14:30' },
        { id: 9, title: 'Check new Google Events', project: 'Internal', projectColor: 'blue', priority: 'Low', time: '1:00h' },
      ]
    },
    {
      date: '12 Thu',
      totalTime: '5h 0m',
      tasks: [
        { id: 10, title: '1-to-1 with Sofia', project: 'Internal', projectColor: 'orange', priority: 'Medium', time: '8:00 - 10:00' },
        { id: 11, title: 'Analyze the ROI of marketing campaigns', project: 'Marketing', projectColor: 'pink', priority: 'High', time: '3:00h', labels: ['Important'] },
        { id: 12, title: 'Weekly team meeting', project: 'Management', projectColor: 'gray', priority: 'Medium', time: '16:00 - 17:00' },
      ]
    },
    {
      date: '13 Fri',
      totalTime: '5h 30m',
      tasks: [
        { id: 13, title: 'Webinar Rehearsal', subtitle: 'Webinar', project: 'Marketing', projectColor: 'green', priority: 'Medium', time: '3:00h' },
        { id: 14, title: 'Sign the contract and NDA', subtitle: 'Website Translation', project: 'Legal', projectColor: 'blue', priority: 'High', time: '1:00h' },
        { id: 15, title: 'Check article: The Power of SEO', subtitle: 'Blog Post Writing', project: 'Content', projectColor: 'blue', priority: 'Low', time: '0:45h' },
        { id: 16, title: 'Approve banners', subtitle: 'Marketing campaign', project: 'Marketing', projectColor: 'green', priority: 'Low', time: '0:45h', labels: ['Feedback'] },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white animate-fade-in overflow-hidden">
      {/* TOOLBAR */}
      <header className="h-16 px-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsEventModalOpen(true)}
            className="bg-[#0095FF] text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/10"
          >
            <Plus size={16} strokeWidth={3} />
            <span>Add new</span>
          </button>
          
          <button className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
            <span>Today</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
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
          
          <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
             <AvatarGroup users={[{name: 'A'}, {name: 'B'}, {name: 'C'}]} size="28px" />
             <div className="relative">
                < Bell size={20} className="text-gray-400 cursor-pointer" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-semibold rounded-full flex items-center justify-center border-2 border-white">12</span>
             </div>
             <Avatar name="User" size="32px" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" />
          </div>
        </div>
      </header>

      {/* PLANNER CONTAINER */}
      <div className="flex-1 flex flex-col overflow-hidden">
          {/* MONTH & DAY SLIDER */}
          <div className="flex items-center px-6 py-3 border-b border-gray-50 bg-gray-50/30">
             <div className="flex items-center gap-2 mr-10">
                <span className="text-xs font-semibold text-gray-400 capitalize">April</span>
                <ChevronLeft size={14} className="text-gray-300 cursor-pointer hover:text-gray-600" />
             </div>
             
             <div className="flex flex-1 overflow-x-auto scrollbar-none gap-0">
               {days.map((day, idx) => (
                 <div key={idx} className="min-w-[240px] flex-1 flex flex-col items-center">
                    <div className={`relative px-6 py-2 flex flex-col items-center group cursor-pointer w-full transition-all`}>
                       <span className={`text-[13px] font-semibold ${day.active ? 'text-gray-800' : 'text-gray-400'}`}>{day.date}</span>
                       {day.active && <div className="absolute bottom-0 left-[40%] right-[40%] h-1 bg-[#2563EB] rounded-full" />}
                    </div>
                    <div className="text-[10px] font-semibold text-gray-300 py-1">{day.totalTime}</div>
                 </div>
               ))}
               <div className="min-w-[40px] flex items-center justify-center text-gray-300">
                  <ChevronRight size={18} />
               </div>
             </div>
          </div>

          {/* CALENDAR BODY */}
          <div className="flex-1 overflow-y-auto scrollbar-thin bg-white flex">
             {days.map((day, dIdx) => (
               <div key={dIdx} className="flex-1 border-r border-gray-50 flex flex-col gap-3 p-4 min-w-[240px]">
                  {day.tasks.map(task => (
                    <TaskCard 
                      key={task.id}
                      title={task.title}
                      project={task.subtitle || task.project}
                      projectColor={task.projectColor}
                      priority={task.priority}
                      duration={task.time}
                      labels={task.labels}
                      onClick={() => toggleRightPanel(task)}
                    />
                  ))}
                  <div 
                    onClick={() => setIsEventModalOpen(true)}
                    className="border-2 border-dashed border-transparent hover:border-gray-100 hover:bg-gray-50/50 rounded-[18px] h-16 flex items-center justify-center text-gray-200 transition-all cursor-pointer"
                  >
                     <Plus size={20} />
                  </div>
               </div>
             ))}
          </div>
      </div>

      <EventModal 
        isOpen={isEventModalOpen} 
        onClose={() => setIsEventModalOpen(false)} 
      />
    </div>
  );
};

export default MyWork;
