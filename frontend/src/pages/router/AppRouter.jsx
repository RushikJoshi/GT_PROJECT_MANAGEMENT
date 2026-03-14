import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '../../contexts/AuthContext'
import AppLayout from '../../layouts/AppLayout'
import Login from '../auth/Login'

// Pages
import Dashboard from '../Dashboard'
import Tasks from '../Tasks'
import Calendar from '../Calendar'
import Documents from '../Documents'
import MyWork from '../MyWork'
import TeamView from '../TeamView'
import ProjectView from '../ProjectView'
import EmployeeDashboard from '../Employee/Employee'
import TeamLeader from '../Employee/TeamLeader'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

// Placeholders for other routes requested by the user
const Placeholder = ({ name }) => (
  <div className="p-8 flex items-center justify-center h-full">
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-400 capitalize">{name} Page</h2>
      <p className="text-sm text-gray-500 mt-2">This module is currently being optimized.</p>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path='employee' element={<EmployeeDashboard />} />
        <Route path='employees' element={<TeamLeader />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="my-work" element={<MyWork />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="documents" element={<Documents />} />
        <Route path="projects/:projectId" element={<ProjectView />} />
        <Route path="teams/:teamId" element={<TeamView />} />
        <Route path="files" element={<Placeholder name="Files" />} />
        <Route path="chat" element={<Placeholder name="Chat" />} />
        <Route path="reports" element={<Placeholder name="Reports" />} />
        <Route path="notifications" element={<Placeholder name="Notifications" />} />
        <Route path="settings" element={<Placeholder name="Settings" />} />
      </Route>
    </Routes>
  );
};

export const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};
