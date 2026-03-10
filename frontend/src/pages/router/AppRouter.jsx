import react from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {Login} from '../auth/Login'

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
            </Routes>
        </Router>
    )
}