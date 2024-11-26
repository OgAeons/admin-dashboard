import React, { useState, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrum'

function Roles() {
    const [activeTab, setActiveTab] = useState('Roles Management')
    const [roles, setRoles] = useState([])
    const [newRole, setNewRole] = useState('')
    const [isEditRolePopupVisible, setIsEditRolePopupVisible] = useState(false)
    const [editedRoles, setEditedRoles] = useState([...roles])
    const [activityLog, setActivityLog] = useState([])

    useEffect(() => {
        const storedRoles = localStorage.getItem('roles')
        
        if (storedRoles) {
            setRoles(JSON.parse(storedRoles))
        } else {
            async function fetchRoles() {
                try {
                const response = await fetch('/api/roles')
                if (!response.ok) throw new Error('Failed to fetch roles')
                const data = await response.json()
                setRoles(data)
                localStorage.setItem('roles', JSON.stringify(data))
                } catch (error) {
                console.error('Error fetching roles:', error)
                setRoles([]);
                }
            }
            fetchRoles()
        }
    }, [])

    async function addRole() {
        if (newRole.trim()) {
            try {
                const permissionsResponse = await fetch('/api/permissions')
                if (!permissionsResponse.ok) {
                    console.error('Failed to fetch permissions:', await permissionsResponse.text())
                    throw new Error('Failed to fetch permissions')
                }
                const permissionsData = await permissionsResponse.json()
                
                const permissions = permissionsData.permissions.reduce((acc, permission) => {
                    acc[permission] = false
                    return acc
                }, {})
        
                const response = await fetch('/api/roles', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: newRole,
                        permissions: permissions,
                    }),
                })
        
                if (!response.ok) {
                    console.error('Failed to add role:', await response.text())
                    throw new Error('Failed to add role')
                }
                
                const addedRole = await response.json()
                const updatedRoles = [...roles, addedRole]
                setRoles(updatedRoles)
        
                localStorage.setItem('roles', JSON.stringify(updatedRoles))
                setNewRole('')
        
                setActivityLog(prevLogs => [
                    ...prevLogs,
                    { message: `Role "${newRole}" added`, timestamp: new Date().toLocaleString() },
                ])
            } catch (error) {
                console.error('Error adding role:', error.message)
            }
        }
    }        

    function toggleEditRolePopup() {
        setEditedRoles(roles)
        setIsEditRolePopupVisible(!isEditRolePopupVisible)
    }

    async function deleteEditedRole(roleToDelete) {
        const updatedRoles = roles.filter(role => role.id !== roleToDelete.id)
    
        const updatedEditedRoles = editedRoles.filter(role => role.id !== roleToDelete.id)
    
        setRoles(updatedRoles)
        setEditedRoles(updatedEditedRoles)
    
        try {
        const response = await fetch(`/api/roles/${roleToDelete.id}`, {
            method: 'DELETE',
        })
        if (!response.ok) throw new Error('Failed to delete role')
        
        localStorage.setItem('roles', JSON.stringify(updatedRoles))

        setActivityLog(prevLogs => [
            ...prevLogs,
            { message: `Role "${roleToDelete.name}" deleted`, timestamp: new Date().toLocaleString() },
        ])

        } catch (error) {
            console.error('Error deleting role:', error)
        }
    }

    async function handlePermissionToggle(roleId, permission) {
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

        try {
            const response = await fetch(`/api/roles/${roleId}/permissions`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ permissions: updatedRole.permissions }),
        })

        if (!response.ok) throw new Error('Failed to update role permissions')

        setRoles(updatedRoles)
        localStorage.setItem('roles', JSON.stringify(updatedRoles))

        setActivityLog(prevLogs => [
            ...prevLogs,
            { message: `Permissions for role "${updatedRole.name}" updated`, timestamp: new Date().toLocaleString() },
        ])

        } catch (error) {
            console.error('Error updating permissions:', error)
        }
    }


    return (
        <div className="no-select bg-gray-100 dark:bg-gray-700 mt-1 ml-1 w-full">
            <Breadcrumb />

            <h1 className="text-gray-800 dark:text-gray-200 text-2xl font-bold mb-6 ml-4">Roles Management</h1>

            <div className="bg-white dark:bg-gray-800 mx-6 px-8 py-8 rounded-3xl">
                <div className="flex justify-between space-x-4 mb-6">
                    <div className="flex space-x-4 mb-6 dark:text-gray-200">
                        <button
                            className={`px-4 py-0 ${activeTab === 'Roles Management' ? 'pb-2 border-b-2 border-blue-500 dark:border-blue-800 font-semibold' : ''}`}
                            onClick={() => setActiveTab('Roles Management')}
                        >
                            Roles Management
                        </button>
                        <button
                            className={`px-4 py-0 ${activeTab === 'Activity Log' ? 'pb-2 border-b-2 border-blue-500 dark:border-blue-800 font-semibold' : ''}`}
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
                            className="dark:bg-gray-700 p-2 rounded-lg mr-2"
                        />
                        <button
                            className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded-lg mr-2"
                            onClick={addRole}
                        >
                            Create Role
                        </button>
                        <button
                            className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded-lg mr-2"
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

                            <div className="mt-4 flex justify-between">
                                <button
                                    className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                    onClick={toggleEditRolePopup}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Roles Management' && (
                    <div className="flex m-4">
                        <div className="min-w-auto w-2/5 border-r">
                            <h3 className="text-gray-800 dark:text-gray-200 text-xl font-semibold mb-6">Permissions</h3>

                            <div className="space-y-4">
                                {roles.length > 0 &&
                                    Object.keys(roles[0].permissions || {}).map((permission) => (
                                        <div key={permission} className="p-2 text-gray-800 dark:text-gray-200">
                                            {permission}
                                        </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-3/5 overflow-x-auto">
                            <div className="flex space-x-12 ml-10">
                                {roles.map((role) => (
                                    <div key={role.id} className="flex flex-col items-center min-w-auto">
                                        <h3 className="text-gray-800 dark:text-gray-200 text-xl font-semibold mb-10">{role.name}</h3>

                                        <div className="space-y-10">
                                            { Object.keys(role.permissions || {}).map((permission) => (
                                                <label key={permission} className="flex items-center border-b">
                                                    <input
                                                        type="checkbox"
                                                        checked={role.permissions[permission]}  // Reflect permissions state
                                                        onChange={() => handlePermissionToggle(role.id, permission)}
                                                        className="mr-2"
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Activity Log' && (
                    <div className="mt-6">
                        <h3 className="text-gray-800 dark:text-gray-200 text-xl font-semibold mb-4">Activity Log</h3>

                        <ul className="space-y-4">
                            {activityLog.map((log, index) => (
                                <li key={index} className="bg-gray-200 dark:bg-gray-600 p-4 rounded-lg">
                                    <span className="text-gray-800 dark:text-gray-200">{log.timestamp}: </span>
                                    <span className="text-gray-600 dark:text-gray-400">{log.message}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Roles