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
        if (location.pathname !== activeLink) {
            setActiveLink(location.pathname)
        }
    }, [location.pathname])

  return (
    <div className={`no-select ${darkMode ? 'dark' : ''} ${sidebarCollapsed ? 'w-10 ' : 'w-64'} transition-all duration-300 bg-white dark:bg-gray-700 text-gray-800 dark:text-white flex flex-col h-[85vh] p-2 overflow-hidden rounded-bl-3xl shadow-md`}>
        {sidebarCollapsed ? (
            <div>
                <button className="mb-8 w-10 h-10" onClick={toggleSidebar}>
                    <img className='w-6' src={darkMode ? './hamburger-white.png' : './hamburger.png'} alt="hamburger-icon" />
                </button>
                <div className='flex flex-col items-center space-y-4'>
                    <Link to='/' className={`mb-1 w-10 h-10 p-2 ${activeLink === '/' ? 'bg-blue-600' : 'hover:bg-blue-700 hover:text-gray-200'}`} onClick={() => {handleLinkClick('/')}}>
                        <img className='w-6' src={darkMode || activeLink === '/' ? './dashboard-white.png' : './dashboard.png'} alt="dashboard-icon" />
                    </Link>
                    <Link to='/' className={`mb-4 w-10 h-10 p-2 ${activeLink === '/documents' ? 'bg-blue-600' : 'hover:bg-blue-700 hover:text-gray-200'}`} onClick={() => handleLinkClick('/')}>
                        <img className='w-6' src={darkMode || activeLink === '/documents' ? './documents-white.png' : './documents.png'} alt="documents-icon" />
                    </Link>
                    <Link to='/users' className={`mb-4 w-10 h-10 p-2 ${activeLink === '/users' ? 'bg-blue-600' : 'hover:bg-blue-700 hover:text-gray-200'}`} onClick={() => handleLinkClick('/users')}>
                        <img className='w-6' src={darkMode || activeLink === '/users' ? './users-white.png' : './users.png'} alt="users-icon" />
                    </Link>
                    <Link to='/roles' className={`mb-4 w-10 h-10 p-2 ${activeLink === '/roles' ? 'bg-blue-600' : 'hover:bg-blue-700 hover:text-gray-200'}`} onClick={() => handleLinkClick('/roles')}>
                        <img className='w-6' src={darkMode || activeLink === '/roles' ? './key-white.png' : './key.png'} alt="roles-icon" />
                    </Link>
                    <Link to='/' className={`mb-4 w-10 h-10 p-2 ${activeLink === '/settings' ? 'bg-blue-600' : 'hover:bg-blue-700 hover:text-gray-200'}`} onClick={() => handleLinkClick('/')}>
                        <img className='w-6' src={darkMode || activeLink === '/settings' ? './settings-white.png' : './settings.png'} alt="hamburger-icon" />
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
                        <img className='w-8' src={darkMode ? './collapse-white.png' : './collapse.png'} alt="collapse-icon" />
                    </button>
                </div>

                <div className='flex flex-col space-y-4 w-full mr-2 transition-all duration-300'>
                    <Link to='/' className={`text-lg hover:bg-blue-700 p-2 rounded-md w-full flex items-center ${activeLink === '/' ? 'bg-blue-600 text-gray-200' : 'hover:text-gray-200'}`} onClick={() => handleLinkClick('/')}>
                        <img className='w-6 mr-2' src={darkMode || activeLink === '/' ? './dashboard-white.png' : './dashboard.png'} alt="dashboard-icon" />
                        <span className='text-base sidebar-text'>Dashboard</span>
                    </Link>
                    <Link to='/' className={`text-lg hover:bg-blue-700 p-2 rounded-md w-full flex items-center ${activeLink === '/documents' ? 'bg-blue-600 text-gray-200' : 'hover:text-gray-200'}`} onClick={() => handleLinkClick('/')}>
                        <img className='w-6 mr-2' src={darkMode || activeLink === '/documents' ? './documents-white.png' : './documents.png'} alt="home-icon" />
                        <span className='text-base sidebar-text'>Documents</span>
                    </Link>
                    <Link to='/users' className={`text-lg hover:bg-blue-700 p-2 rounded-md w-full flex items-center ${activeLink === '/users' ? 'bg-blue-600 text-gray-200' : 'hover:text-gray-200'}`} onClick={() => handleLinkClick('/users')}>
                        <img className='w-6 mr-2' src={darkMode || activeLink === '/users' ? './users-white.png' : './users.png'} alt="home-icon" />
                        <span className='text-base sidebar-text'>Users</span>
                    </Link>
                    <Link to='/roles' className={`text-lg hover:bg-blue-700 p-2 rounded-md w-full flex items-center ${activeLink === '/roles' ? 'bg-blue-600 text-gray-200' : 'hover:text-gray-200'}`} onClick={() => handleLinkClick('/roles')}>
                        <img className='w-6 mr-2' src={darkMode || activeLink === '/roles' ? './key-white.png' : './key.png'} alt="home-icon" />
                        <span className='text-base sidebar-text'>Roles</span>
                    </Link>
                    <Link to='/' className={`text-lg hover:bg-blue-700 p-2 rounded-md w-full flex items-center ${activeLink === '/settings' ? 'bg-blue-600 text-gray-200' : 'hover:text-gray-200'}`} onClick={() => handleLinkClick('/')}>
                        <img className='w-6 mr-2' src={darkMode || activeLink === '/settings' ? './settings-white.png' : './settings.png'} alt="home-icon" />
                        <span className='text-base sidebar-text'>Settings</span>
                    </Link>
                </div>
            </div>
        )}
        
        

        
    </div>
  )
}

export default Sidebar