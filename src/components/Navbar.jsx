import React from 'react'

function Navbar() {
    return (
        <nav className="bg-white text-gray-700 p-4 rounded-t-3xl shadow-md">
            <div className="container mx-auto flex items-center">

                <div className="font-semibold text-lg w-1/6">Admin Dashboard</div>

                <div className='space-x-6 w-2/6 flex'>
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

                <div className='w-1/6 flex items-center justify-around'>
                    <img src="/bell.png" alt="Notifications Icon" className="w-6 h-6 cursor-pointer" />
                    <div className='flex items-center cursor-pointer'>
                        <img src="/user.png" alt="User Icon" className="w-8 h-8 mr-2" />
                        <span>John Doe</span>
                        <img src="/down-arrow.png" alt="Arrow" className="w-4 h-4 ml-1" />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar