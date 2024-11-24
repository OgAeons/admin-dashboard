import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Sidebar({darkMode}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
    const [activeLink, setActiveLink] = useState('/')
    const location = useLocation()

    function toggleSidebar() {
        setSidebarCollapsed(!sidebarCollapsed)
    }

    function handleLinkClick(path) {
        setActiveLink(path)
        setSidebarCollapsed(!sidebarCollapsed)
    }

    React.useEffect(() => {
        setActiveLink(location.pathname)
    }, [location])

  return (
    <div className={`no-select ${darkMode ? 'dark' : ''} ${sidebarCollapsed ? 'w-10 ' : 'w-64'} transition-all duration-300 bg-white dark:bg-gray-700 text-gray-800 dark:text-white h-screen flex flex-col mt-1 p-2 overflow-hidden`}>
        {sidebarCollapsed ? (
            <div>
                <button className="mb-8 w-10 h-10" onClick={toggleSidebar}>
                    <img className='w-6' src={darkMode ? '/hamburger-white.png' : '/hamburger.png'} alt="hamburger-icon" />
                </button>
                <div className='flex flex-col items-center space-y-4'>
                    <Link to='/' className={`mb-1 w-10 h-10 p-2 ${activeLink === '/' ? 'bg-gray-300 dark:bg-gray-600' : ''}`} onClick={() => {handleLinkClick('/')}}>
                        <img className='w-6' src={darkMode ? '/dashboard-white.png' : '/dashboard.png'} alt="dashboard-icon" />
                    </Link>
                    <Link to='/documents' className={`mb-4 w-10 h-10 p-2 ${activeLink === '/documents' ? 'bg-gray-300 dark:bg-gray-600' : ''}`} onClick={() => handleLinkClick('/documents')}>
                        <img className='w-6' src={darkMode ? '/documents-white.png' : '/documents.png'} alt="documents-icon" />
                    </Link>
                    <Link to='/users' className={`mb-4 w-10 h-10 p-2 ${activeLink === '/users' ? 'bg-gray-300 dark:bg-gray-600' : ''}`} onClick={() => handleLinkClick('/users')}>
                        <img className='w-6' src={darkMode ? '/users-white.png' : '/users.png'} alt="users-icon" />
                    </Link>
                    <Link to='/roles' className={`mb-4 w-10 h-10 p-2 ${activeLink === '/roles' ? 'bg-gray-300 dark:bg-gray-600' : ''}`} onClick={() => handleLinkClick('/roles')}>
                        <img className='w-6' src={darkMode ? '/roles-white.png' : '/roles.png'} alt="roles-icon" />
                    </Link>
                    <Link to='/settigs' className={`mb-4 w-10 h-10 p-2 ${activeLink === '/settings' ? 'bg-gray-300 dark:bg-gray-600' : ''}`} onClick={() => handleLinkClick('/settings')}>
                        <img className='w-6' src={darkMode ? '/settings-white.png' : '/settings.png'} alt="hamburger-icon" />
                    </Link>
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
                    <Link to='/' className={`text-lg hover:bg-gray-200 p-2 rounded-md w-full flex items-center ${activeLink === '/' ? 'bg-gray-300 dark:bg-gray-600' : ''}`} onClick={() => handleLinkClick('/')}>
                        <img className='w-6 mr-2' src={darkMode ? '/dashboard-white.png' : '/dashboard.png'} alt="dashboard-icon" />
                        <span className='text-base sidebar-text'>Dashboard</span>
                    </Link>
                    <Link to='/' className={`text-lg hover:bg-gray-200 p-2 rounded-md w-full flex items-center ${activeLink === '/documents' ? 'bg-gray-300 dark:bg-gray-600' : ''}`} onClick={() => handleLinkClick('/')}>
                        <img className='w-6 mr-2' src={darkMode ? '/documents-white.png' : '/documents.png'} alt="home-icon" />
                        <span className='text-base sidebar-text'>Documents</span>
                    </Link>
                    <Link to='/users' className={`text-lg hover:bg-gray-200 p-2 rounded-md w-full flex items-center ${activeLink === '/users' ? 'bg-gray-300 dark:bg-gray-600' : ''}`} onClick={() => handleLinkClick('/users')}>
                        <img className='w-6 mr-2' src={darkMode ? '/users-white.png' : '/users.png'} alt="home-icon" />
                        <span className='text-base sidebar-text'>Users</span>
                    </Link>
                    <Link to='/roles' className={`text-lg hover:bg-gray-200 p-2 rounded-md w-full flex items-center ${activeLink === '/roles' ? 'bg-gray-300 dark:bg-gray-600' : ''}`} onClick={() => handleLinkClick('/roles')}>
                        <img className='w-6 mr-2' src={darkMode ? '/roles-white.png' : '/roles.png'} alt="home-icon" />
                        <span className='text-base sidebar-text'>Roles</span>
                    </Link>
                    <Link to='/' className={`text-lg hover:bg-gray-200 p-2 rounded-md w-full flex items-center ${activeLink === '/settings' ? 'bg-gray-300 dark:bg-gray-600' : ''}`} onClick={() => handleLinkClick('/')}>
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