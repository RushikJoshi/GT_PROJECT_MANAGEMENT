import React, { useState } from 'react';
import { 
  Plus, Search, ChevronDown, MoreHorizontal, 
  Bold, Italic, Underline, Link, Type, 
  AlignLeft, AlignCenter, AlignRight, List, 
  ListOrdered, Image, MoreVertical, Bell
} from 'lucide-react';
import { Avatar, AvatarGroup } from '../components/UI/Avatar';

const Documents = () => {
  const [activeDoc, setActiveDoc] = useState('Design Specifications');

  const docs = [
    { title: 'Campaign messaging', subtitle: 'Stay on Track, Stay on Time - Bordio Ke...', date: 'Today', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    { title: 'Target Audience for this campaign', subtitle: 'Small to Medium-sized Enterprises (SMEs)', date: 'Today', initials: 'MK' },
    { title: 'Fonts & Typography', subtitle: 'A primary font for headings and a secondar...', date: 'Today', initials: 'JD' },
    { title: 'Design Specifications', subtitle: 'These specifications are aimed at ensuring...', date: 'Today', initials: 'SW' },
  ];

  return (
    <div className="flex flex-1 h-full bg-[#f8fafc] animate-fade-in overflow-hidden">
      
      {/* SECONDARY SIDEBAR: DOCUMENTS LIST */}
      <aside className="w-[300px] bg-white border-r border-[#E5E7EB] flex flex-col shrink-0 flex-shrink-0">
        <div className="p-6 border-b border-gray-100 shrink-0">
          <button className="w-full bg-[#0095FF] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10">
            <Plus size={16} strokeWidth={3} />
            <span>Add new</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="p-2 space-y-1">
            {docs.map((doc, idx) => {
              const isActive = activeDoc === doc.title;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveDoc(doc.title)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${isActive ? 'bg-[#ebf5ff]' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-[13px] font-bold truncate pr-4 ${isActive ? 'text-[#2563EB]' : 'text-gray-800'}`}>{doc.title}</h4>
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium truncate mb-2">{doc.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-300 font-bold uppercase">{doc.date}</span>
                    {doc.avatar ? (
                      <Avatar src={doc.avatar} size="20px" name={doc.title} />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-black text-gray-400 border border-white">
                        {doc.initials}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT: DOCUMENT EDITOR */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* EDITOR TOOLBAR */}
        <header className="h-16 px-8 border-b border-gray-100 flex items-center justify-between shrink-0 sticky top-0 bg-white z-10 transition-all">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span className="text-xs font-semibold text-gray-600">Normal text</span>
                <ChevronDown size={14} className="text-gray-400" />
             </div>
             <div className="w-px h-6 bg-gray-100 mx-2" />
             <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-gray-50 rounded text-gray-400"><Bold size={16}/></button>
                <button className="p-2 hover:bg-gray-50 rounded text-gray-400"><Italic size={16}/></button>
                <button className="p-2 hover:bg-gray-50 rounded text-gray-400"><Underline size={16}/></button>
                <button className="p-2 hover:bg-gray-50 rounded text-gray-400"><Link size={16}/></button>
                <button className="p-2 hover:bg-gray-50 rounded text-gray-400"><Type size={16}/></button>
             </div>
             <div className="w-px h-6 bg-gray-100 mx-2" />
             <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-gray-50 rounded text-gray-400"><AlignLeft size={16}/></button>
                <button className="p-2 hover:bg-gray-50 rounded text-gray-400"><AlignCenter size={16}/></button>
                <button className="p-2 hover:bg-gray-50 rounded text-gray-400"><AlignRight size={16}/></button>
             </div>
             <div className="w-px h-6 bg-gray-100 mx-2" />
             <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-gray-50 rounded text-gray-400"><List size={16}/></button>
                <button className="p-2 hover:bg-gray-50 rounded text-gray-400"><ListOrdered size={16}/></button>
                <button className="p-2 hover:bg-gray-50 rounded text-gray-400"><Plus size={16}/></button>
             </div>
          </div>

          <div className="flex items-center gap-6">
             <Search size={20} className="text-gray-300 cursor-pointer" />
             <div className="flex items-center gap-3">
                <div className="relative">
                   <Bell size={20} className="text-gray-400 cursor-pointer" />
                   <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">12</span>
                </div>
                <Avatar name="Marry" size="32px" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" />
             </div>
          </div>
        </header>

        {/* DOCUMENT CONTENT */}
        <div className="flex-1 overflow-y-auto p-12 md:p-20 scrollbar-thin">
          <div className="max-w-[800px] mx-auto space-y-10">
            <div className="flex justify-between items-center mb-10">
               <h1 className="text-[34px] font-black tracking-tight text-gray-800">Design Specifications</h1>
               <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Last edited today</span>
            </div>

            <p className="text-[15px] leading-relaxed text-gray-600 font-medium">
              These specifications are aimed at ensuring consistency, enhancing user experience, and aligning the website's aesthetic with our brand identity.
            </p>

            <div className="space-y-6">
               <h2 className="text-[20px] font-bold text-gray-800">Layout and structure</h2>
               <ul className="text-[15px] space-y-4 text-gray-600 font-medium list-disc pl-5">
                  <li className="pl-2">The website should follow a grid-based layout to maintain balance and alignment throughout the pages.</li>
                  <li className="pl-2">Content should be organized logically, with a clear hierarchy to guide user attention and navigation.</li>
               </ul>
            </div>

            <div className="space-y-6 pt-6">
               <h2 className="text-[20px] font-bold text-gray-800">Main colors</h2>
               <p className="text-[15px] text-gray-600 font-medium">
                 The primary, secondary, and accent colors should reflect our brand's color scheme and be used consistently across the website
               </p>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                  {[
                    { color: 'bg-blue-300', user: 'Sofia' },
                    { color: 'bg-emerald-300', user: 'David' },
                    { color: 'bg-orange-300', user: 'Michael' },
                    { color: 'bg-purple-300', user: 'Anastasia' },
                    { color: 'bg-cyan-300', user: 'Marry' },
                    { color: 'bg-pink-300', user: 'Sofia' },
                  ].map((swatch, i) => (
                    <div key={i} className={`h-16 rounded-[14px] ${swatch.color} p-3 flex items-start shadow-sm`}>
                       <Avatar name={swatch.user} size="18px" className="ring-2 ring-white/50" />
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-6 pt-10">
               <p className="text-[13px] font-bold text-gray-400">The active color is blue and is used in many places, including buttons, filters, etc...</p>
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-[#0094FF] rounded-[10px] shadow-lg shadow-blue-500/20" />
                  <div className="space-y-1">
                     <div className="text-xs font-bold text-gray-800 uppercase tracking-widest tracking-tighter">blue-300</div>
                     <div className="text-xs font-bold text-gray-400">0094FF</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
