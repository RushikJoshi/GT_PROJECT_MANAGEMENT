import react from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../auth/Login'
import NovoDashboard from '../Dashboard1'
import Dashboard from '../Dashboard'

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/Dashboard' element={<Dashboard />} />
            </Routes>
        </Router>
    )
}