import React, { useState, useEffect } from 'react'
import Alert from '../components/Alert'
import Breadcrumb from '../components/Breadcrum'

function Roles({ setRolesLength, setPermissionsLength }) {
    const [activeTab, setActiveTab] = useState('Roles Management')
    const [roles, setRoles] = useState([])
    const [newRole, setNewRole] = useState('')
    const [isEditRolePopupVisible, setIsEditRolePopupVisible] = useState(false)
    const [editedRoles, setEditedRoles] = useState([])
    const [activityLog, setActivityLog] = useState([])
    const [alertMessage, setAlertMessage] = useState('')
    const [alertType, setAlertType] = useState('')

    useEffect(() => {
        const storedRoles = localStorage.getItem('roles')
        const defaultRoles = storedRoles ? JSON.parse(storedRoles) : [
            {
                id: 1,
                name: 'Admin',
                permissions: {
                    'Create User': true,
                    'Edit User': true,
                    'Delete User': true,
                    'View Dashboard': true,
                },
            },
        ]
        setRoles(defaultRoles)
        localStorage.setItem('roles', JSON.stringify(defaultRoles))

        setRolesLength(defaultRoles.length)
        setPermissionsLength(Object.keys(defaultRoles[0]?.permissions || {}).length)
    }, [])

    useEffect(() => {
        const storedRoles = localStorage.getItem('roles')
        if (storedRoles) {
            setRoles(JSON.parse(storedRoles))
        } else {
            const defaultRoles = [
                {
                    id: 1,
                    name: 'Admin',
                    permissions: {
                        'Create User': true,
                        'Edit User': true,
                        'Delete User': true,
                        'View Dashboard': true,
                    },
                },
                {
                    id: 2,
                    name: 'Manager',
                    permissions: {
                        'Create User': true,
                        'Edit User': true,
                        'View Dashboard': true,
                    },
                },
            ]
            setRoles(defaultRoles)
            localStorage.setItem('roles', JSON.stringify(defaultRoles))
        }
    }, [])

    function addRole() {
        if (newRole.trim()) {
            const newId = roles.length + 1
            const newRoleObj = {
                id: newId,
                name: newRole,
                permissions: {
                    'Create User': false,
                    'Edit User': false,
                    'Delete User': false,
                    'View Dashboard': false,
                },
            }
            const updatedRoles = [...roles, newRoleObj]
            setRoles(updatedRoles)
            localStorage.setItem('roles', JSON.stringify(updatedRoles))
            setNewRole('')
            setActivityLog((prevLogs) => [
                ...prevLogs,
                { message: `Role "${newRole}" added`, timestamp: new Date().toLocaleString() },
            ])
            setAlertMessage(`Role "${newRole}" added successfully`)
            setAlertType('success')
            setTimeout(() => {
                setAlertMessage('')
                setAlertType('')
            }, 3000)
        }
    }

    function toggleEditRolePopup() {
        setEditedRoles(roles)
        setIsEditRolePopupVisible(!isEditRolePopupVisible)
    }

    function deleteEditedRole(roleToDelete) {
        const updatedRoles = roles.filter((role) => role.id !== roleToDelete.id)
        const updatedEditedRoles = editedRoles.filter((role) => role.id !== roleToDelete.id)
        setRoles(updatedRoles)
        setEditedRoles(updatedEditedRoles)
        localStorage.setItem('roles', JSON.stringify(updatedRoles))
        setActivityLog((prevLogs) => [
            ...prevLogs,
            { message: `Role "${roleToDelete.name}" deleted`, timestamp: new Date().toLocaleString() },
        ])
        setAlertMessage(`Role "${roleToDelete.name}" deleted successfully`)
        setAlertType('error')
        setTimeout(() => {
            setAlertMessage('')
            setAlertType('')
        }, 3000)
    }

    function handlePermissionToggle(roleId, permission) {
        const updatedRoles = roles.map((role) =>
            role.id === roleId
                ? {
                      ...role,
                      permissions: {
                          ...role.permissions,
                          [permission]: !role.permissions[permission],
                      },
                  }
                : role
        )
        const updatedRole = updatedRoles.find((role) => role.id === roleId)
        setRoles(updatedRoles)
        localStorage.setItem('roles', JSON.stringify(updatedRoles))
        setActivityLog((prevLogs) => [
            ...prevLogs,
            { message: `Permissions for role "${updatedRole.name}" updated`, timestamp: new Date().toLocaleString() },
        ])
        setAlertMessage(`Permissions for role "${updatedRole.name}" updated successfully`)
        setAlertType('success')
        setTimeout(() => {
            setAlertMessage('')
            setAlertType('')
        }, 3000)
    }

    return (
        <div className="no-select bg-gray-100 dark:bg-gray-900 h-[85vh] w-full rounded-br-3xl shadow-md">
            <Breadcrumb />

            {alertMessage && <Alert message={alertMessage} type={alertType} />}

            <div className="bg-white dark:bg-gray-800 mx-6 px-8 py-8 rounded-3xl shadow-md">
                <div className="flex justify-between space-x-4 mb-6">
                    <div className="flex space-x-4 mb-6 dark:text-gray-200">
                        <button
                            className={`px-4 py-0 ${activeTab === 'Roles Management' ? 'pb-2 border-b-2 border-blue-600 dark:border-blue-700 font-semibold' : 'pb-2'}`}
                            onClick={() => setActiveTab('Roles Management')}
                        >
                            Roles Management
                        </button>
                        <button
                            className={`px-4 py-0 ${activeTab === 'Activity Log' ? 'pb-2 border-b-2 border-blue-600 dark:border-blue-700 font-semibold' : 'pb-2'}`}
                            onClick={() => setActiveTab('Activity Log')}
                        >
                            Activity Log
                        </button>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="New role name"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 border hover:border-black p-2 rounded-lg mr-2 outline-none"
                        />
                        <button
                            className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg mr-2"
                            onClick={addRole}
                        >
                            Create Role
                        </button>
                        <button
                            className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg mr-2"
                            onClick={toggleEditRolePopup}
                        >
                            Edit Roles
                        </button>
                    </div>
                </div>

                {isEditRolePopupVisible && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Edit Roles</h2>
                            <div className="space-y-4">
                                {editedRoles.map((role) => (
                                    <div key={role.name} className="flex justify-between items-center">
                                        <span className="text-gray-800 dark:text-gray-200">{role.name}</span>
                                        <button
                                            className="bg-red-500 dark:bg-red-700 text-white px-3 py-1 rounded-lg"
                                            onClick={() => deleteEditedRole(role)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                    onClick={toggleEditRolePopup}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Roles Management' && (
                    <div className="flex mx-24">
                        <div className="min-w-auto w-1/4 border-r dark:border-gray-900">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="text-gray-800 dark:text-gray-200 text-xl font-semibold mb-6 text-left">Permissions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.length > 0 &&
                                        Object.keys(roles[0].permissions).map((permission) => (
                                            <tr key={permission}>
                                                <td className="text-gray-800 dark:text-gray-400 text-lg p-4">{permission}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Roles and Permissions Table */}
                        <div className="w-full min-w-auto overflow-x-auto">
                            <table className="min-w-full ml-16">
                                <thead>
                                    <tr>
                                        {roles.map((role) => (
                                            <th
                                                key={role.id}
                                                className="text-gray-800 dark:text-gray-200 text-xl font-semibold mb-6 text-center"
                                            >
                                                {role.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.length > 0 &&
                                        Object.keys(roles[0].permissions).map((permission) => (
                                            <tr key={permission}>
                                                {roles.map((role) => (
                                                    <td key={`${role.id}-${permission}`} className="text-lg p-4 text-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={role.permissions[permission]}
                                                            onChange={() => handlePermissionToggle(role.id, permission)}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'Activity Log' && (
                    <div className="mt-6">
                        {activityLog.length === 0 ? (
                            <div className="text-gray-800 dark:text-gray-200">No activity log available.</div>
                        ) : (
                            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
                                {activityLog.map((log, index) => (
                                    <li key={index} className="mb-2">
                                        {log.message} - <span className="text-gray-600 dark:text-gray-400">{log.timestamp}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Roles
