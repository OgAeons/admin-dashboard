import React, { useState, useEffect, useRef } from 'react'

function Navbar() {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const dropdown = {
        Projects: ['Create New Project', 'View All Projects', 'Archived Projects'],
        Groups: ['Create New Group', 'Manage Groups', 'View All Groups'],
        Products: ['Add New Product', 'Manage Products', 'View All Products'],
        More: ['Help Center', 'Feedback', 'About Us']
    }

    function toggleUserDropdown() {
        setIsUserDropdownOpen(!isUserDropdownOpen)
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
        <nav className="bg-white text-gray-700 p-4 rounded-t-3xl shadow-md">
            <div className="mx-10 flex items-center">

                <div className="font-semibold text-lg w-1/6">Admin Dashboard</div>

                <div className='text-lg w-2/6 flex justify-around'>
                    {Object.keys(dropdown).map((key) => (
                        <div key={key} className="flex items-center cursor-pointer group"> 
                            <span>{key}</span>
                            <img src="/down-arrow.png" alt="Arrow" className="w-4 h-4 ml-1" />
                            <div className='bg-white text-gray-700 w-48 hidden group-hover:block absolute top-20 rounded-lg shadow-lg border border-gray-300 z-5'>
                                <ul className="py-2">
                                    {dropdown[key].map((option) => (
                                        <li key={option} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='w-1/6'></div>

                <div className="bg-gray-100 p-2 w-1/6 flex items-center rounded-3xl border border-transparent hover:border hover:border-gray-400">
                    <img src="/search.png" alt="Search Icon" className="w-4 h-4 mr-2" />
                    <input type="text" placeholder="Search" className="bg-gray-100 flex-1 h-4 outline-none" />
                </div>

                <div className='w-1/6 flex items-center justify-between'>
                    <img src="/bell.png" alt="Notifications Icon" className="w-6 h-6 cursor-pointer ml-auto" />
                    <div className='flex items-center cursor-pointer ml-auto' onClick={toggleUserDropdown}>
                        <img src="/user.png" alt="User Icon" className="w-8 h-8 mr-2" />
                        <span>John Doe</span>
                        <img src="/down-arrow.png" alt="Arrow" className="w-4 h-4 ml-1" />
                    </div>

                    {isUserDropdownOpen && (
                        <div ref={dropdownRef} className="bg-white text-gray-700 absolute top-24 right-8 w-48 rounded-lg shadow-lg border border-gray-300 z-5">
                            <ul className="py-2">
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Switch to Dark Mode</li>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Settings</li>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Notifications</li>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Messages</li>
                                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Activity log</li>
                                <li className="text-red-500 px-4 py-2 hover:bg-red-200 cursor-pointer">Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar