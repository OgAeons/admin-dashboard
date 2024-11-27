import React, { useState, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrum'
import Alert from '../components/Alert'
import { Link } from 'react-router-dom'
import { FaUserPlus } from 'react-icons/fa'
import { RiShieldKeyholeFill } from 'react-icons/ri'

function Users({ setUsersLength }) {
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([
        { id: 1, name: "Owner" },
        { id: 2, name: "Admin" },
        { id: 3, name: "Moderator" },
        { id: 4, name: "Member" },
        { id: 5, name: "Viewer" },
        { id: 6, name: "Guest" },
    ])
    const statuses = ["Active", "Inactive"]
    const [selectedItems, setSelectedItems] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [roleFilter, setRoleFilter] = useState("")
    const [popupType, setPopupType] = useState("")
    const [popupData, setPopupData] = useState(null)
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        const savedUsers = JSON.parse(localStorage.getItem('users'))
        
        if (savedUsers) {
            setUsers(savedUsers)
            setUsersLength(savedUsers.length)
        } else {
            setUsers([])
            setUsersLength(0)
        }
    }, [])
    

    useEffect(() => {
        if (users.length > 0) {
            localStorage.setItem('users', JSON.stringify(users))
        }
    }, [users])

    const filteredUsers = users.filter((user) => {
        const matchedSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchedRoles = roleFilter ? (user.roles && user.roles.includes(roleFilter)) : true 
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

    function handleDeleteUser(id) {
        const updatedUsers = users.filter((user) => user.id !== id)
        setUsers(updatedUsers)
        localStorage.setItem('users', JSON.stringify(updatedUsers))
        setAlert({ message: 'User successfully deleted', type: 'error' })
    }

    function handlePopupSave(updatedUser) {
        if (popupType === "edit") {
            const updatedUsers = users.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            )
            setUsers(updatedUsers)
            setAlert({ message: 'User successfully updated', type: 'success' })
        } else if (popupType === "add") {
            const newUser = {
                ...updatedUser,
                id: Date.now(), 
            }
            setUsers((prevUsers) => [...prevUsers, newUser])
            setAlert({ message: 'New user successfully created', type: 'success' })
        }
        handlePopupClose()
    }

    function handlePopupClose() {
        setPopupType("")
        setPopupData(null)
    }


    return (
        <div className='no-select bg-gray-100 dark:bg-gray-900 w-full h-full rounded-br-3xl shadow-md z-1'>
            <Breadcrumb />

            <h1 className="text-gray-800 dark:text-gray-200 text-2xl font-bold mb-6 ml-8">Users ({filteredUsers.length})</h1>

            {alert && ( <Alert key={`${alert.message}-${alert.type}`} message={alert.message} type={alert.type} /> )}

            <div className='bg-white dark:bg-gray-800 mx-6 px-8 py-8 h-[68vh] rounded-3xl shadow-md'>
                <div className='flex justify-between items-center mb-8'>
                    <div className='flex space-x-4'>
                        <input
                            type="text"
                            placeholder='Search users'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white w-64 p-2 rounded-lg outline-none shadow-sm"
                        />
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="bg-blue-600 dark:bg-blue-700 text-gray-200 py-2 px-2 rounded-lg shadow-md"
                        >
                            <option value="">All Roles</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.name}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex space-x-4'>
                        <button
                            className="bg-blue-600 dark:bg-blue-700 text-gray-200 px-4 py-2 flex items-center rounded-lg shadow-md"
                            onClick={() => {
                                setPopupType("add")
                                setPopupData({
                                    name: "",
                                    email: "",
                                    roles: [roles[0].name],
                                    status: statuses[0],
                                })
                            }}
                        >
                            <FaUserPlus size={20} color='white' className='mr-2' />
                            Add User
                        </button>
                        <Link to={'/roles'}>
                            <button className="bg-gray-800 dark:bg-blue-700 text-gray-200 px-4 py-2 flex items-center rounded-lg shadow-md">
                                <RiShieldKeyholeFill size={20} color='white' className='mr-2' />
                                Edit Roles
                            </button>
                        </Link>
                    </div>
                </div>

                <table className='bg-white dark:bg-gray-800 min-w-full'>
                    <thead>
                        <tr>
                            <th className="py-4 w-[10%] min-w-[5rem] flex items-center space-x-2 ">
                                <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} className="form-checkbox h-4 w-4 text-white" />
                                <span className='text-gray-800 dark:text-gray-200 font-medium text-sm'>{selectedItems.length} / {filteredUsers.length}</span>
                            </th>
                            <th className="text-lg text-gray-800 dark:text-gray-200 py-4 text-left w-[15%]">Name</th>
                            <th className="text-lg text-gray-800 dark:text-gray-200 py-4 text-left w-[30%]">Email</th>
                            <th className="text-lg text-gray-800 dark:text-gray-200 py-4 text-left w-[15%]">Role</th>
                            <th className="text-lg text-gray-800 dark:text-gray-200 py-4 px-2 text-left w-[15%]">Status</th>
                            <th className="text-lg text-gray-800 dark:text-gray-200 py-4 text-left w-[15%]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="py-4 w-[10%] min-w-[5rem]">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(user.id)}
                                            onChange={() => handleCheckboxChange(user.id)}
                                        />
                                    </td>
                                    <td className="text-gray-800 dark:text-gray-400 py-4 w-[15%]">{user.name}</td>
                                    <td className="text-gray-800 dark:text-gray-400 py-4 w-[30%]">{user.email}</td>
                                    <td className="text-gray-800 dark:text-gray-400 py-4 w-[15%]">
                                    <div className='bg-sky-300 text-blue-600 px-4 w-fit rounded-3xl'>
                                            {user.roles}
                                        </div> 
                                    </td>
                                    <td className="text-green-800 dark:text-gray-400 py-4 w-[15%]">
                                        <div className={`${user.status === 'Active' ? 'bg-green-300 text-green-800' : 'bg-gray-400 text-gray-800'} px-4 w-fit rounded-3xl`}>
                                            {user.status}
                                        </div> 
                                    </td>
                                    <td className="text-gray-800 dark:text-gray-400 py-4 flex items-center w-[15%]">
                                        <button className="text-blue-500 mr-4" onClick={() => {
                                                setPopupType("edit")
                                                setPopupData(user)
                                            }}
                                            title='Edit User'
                                        >
                                            Edit
                                        </button>
                                        <button className="text-red-500" onClick={() => handleDeleteUser(user.id)} title='Delete User'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {popupType && (
                <div className="bg-black fixed inset-0 z-50 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            {popupType === "edit" ? "Edit User" : "Add User"}
                        </h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-800 dark:text-gray-200 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={popupData?.name || ""}
                                    onChange={(e) => setPopupData({ ...popupData, name: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-800 dark:text-gray-200 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={popupData?.email || ""}
                                    onChange={(e) => setPopupData({ ...popupData, email: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-800 dark:text-gray-200 mb-2">Roles</label>
                                <select
                                    value={popupData?.roles || ""}
                                    onChange={(e) => setPopupData({ ...popupData, roles: [e.target.value] })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                >
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.name}>{role.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-800 dark:text-gray-200 mb-2">Status</label>
                                <select
                                    value={popupData?.status || ""}
                                    onChange={(e) => setPopupData({ ...popupData, status: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg"
                                >
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handlePopupClose}
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handlePopupSave(popupData)}
                                    className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Users
