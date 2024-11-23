import React, { useState, useEffect, useRef } from 'react'

function Navbar() {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

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
                    <div className="flex items-center cursor-pointer">
                        <span>Projects</span>
                        <img src="/down-arrow.png" alt="Arrow" className="w-4 h-4 ml-1" />
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <span>Groups</span>
                        <img src="/down-arrow.png" alt="Arrow" className="w-4 h-4 ml-1" />
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <span>Products</span>
                        <img src="/down-arrow.png" alt="Arrow" className="w-4 h-4 ml-1" />
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <span>More</span>
                        <img src="/down-arrow.png" alt="Arrow" className="w-4 h-4 ml-1" />
                    </div>
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
                        <div ref={dropdownRef} className="bg-white text-gray-700 absolute top-24 right-8 w-48 rounded-lg shadow-lg border border-gray-300 z-1">
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