import React from 'react'
import Breadcrumb from '../components/Breadcrum'

function Dashboard({ darkMode, totalRoles, totalPermissions, totalUsers, userCount }) {
    return (
        <div className="no-select bg-gray-100 dark:bg-gray-900 h-[85vh] w-full rounded-br-3xl shadow-md">
            <Breadcrumb />

            <h1 className="text-gray-800 dark:text-gray-200 text-2xl font-bold m-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 py-4">
                <div className="bg-white dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-lg p-6 flex items-center space-x-4 shadow-lg">
                    <img className="w-10 h-10" src={darkMode ? './key-white.png' : './key.png'} alt="Roles" />
                    <div>
                        <h2 className="text-blue-600 dark:text-blue-700 text-lg font-semibold">Total Roles</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-2xl font-bold">{totalRoles}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-lg p-6 flex items-center space-x-4 shadow-lg">
                    <img
                        src={darkMode ? './users-white.png' : './users.png'}
                        alt="Users"
                        className="w-12 h-12"
                    />
                    <div>
                        <h2 className="text-blue-600 dark:text-blue-700 text-lg font-semibold">Total Users</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-2xl font-bold">{totalUsers}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-lg p-6 flex items-center space-x-4 shadow-lg">
                    <img
                        src={darkMode ? './permission-white.png' : './permission.png'}
                        alt="Permissions"
                        className="w-12 h-12"
                    />
                    <div>
                        <h2 className="text-blue-600 dark:text-blue-700 text-lg font-semibold">Total Permissions</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-2xl font-bold">{totalPermissions}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
