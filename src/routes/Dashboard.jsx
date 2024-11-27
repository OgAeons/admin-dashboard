import React from 'react'
import Breadcrumb from '../components/Breadcrum'

function Dashboard({ darkMode, totalRoles, totalPermissions, totalUsers }) {
    const cardStyle = "bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex items-center space-x-4"
    const textStyle = "text-gray-600 dark:text-gray-400 text-2xl font-bold"

    const iconStyle = "w-12 h-12"

    return (
        <div className="no-select bg-gray-100 dark:bg-gray-900 h-[85vh] w-full rounded-br-3xl shadow-md">
            <Breadcrumb />
            <h1 className="text-gray-800 dark:text-gray-200 text-2xl font-bold m-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 py-4">
                <div className={cardStyle}>
                    <img
                        src={darkMode ? '/key-white.png' : '/key.png'}
                        alt="Roles"
                        className={iconStyle}
                    />
                    <div>
                        <h2 className="text-blue-600 dark:text-blue-700 text-lg font-semibold">Total Roles</h2>
                        <p className={textStyle}>{totalRoles}</p>
                    </div>
                </div>

                <div className={cardStyle}>
                    <img
                        src={darkMode ? '/users-white.png' : '/users.png'}
                        alt="Users"
                        className={iconStyle}
                    />
                    <div>
                        <h2 className="text-blue-600 dark:text-blue-700 text-lg font-semibold">Total Users</h2>
                        <p className={textStyle}>{totalUsers}</p>
                    </div>
                </div>

                <div className={cardStyle}>
                    <img
                        src={darkMode ? '/permission-white.png' : '/permission.png'}
                        alt="Permissions"
                        className={iconStyle}
                    />
                    <div>
                        <h2 className="text-blue-600 dark:text-blue-700 text-lg font-semibold">Total Permissions</h2>
                        <p className={textStyle}>{totalPermissions}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
