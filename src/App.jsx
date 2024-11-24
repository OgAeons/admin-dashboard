import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './routes/Dashboard'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
    const [darkMode, setDarkMode] = useState(false)

    function LayoutWithNavbarSidebar({ children }) {
        return (
            <div>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
                <div className='flex'>
                    <Sidebar darkMode={darkMode} />
                    {children}
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode])

    return (
        <Router>
            <div className={`${darkMode ? 'dark' : ''} bg-blue-100 dark:bg-gray-800 p-8`}>
                <Routes>
                    <Route path='/dashboard' element={<LayoutWithNavbarSidebar><Dashboard darkMode={darkMode} setDarkMode={setDarkMode} /></LayoutWithNavbarSidebar>} />
                </Routes>
            </div>
        </Router>
    )
}

export default App