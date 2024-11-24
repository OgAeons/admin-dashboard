import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './routes/Dashboard'

function App() {
    const [darkMode, setDarkMode] = useState(false)

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
                    <Route path='/' element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App