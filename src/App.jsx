import React, { useState, useEffect } from 'react'
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
        <div className={`${darkMode ? 'dark' : ''} bg-blue-100 dark:bg-gray-800 p-8`}>
            <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
    )
}

export default App