import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Sidebar({darkMode}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true)

    function toggleSidebar() {
        setSidebarCollapsed(!sidebarCollapsed)
    }

  return (
    <div className={`no-select ${darkMode ? 'dark' : ''} ${sidebarCollapsed ? 'w-10 ' : 'w-64'} transition-all duration-300 bg-white dark:bg-gray-700 text-gray-800 dark:text-white h-screen flex flex-col p-2 overflow-hidden`}>
        {sidebarCollapsed ? (
            <div>
                <button className="mb-8 w-10 h-10" onClick={toggleSidebar}>
                    <img className='w-6' src={darkMode ? '/hamburger-white.png' : '/hamburger.png'} alt="hamburger-icon" />
                </button>
                <div className='flex flex-col space-y-4'>
                    <button className="mb-1 w-10 h-10" onClick={toggleSidebar}>
                        <img className='w-6' src={darkMode ? '/home-white.png' : '/home.png'} alt="hamburger-icon" />
                    </button>
                    <button className="mb-4 w-10 h-10" onClick={toggleSidebar}>
                        <img className='w-6' src={darkMode ? '/dashboard-white.png' : '/dashboard.png'} alt="hamburger-icon" />
                    </button>
                    <button className="mb-4 w-10 h-10" onClick={toggleSidebar}>
                        <img className='w-6' src={darkMode ? '/documents-white.png' : '/documents.png'} alt="hamburger-icon" />
                    </button>
                    <button className="mb-4 w-10 h-10" onClick={toggleSidebar}>
                        <img className='w-6' src={darkMode ? '/members-white.png' : '/members.png'} alt="hamburger-icon" />
                    </button>
                    <button className="mb-4 w-10 h-10" onClick={toggleSidebar}>
                        <img className='w-6' src={darkMode ? '/settings-white.png' : '/settings.png'} alt="hamburger-icon" />
                    </button>
                </div>
            </div>
        ) : (
            <div>
                <div className='flex items-center mb-8'>
                    <select name="Projects" className='font-semibold text-2xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 ml-4 transition-all duration-300 outline-none'>
                        <option value="Project-01">Project 01</option>
                        <option value="Project-02">Project 02</option>
                        <option value="Project-03">Project 03</option>
                        <option value="Project-04">Project 04</option>
                    </select>
                    <button className=" ml-auto mt-0 mb-0 w-10 h-10 transition-all duration-300" onClick={toggleSidebar}>
                        <img className='w-8' src={darkMode ? '/collapse-white.png' : '/collapse.png'} alt="collapse-icon" />
                    </button>
                </div>

                <div className='flex flex-col space-y-4 w-full mr-2 transition-all duration-300'>
                    <Link to="/" className="text-lg hover:bg-gray-200 p-2 rounded-md w-full flex items-center">
                        <img className='w-6 mr-2' src={darkMode ? '/home-white.png' : '/home.png'} alt="home-icon" />
                        <span className='text-base sidebar-text'>Project Overview</span>
                    </Link>
                    <Link to="/" className="text-lg hover:bg-gray-200 p-2 rounded-md w-full flex items-center">
                        <img className='w-6 mr-2' src={darkMode ? '/dashboard-white.png' : '/dashboard.png'} alt="home-icon" />
                        <span className='text-base sidebar-text'>Dashboard</span>
                    </Link>
                    <Link to="/" className="text-lg hover:bg-gray-200 p-2 rounded-md w-full flex items-center">
                        <img className='w-6 mr-2' src={darkMode ? '/documents-white.png' : '/documents.png'} alt="home-icon" />
                        <span className='text-base sidebar-text'>Documents</span>
                    </Link>
                    <Link to="/" className="text-lg hover:bg-gray-200 p-2 rounded-md w-full flex items-center">
                        <img className='w-6 mr-2' src={darkMode ? '/members-white.png' : '/members.png'} alt="home-icon" />
                        <span className='text-base sidebar-text'>Members</span>
                    </Link>
                    <Link to="/" className="text-lg hover:bg-gray-200 p-2 rounded-md w-full flex items-center">
                        <img className='w-6 mr-2' src={darkMode ? '/settings-white.png' : '/settings.png'} alt="home-icon" />
                        <span className='text-base sidebar-text'>Settings</span>
                    </Link>
                </div>
            </div>
        )}
        
        

        
    </div>
  )
}

export default Sidebar