import React from 'react'
import Breadcrumb from '../components/Breadcrum'
import { FaUsers } from 'react-icons/fa'
import { RiShieldKeyholeFill } from 'react-icons/ri'
import { AiOutlineUnlock } from 'react-icons/ai'

function Dashboard({ darkMode, totalRoles, totalPermissions, totalUsers, userCount }) {
	const iconColor = darkMode ? '#fff' : '#000'

    return (
        <div className="no-select bg-gray-100 dark:bg-gray-900 h-[85vh] w-full rounded-br-3xl shadow-md">
            <Breadcrumb />

            <h1 className="text-gray-800 dark:text-gray-200 text-2xl font-bold m-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 py-4">
                <div className="bg-white dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-lg p-6 flex items-center space-x-4 shadow-lg">
					<RiShieldKeyholeFill size={50} color={iconColor} />
                    <div>
                        <h2 className="text-blue-600 dark:text-blue-700 text-lg font-semibold">Total Roles</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-2xl font-bold">{totalRoles}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-lg p-6 flex items-center space-x-4 shadow-lg">
					<FaUsers size={50} color={iconColor} />
                    <div>
                        <h2 className="text-blue-600 dark:text-blue-700 text-lg font-semibold">Total Users</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-2xl font-bold">{totalUsers}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-lg p-6 flex items-center space-x-4 shadow-lg">
					<AiOutlineUnlock size={50} color={iconColor} />
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
