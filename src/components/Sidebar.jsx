import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'
import { AiFillFileText } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { RiShieldKeyholeFill } from 'react-icons/ri'
import { FiSettings } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoIosArrowBack } from 'react-icons/io'

function Sidebar({darkMode}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
    const [activeLink, setActiveLink] = useState('/')
    const location = useLocation()
    const iconColor = darkMode ? '#fff' : '#000'

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
                    <GiHamburgerMenu size={24} color={iconColor} />
                </button>
                <div className='flex flex-col items-center space-y-4'>
                    <Link to='/' className={`mb-1 w-10 h-10 p-2 ${activeLink === '/' ? 'bg-blue-600' : 'hover:bg-blue-700 hover:text-gray-200'}`} onClick={() => {handleLinkClick('/')}}>
                        <MdDashboard size={24} color={activeLink === '/' ? 'white' : iconColor}  />
                    </Link>
                    <Link to='/' className={`mb-4 w-10 h-10 p-2 ${activeLink === '/documents' ? 'bg-blue-600' : 'hover:bg-blue-700 hover:text-gray-200'}`} onClick={() => handleLinkClick('/')}>
                        <AiFillFileText size={24} color={activeLink === '/documents' ? 'white' : iconColor} />
                    </Link>
                    <Link to='/users' className={`mb-4 w-10 h-10 p-2 ${activeLink === '/users' ? 'bg-blue-600' : 'hover:bg-blue-700 hover:text-gray-200'}`} onClick={() => handleLinkClick('/users')}>
                        <FaUsers size={24} color={activeLink === '/users' ? 'white' : iconColor} />
                    </Link>
                    <Link to='/roles' className={`mb-4 w-10 h-10 p-2 ${activeLink === '/roles' ? 'bg-blue-600' : 'hover:bg-blue-700 hover:text-gray-200'}`} onClick={() => handleLinkClick('/roles')}>
                        <RiShieldKeyholeFill size={24} color={activeLink === '/roles' ? 'white' : iconColor} />
                    </Link>
                    <Link to='/' className={`mb-4 w-10 h-10 p-2 ${activeLink === '/settings' ? 'bg-blue-600' : 'hover:bg-blue-700 hover:text-gray-200'}`} onClick={() => handleLinkClick('/')}>
                        <FiSettings size={24} color={activeLink === '/settings' ? 'white' : iconColor} />
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
                        <IoIosArrowBack size={24} color={iconColor} />
                    </button>
                </div>

                <div className='flex flex-col space-y-4 w-full mr-2 transition-all duration-300'>
                    <Link to='/' className={`text-lg hover:bg-blue-700 p-2 rounded-md w-full flex items-center ${activeLink === '/' ? 'bg-blue-600 text-gray-200' : 'hover:text-gray-200'}`} onClick={() => handleLinkClick('/')}>
                        <MdDashboard size={24} color={activeLink === '/' ? 'white' : iconColor} />
                        <span className='text-base sidebar-text ml-4'>Dashboard</span>
                    </Link>
                    <Link to='/' className={`text-lg hover:bg-blue-700 p-2 rounded-md w-full flex items-center ${activeLink === '/documents' ? 'bg-blue-600 text-gray-200' : 'hover:text-gray-200'}`} onClick={() => handleLinkClick('/')}>
                        <AiFillFileText size={24} color={activeLink === '/documents' ? 'white' : iconColor} />
                        <span className='text-base sidebar-text ml-4'>Documents</span>
                    </Link>
                    <Link to='/users' className={`text-lg hover:bg-blue-700 p-2 rounded-md w-full flex items-center ${activeLink === '/users' ? 'bg-blue-600 text-gray-200' : 'hover:text-gray-200'}`} onClick={() => handleLinkClick('/users')}>
                        <FaUsers size={24} color={activeLink === '/users' ? 'white' : iconColor} />
                        <span className='text-base sidebar-text ml-4'>Users</span>
                    </Link>
                    <Link to='/roles' className={`text-lg hover:bg-blue-700 p-2 rounded-md w-full flex items-center ${activeLink === '/roles' ? 'bg-blue-600 text-gray-200' : 'hover:text-gray-200'}`} onClick={() => handleLinkClick('/roles')}>
                        <RiShieldKeyholeFill size={24} color={activeLink === '/roles' ? 'white' : iconColor} />
                        <span className='text-base sidebar-text ml-4'>Roles</span>
                    </Link>
                    <Link to='/' className={`text-lg hover:bg-blue-700 p-2 rounded-md w-full flex items-center ${activeLink === '/settings' ? 'bg-blue-600 text-gray-200' : 'hover:text-gray-200'}`} onClick={() => handleLinkClick('/')}>
                        <FiSettings size={24} color={activeLink === '/settings' ? 'white' : iconColor} />
                        <span className='text-base sidebar-text ml-4'>Settings</span>
                    </Link>
                </div>
            </div>
        )}
        
        

        
    </div>
  )
}

export default Sidebar