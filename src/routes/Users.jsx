import React, { useState, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrum'

function Users({ darkMode }) {
    const [users, setUsers] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [roleFilter, setRoleFilter] = useState("")

    useEffect(() => {
        fetch('/api/users')
            .then((response) => response.json())
            .then((data) => {
                console.log('API Response:', data)
                setUsers(data)
            })
            .catch((error) => console.error('Error fetching members:', error))
    }, [])

    const roles = [...new Set(users.flatMap((user) => user.roles || []))]

    const filteredUsers = users.filter((user) => {
        const matchedSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchedRoles = roleFilter ? (user.roles || []).includes(roleFilter) : true
        return matchedSearch && matchedRoles
    })

    function handleSelectAllChange() {
        if (selectAll) {
            setSelectedItems([])
        } else {
            setSelectedItems(filteredUsers.map((user) => user.id))
        }
        setSelectAll(!selectAll)
    }

    function handleCheckboxChange(id) {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((userId) => userId !== id) : [...prevSelected, id]
        )
    }

  return (
    <div className='no-select bg-gray-100 dark:bg-gray-700 mt-1 ml-1 w-full'>
        <Breadcrumb />

        <h1 className="text-gray-800 dark:text-gray-200 text-2xl font-bold mb-6 ml-8">Users ({filteredUsers.length})</h1>

        <div className='bg-white dark:bg-gray-800 mx-6 px-8 py-8 rounded-3xl'>
            <div className='flex items-center space-x-4 mb-4'>
                <input
                    type="text"
                    placeholder='Search users'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white w-1/3 p-2 rounded-lg outline-none"
                />
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="bg-blue-600 dark:bg-blue-800 text-white dark:text-white p-2 rounded-lg"
                >
                    <option value="">All Roles</option>
                    {roles.map((role, index) => (
                        <option key={index} value={role}>{role}</option>
                    ))}
                </select>
            </div>

            <table className='bg-white dark:bg-gray-800 min-w-full'>
                <thead>
                    <tr>
                        <th className="py-4 w-1/8 flex items-center space-x-2">
                            <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} className="form-checkbox h-4 w-4 text-white" />
                            <span className='text-gray-800 dark:text-gray-200 font-medium'>{selectedItems.length} / {filteredUsers.length}</span>
                        </th>
                        <th className="text-gray-800 dark:text-gray-200 py-4 w-2/8 text-left">Account</th>
                        <th className="text-gray-800 dark:text-gray-200 py-4 w-1/8 text-left">Projects</th>
                        <th className="text-gray-800 dark:text-gray-200 py-4 w-2/8 text-left">Role(s)</th>
                        <th className="text-gray-800 dark:text-gray-200 py-4 w-1/8 text-left">Expiration</th>
                        <th className="text-gray-800 dark:text-gray-200 py-4 w-1/8 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td className="text-gray-800 dark:text-gray-200 py-4 w-1/8">
                                    <input type="checkbox" checked={selectedItems.includes(user.id)} onChange={() => handleCheckboxChange(user.id)} />
                                </td>
                                <td className="text-gray-800 dark:text-gray-200 py-4 w-2/8">{user.name}<br /><span className='text-gray-400 dark:text-gray-500'>{user.email}</span></td>
                                <td className="text-gray-800 dark:text-gray-200 py-4 w-1/8">{user.projects || 'NA'}</td>
                                <td className="text-gray-800 dark:text-gray-200 py-4 w-2/8">{(user.roles || []).join(', ') || 'NA'}</td>
                                <td className="text-gray-800 dark:text-gray-200 py-4 w-1/8">{user.expiration || 'NA'}</td>
                                <td className="text-gray-800 dark:text-gray-200 py-4 w-1/8">
                                    <button className="text-blue-500">Edit</button>
                                    <button className="text-red-500 ml-4">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center py-4 text-gray-500 dark:text-gray-200">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Users
