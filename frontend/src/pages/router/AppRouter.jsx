import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '../../layouts/AppLayout'

// Pages
import Dashboard from '../Dashboard'
import Tasks from '../Tasks'
import Calendar from '../Calendar'
import Documents from '../Documents'
import MyWork from '../MyWork'
import TeamView from '../TeamView'
import ProjectView from '../ProjectView'
// Placeholders for other routes requested by the user
const Placeholder = ({ name }) => (
  <div className="p-8 flex items-center justify-center h-full">
    <div className="text-center">
      <h2 className="text-xl font-bold text-gray-400 capitalize">{name} Page</h2>
      <p className="text-sm text-gray-500 mt-2">This module is currently being optimized.</p>
    </div>
  </div>
);

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-work" element={<MyWork />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="documents" element={<Documents />} /> {/* Changed Placeholder for documents to the actual component */}
          <Route path="projects/:projectId" element={<ProjectView />} />
          <Route path="teams/:teamId" element={<TeamView />} />
          <Route path="files" element={<Placeholder name="Files" />} />
          <Route path="chat" element={<Placeholder name="Chat" />} />
          <Route path="reports" element={<Placeholder name="Reports" />} />
          <Route path="notifications" element={<Placeholder name="Notifications" />} />
          <Route path="settings" element={<Placeholder name="Settings" />} />
        </Route>
        
        {/* Auth routes */}
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </Router>
  )
}