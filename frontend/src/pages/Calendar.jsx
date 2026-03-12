import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Plus, Search, Filter, 
  ChevronDown, Group, Bell, MoreHorizontal, Clock,
  Calendar as CalendarIcon, CheckSquare, MessageSquare, Paperclip
} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { Avatar, AvatarGroup } from '../components/UI/Avatar';
import EventModal from '../components/modals/EventModal';
import TaskCard from '../components/UI/TaskCard';

const CalendarView = () => {
  const { toggleRightPanel } = useOutletContext();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const days = [
    {
      date: '10 Tue',
      totalTime: '2h 45m',
      active: true,
      tasks: [
        { id: 1, title: 'Define target audiences for this campaign', project: 'Marketing', projectColor: 'green', priority: 'High', time: '1:00h', labels: ['Due today'] },
        { id: 2, title: 'Develop campaign messaging draft', project: 'Marketing', projectColor: 'green', priority: 'Medium', time: '0:45h', labels: ['Due tomorrow'] },
        { id: 3, title: 'Reach Consensus on campaign messaging', project: 'Marketing', projectColor: 'green', priority: 'Low', time: '1:00h', labels: ['Feedback'] },
      ]
    },
    {
      date: '11 Wed',
      totalTime: '7h 0m',
      tasks: [
        { id: 4, title: 'Design campaign creative (general)', project: 'Design', projectColor: 'purple', priority: 'High', time: '3:00h', labels: ['Due tomorrow'] },
        { id: 5, title: 'Contact Outdoor vendor and request a proposal', project: 'Marketing', projectColor: 'green', priority: 'Medium', time: '2:00h', labels: ['2 days left'] },
        { id: 6, title: 'Write a video script', project: 'Content', projectColor: 'blue', priority: 'Low', time: '2:00h', labels: ['3 days left'] },
      ]
    },
    {
      date: '12 Thu',
      totalTime: '13h 30m',
      tasks: [
        { id: 7, title: 'Design a landing page', project: 'Design', projectColor: 'purple', priority: 'High', time: '7:00h', labels: ['3 days left'] },
        { id: 8, title: 'Find a video production company', project: 'Content', projectColor: 'blue', priority: 'Medium', time: '1:30h' },
        { id: 9, title: 'Write ad copy for Facebook ads', project: 'Marketing', projectColor: 'green', priority: 'Low', time: '2:30h', labels: ['8 days left'] },
        { id: 10, title: 'Write ad copy for Google Ads', project: 'Marketing', projectColor: 'green', priority: 'Low', time: '2:30h', labels: ['6 days left'] },
      ]
    },
    {
      date: '13 Fri',
      totalTime: '14h 15m',
      tasks: [
        { id: 11, title: 'Develop a landing page', project: 'Development', projectColor: 'blue', priority: 'High', time: '7:00h', labels: ['8 days left'] },
        { id: 12, title: 'Test the Landing Page', project: 'Development', projectColor: 'blue', priority: 'Medium', time: '1:30h', labels: ['Blocked'] },
        { id: 13, title: 'Design Facebook banners', project: 'Design', projectColor: 'purple', priority: 'Low', time: '1:30h', labels: ['3 days left'] },
        { id: 14, title: 'Design Google Ads banners', project: 'Design', projectColor: 'purple', priority: 'Low', time: '1:30h', labels: ['3 days left'] },
        { id: 15, title: 'Design Outdoor banners', project: 'Design', projectColor: 'purple', priority: 'Low', time: '2:00h', labels: ['3 days left'] },
        { id: 16, title: 'Approve banners', project: 'Client Work', projectColor: 'orange', priority: 'High', time: '0:45h', labels: ['Feedback'] },
      ]
    }
  ];

  const waitingList = [
    { id: 101, title: 'Send visual materials and specifications to Outdoor...', project: 'Procurement', projectColor: 'gray', priority: 'Medium', time: '0:30h' },
    { id: 102, title: 'Set up the target audience in Facebook Business Manager', project: 'Marketing', projectColor: 'green', priority: 'High', time: '1:30h', labels: ['5 days left'] },
    { id: 103, title: 'Set up Facebook Ads campaigns', project: 'Marketing', projectColor: 'green', priority: 'High', time: '4:00h', labels: ['8 days left'] },
    { id: 104, title: 'Check the final campaign setup', project: 'Marketing', projectColor: 'green', priority: 'Low', time: '1:30h' },
  ];

  return (
    <div className="flex flex-col h-full bg-white animate-fade-in overflow-hidden">
      {/* TOOLBAR */}
      <header className="h-16 px-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10 transition-all">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsEventModalOpen(true)}
            className="bg-[#0095FF] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/10"
          >
            <Plus size={16} strokeWidth={3} />
            <span>Add new</span>
          </button>
          
          <button className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full text-xs font-bold text-gray-700 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200">
            <span>Today</span>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6 text-gray-400 mr-4">
             <Search size={18} className="cursor-pointer hover:text-gray-600" />
             <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
                <Group size={18} />
                <span className="text-xs font-bold">Group</span>
             </div>
             <div className="flex items-center gap-1 cursor-pointer hover:text-gray-600">
                <Filter size={18} />
                <span className="text-xs font-bold">Filter</span>
             </div>
          </div>
          
          <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
             <AvatarGroup users={[{name: 'A'}, {name: 'B'}, {name: 'C'}, {name: 'D'}]} size="28px" />
             <div className="relative">
                <Bell size={20} className="text-gray-400 cursor-pointer" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">12</span>
             </div>
             <Avatar name="Marry Williams" size="32px" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" />
          </div>
        </div>
      </header>

      {/* PLANNER CONTAINER */}
      <div className="flex flex-1 overflow-hidden">
        {/* MAIN CALENDAR GRID */}
        <div className="flex-1 flex flex-col overflow-hidden border-r border-gray-100">
          {/* MONTH & DAY SLIDER */}
          <div className="flex items-center px-6 py-3 border-b border-gray-50 bg-gray-50/30">
             <div className="flex items-center gap-2 mr-10">
                <span className="text-xs font-bold text-gray-400 capitalize">April</span>
                <ChevronLeft size={14} className="text-gray-300 cursor-pointer hover:text-gray-600" />
             </div>
             
             <div className="flex flex-1 overflow-x-auto scrollbar-none gap-0">
               {days.map((day, idx) => (
                 <div key={idx} className="min-w-[200px] flex-1 flex flex-col items-center">
                    <div className={`relative px-6 py-2 flex flex-col items-center group cursor-pointer w-full transition-all`}>
                       <span className={`text-[13px] font-bold ${day.active ? 'text-gray-800' : 'text-gray-400'}`}>{day.date}</span>
                       {day.active && <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-[#2563EB] rounded-full" />}
                    </div>
                    <div className="text-[10px] font-bold text-gray-300 py-1">{day.totalTime}</div>
                 </div>
               ))}
               <div className="min-w-[40px] flex items-center justify-center text-gray-300">
                  <ChevronRight size={18} />
               </div>
             </div>
          </div>

          {/* CALENDAR BODY (Day Columns) */}
          <div className="flex-1 overflow-y-auto scrollbar-thin bg-white flex">
             {days.map((day, dIdx) => (
               <div key={dIdx} className="flex-1 border-r border-gray-50 flex flex-col gap-3 p-4 min-w-[200px]">
                  {day.tasks.map(task => (
                    <TaskCard 
                      key={task.id}
                      title={task.title}
                      project={task.project}
                      projectColor={task.projectColor}
                      priority={task.priority}
                      duration={task.time}
                      labels={task.labels}
                      onClick={() => toggleRightPanel(task)}
                    />
                  ))}
                  {/* Plus placeholders on hover */}
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

        {/* WAITING LIST (Right) */}
        <aside className="w-[280px] bg-white flex flex-col border-l border-gray-50 animate-fade-in shrink-0">
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-50">
             <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Waiting list</h3>
                <span className="text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full font-bold">4</span>
             </div>
             <div className="flex items-center gap-3 text-gray-300">
                <Plus size={16} className="cursor-pointer hover:text-gray-600" />
                <Search size={16} className="cursor-pointer hover:text-gray-600" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
             {waitingList.map(task => (
               <TaskCard 
                 key={task.id}
                 title={task.title}
                 project={task.project}
                 projectColor={task.projectColor}
                 priority={task.priority}
                 duration={task.time}
                 labels={task.labels}
                 onClick={() => toggleRightPanel(task)}
               />
             ))}
             
             {/* Empty space for interaction */}
             <div className="h-20 border-2 border-dashed border-gray-100 rounded-[18px] flex items-center justify-center text-gray-200">
               <Plus size={24} />
             </div>
          </div>
        </aside>
      </div>

      {/* EVENT CREATION MODAL */}
      <EventModal 
        isOpen={isEventModalOpen} 
        onClose={() => setIsEventModalOpen(false)} 
      />
    </div>
  );
};

export default CalendarView;
