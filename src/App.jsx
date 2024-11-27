import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './routes/Dashboard'
import Users from './routes/Users'
import Roles from './routes/Roles'

function App() {
    const [darkMode, setDarkMode] = useState(false)
    const [usersLength, setUsersLength] = useState(0)
    const [rolesLength, setRolesLength] = useState(0)
    const [permissionsLength, setPermissionsLength] = useState(0)

    function LayoutWithNavbarSidebar({ children }) {
        return (
            <div className='p-8'>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                <div className="flex">
                    <Sidebar darkMode={darkMode} />
                    <div className="flex-grow">{children}</div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])

    return (
        <Router basename='/admin-dashboard'>
            <div className={`${darkMode ? 'dark' : ''} bg-blue-100 dark:bg-gray-800 min-h-screen`}>
                <Routes>
                    <Route path="/" element={ 
                        <LayoutWithNavbarSidebar>
                            <Dashboard totalRoles={rolesLength} totalPermissions={permissionsLength} totalUsers={usersLength} darkMode={darkMode} />
                        </LayoutWithNavbarSidebar>
                    } />
                    <Route path="/users" element={
                            <LayoutWithNavbarSidebar>
                                <Users setUsersLength={setUsersLength} />
                            </LayoutWithNavbarSidebar>
                    } />
                    <Route path="/roles" element={
                            <LayoutWithNavbarSidebar>
                                <Roles setRolesLength={setRolesLength} setPermissionsLength={setPermissionsLength} />
                            </LayoutWithNavbarSidebar>
                    } />
                </Routes>
            </div>
        </Router>
    )
}

export default App
