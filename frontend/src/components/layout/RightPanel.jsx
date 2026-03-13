import React from 'react';
import { 
  X, CheckCircle2, Clock, 
  MessageSquare, Paperclip, MoreHorizontal,
  Plus, Calendar, User, Tag,
  History, Settings, Share2
} from 'lucide-react';
import Badge from '../UI/Badge';
import { Avatar } from '../UI/Avatar';

const RightPanel = ({ isOpen, onClose, task }) => {
  if (!isOpen) return null;

  return (
    <aside className="fixed inset-y-0 right-0 w-96 bg-white border-l border-[#E5E7EB] z-[100] shadow-2xl animate-slide-in-right flex flex-col">
      {/* HEADER */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-[#E5E7EB] shrink-0">
        <div className="flex items-center gap-3">
          {task ? (
            <>
              <button className="text-[#6B7280] hover:text-[#111827]">
                <CheckCircle2 size={18} />
              </button>
              <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Task Info</span>
            </>
          ) : (
            <>
              <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Waiting List</span>
              <Badge variant="blue">12 Tasks</Badge>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {task && (
            <>
              <button className="p-1.5 hover:bg-gray-100 rounded-md text-[#6B7280]"><Share2 size={16} /></button>
              <button className="p-1.5 hover:bg-gray-100 rounded-md text-[#6B7280]"><MoreHorizontal size={16} /></button>
            </>
          )}
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-md text-[#6B7280] ml-2"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
        {task ? (
          <div className="space-y-8 animate-fade-in">
            {/* TASK DETAILS (Existing logic) */}
            <div>
              <div className="flex gap-2 mb-3">
                <Badge variant="blue">Development</Badge>
                <Badge variant="orange">High Priority</Badge>
              </div>
              <h2 className="text-xl font-semibold leading-tight mb-2">
                {task.title}
              </h2>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {task.desc || "Need to integrate a 2FA provider and update the frontend login components."}
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[#6B7280] font-medium">
                  <User size={14} /> Assignee
                </div>
                <div className="flex items-center gap-2">
                  <Avatar name="John Doe" size="24px" />
                  <span className="text-xs font-semibold">John Doe</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[#6B7280] font-medium">
                  <Calendar size={14} /> Deadline
                </div>
                <span className="text-xs font-semibold">Oct 24, 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-[#6B7280] font-medium">
                  <Clock size={14} /> Status
                </div>
                <Badge variant="green">In Progress</Badge>
              </div>
            </div>

            <div className="border-b border-[#E5E7EB] flex gap-6">
              <button className="pb-3 border-b-2 border-[#2563EB] text-sm font-semibold text-[#2563EB]">Comments</button>
              <button className="pb-3 text-sm font-medium text-[#6B7280] hover:text-[#111827]">Activity</button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Avatar name="Sarah Wilson" size="28px" />
                <div className="flex-1 bg-[#F3F4F6] p-3 rounded-xl">
                  <p className="text-xs text-[#4B5563]">I've attached the latest API documentation.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <p className="text-xs text-[#6B7280] font-medium mb-4">
              Unscheduled tasks that need to be planned. Drag these to your calendar.
            </p>
            
            <div className="space-y-3">
              {[
                { title: "Review pull requests", project: "Marketing", priority: "Low" },
                { title: "Client feedback loop", project: "Design", priority: "Medium" },
                { title: "Security audit Q4", project: "Security", priority: "High" },
                { title: "Update dependencies", project: "Dev", priority: "Low" },
              ].map((waitingTask, i) => (
                <div 
                  key={i} 
                  className="p-4 bg-white border border-[#E5E7EB] rounded-xl cursor-move hover:border-[#2563EB] hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                     <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest">{waitingTask.project}</span>
                     <Badge variant={waitingTask.priority === 'High' ? 'orange' : 'gray'}>{waitingTask.priority}</Badge>
                  </div>
                  <h4 className="text-sm font-semibold text-[#111827]">{waitingTask.title}</h4>
                  <div className="mt-3 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                     <button className="text-[10px] font-semibold text-[#2563EB] uppercase">Schedule →</button>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full border-2 border-dashed border-gray-200 py-3 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold text-xs">
              <Plus size={16} className="mr-2" /> Quick Add to Waiting List
            </button>
          </div>
        )}
      </div>

      {/* FOOTER */}
      {task && (
        <div className="p-4 border-t border-[#E5E7EB]">
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-3 flex flex-col gap-3">
            <textarea 
              placeholder="Type your comment..."
              className="w-full bg-transparent border-none resize-none text-xs focus:ring-0 p-0 placeholder:text-[#9CA3AF]"
              rows={3}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-[#6B7280]">
                <button className="p-1 hover:bg-gray-100 rounded"><Paperclip size={14}/></button>
              </div>
              <button className="bg-[#2563EB] text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-700 transition-all">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};


export default RightPanel;
