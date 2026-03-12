import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MainSidebar from '../components/layout/MainSidebar';
import WorkspaceSidebar from '../components/layout/WorkspaceSidebar';
import RightPanel from '../components/layout/RightPanel';

const AppLayout = () => {
  const [isMainSidebarExpanded, setIsMainSidebarExpanded] = useState(false);
  const [isWorkspaceSidebarOpen, setIsWorkspaceSidebarOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const toggleRightPanel = (task = null) => {
    setSelectedTask(task);
    setIsRightPanelOpen(!!task || !isRightPanelOpen);
  };

  return (
    <div className="flex h-screen bg-[#F7F8FA] overflow-hidden text-[#111827]">
      {/* SIDEBAR 1: MAIN MODULES */}
      <MainSidebar 
        isExpanded={isMainSidebarExpanded} 
        setIsExpanded={setIsMainSidebarExpanded} 
      />

      {/* SIDEBAR 2: WORKSPACE NAVIGATION */}
      {isWorkspaceSidebarOpen && (
        <WorkspaceSidebar 
          onClose={() => setIsWorkspaceSidebarOpen(false)} 
        />
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top toolbar could go here or inside pages */}
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <Outlet context={{ toggleRightPanel, isWorkspaceSidebarOpen, setIsWorkspaceSidebarOpen }} />
        </main>
      </div>

      {/* RIGHT PANEL: TASK DETAILS / ACTIVITY */}
      <RightPanel 
        isOpen={isRightPanelOpen} 
        onClose={() => setIsRightPanelOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};

export default AppLayout;
