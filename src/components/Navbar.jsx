import React, { useState, useEffect, useRef } from 'react'
import { FaUserCircle, FaChevronDown, FaSearch } from 'react-icons/fa'
import { AiOutlineBell } from 'react-icons/ai'

function Navbar({ darkMode, setDarkMode }) {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)
    const iconColor = darkMode ? '#fff' : '#000'

    const dropdown = {
        Projects: ['Create New Project', 'View All Projects', 'Archived Projects'],
        Groups: ['Create New Group', 'Manage Groups', 'View All Groups'],
        Products: ['Add New Product', 'Manage Products', 'View All Products'],
        More: ['Help Center', 'Feedback', 'About Us']
    }

    function toggleUserDropdown() {
        setIsUserDropdownOpen(!isUserDropdownOpen)
    }
    
    function toggleDarkMode() {
        setDarkMode(!darkMode)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <nav className="bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-200 p-4 rounded-t-3xl shadow-md">
            <div className="no-select mx-10 flex items-center">

                <div className="text-blue-600 font-semibold text-lg w-1/6">Admin Dashboard</div>

                <div className='text-lg w-2/6 flex justify-around'>
                    {Object.keys(dropdown).map((key) => (
                        <div key={key} className="flex items-center cursor-pointer group"> 
                            <span className='mr-2'>{key}</span>
                            <FaChevronDown size={12} color={iconColor} />
                            <div className='bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 w-48 hidden group-hover:block absolute top-20 rounded-lg shadow-lg border border-gray-300 z-5'>
                                <ul className="py-2">
                                    {dropdown[key].map((option) => (
                                        <li key={option} className="text-sm px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='w-1/6'></div>

                <div className="bg-gray-100 dark:bg-gray-800 p-2 w-1/6 flex items-center rounded-3xl border border-transparent hover:border hover:border-gray-400">
                    <FaSearch size={16} color='#979595' className='mr-1'/>
                    <input type="text" placeholder="Search" className="bg-gray-100 dark:bg-gray-800 flex-1 h-4 outline-none" />
                </div>

                <div className='w-1/6 flex items-center justify-between'>
                    <AiOutlineBell size={24} color={iconColor} className='ml-6'/>
                    <div className='flex items-center cursor-pointer ml-auto' onClick={toggleUserDropdown}>
                        <FaUserCircle size={30} color={iconColor} />
                        <span className='ml-2'>John Doe</span>
                        <FaChevronDown size={12} color={iconColor} />
                    </div>

                    {isUserDropdownOpen && (
                        <div ref={dropdownRef} className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 absolute top-24 right-8 w-48 rounded-lg shadow-lg border border-gray-300 z-5">
                            <ul className="py-2">
                                <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">Profile</li>
                                <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" onClick={toggleDarkMode}>
                                    {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">Settings</li>
                                <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">Notifications</li>
                                <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">Messages</li>
                                <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">Activity log</li>
                                <li className="bg-white dark:bg-gray-800 text-red-500 dark:text-red-300 font-semibold px-4 py-2 hover:bg-red-200 dark:hover:bg-red-700 cursor-pointer">Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar