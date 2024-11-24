import React, { useState, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrum'

function Members({ darkMode }) {
    const [members, setMembers] = useState([])
    const [groups, setGroups] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [groupTabActive, setGroupTabActive] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [roleFilter, setRoleFilter] = useState("")

    useEffect(() => {
        fetch('api/members')
            .then((response) => response.json())
            .then((data) => setMembers(data.members))
            .catch((error) => console.error('Error fetching members:', error))

        fetch('api/groups')
            .then((response) => response.json())
            .then((data) => setGroups(data.groups))
            .catch((error) => console.error('Error fetching groups:', error))
    }, [])

    const roles = [...new Set(members.flatMap((member) => member.role))]

    const filteredMembers = members.filter((member) => {
        const matchedSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchedRoles = roleFilter ? member.role.includes(roleFilter) : true
        return matchedSearch && matchedRoles
    })

    const filteredGroups = groups.filter((group) => {
        const matchedSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchedRoles = roleFilter ? group.role.includes(roleFilter) : true
        return matchedSearch && matchedRoles
    })

    function handleSelectAllChange() {
        if (selectAll) {
            setSelectedItems([])
        } else {
        const all = [...filteredMembers.map((member) => member.id), ...filteredGroups.map((group) => group.id)]
            setSelectedItems(all)
        }
        setSelectAll(!selectAll)
    }

    function handleCheckboxChange(id) {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((memberId) => memberId !== id) : [...prevSelected, id]
        )
    }

  return (
    <div className='no-select bg-gray-100 dark:bg-gray-700 mt-1 ml-1 w-full'>
        <Breadcrumb />

        <h1 className="text-gray-800 dark:text-gray-200 text-2xl font-bold mb-6 ml-8">{groupTabActive ? `Groups (${filteredGroups.length})` : ` Members (${filteredMembers.length})`}</h1>

        <div className='bg-white dark:bg-gray-800 mx-6 px-8 py-4 rounded-3xl'>
            <div className="flex items-center space-x-6 pb-2 mb-4">
                <button
                    onClick={() => setGroupTabActive(false)}
                    className={`text-lg font-medium mt-2 ${!groupTabActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-200'}`}
                >
                    Members
                </button>
                <button
                    onClick={() => setGroupTabActive(true)}
                    className={`text-lg font-medium mt-2 ${groupTabActive ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-200'}`}
                >
                    Groups
                </button>
            </div>

            <div className='flex items-center space-x-4 mb-4'>
                <input
                    type="text"
                    placeholder='Search members and groups'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white w-1/3 p-2 rounded-lg outline-none"
                />
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="bg-blue-600 dark:bg-blue-800 text-white dark:text-white p-2 rounded-lg"
                >
                    <option>All Roles</option>
                    {roles.length > 0 && roles.map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                    ))}
                </select>
            </div>

            <table className='bg-white dark:bg-gray-800 min-w-full'>
                <thead>
                    <tr>
                        <th className="py-4 w-1/8 flex items-center space-x-2">
                            <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} className="form-checkbox h-4 w-4 text-white" />
                            <span className='text-gray-800 dark:text-gray-200 font-medium'>{selectedItems.length} / {groupTabActive ? filteredGroups.length : filteredMembers.length}</span>
                        </th>
                        <th className="text-gray-800 dark:text-gray-200 py-4 w-2/8 text-left">Account</th>
                        <th className="text-gray-800 dark:text-gray-200 py-4 w-1/8 text-left">Projects</th>
                        <th className="text-gray-800 dark:text-gray-200 py-4 w-2/8 text-left">Role(s)</th>
                        <th className="text-gray-800 dark:text-gray-200 py-4 w-1/8 text-left">Expiration</th>
                        <th className="text-gray-800 dark:text-gray-200 py-4 w-1/8 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {[...filteredMembers, ...filteredGroups].length > 0 ? (
                        [...filteredMembers, ...filteredGroups].map((item) => (
                            <tr key={item.id}>
                                <td className="text-gray-800 dark:text-gray-200 py-4 w-1/8">
                                    <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleCheckboxChange(item.id)} />
                                </td>
                                <td className="text-gray-800 dark:text-gray-200 py-4 w-2/8">{item.name}<br /><span className='text-gray-400 dark:text-gray-500'>{item.email}</span></td>
                                <td className="text-gray-800 dark:text-gray-200 py-4 w-1/8">{item.projects}</td>
                                <td className="text-gray-800 dark:text-gray-200 py-4 w-2/8">{Array.isArray(item.role) ? item.role.join(', ') : item.role}</td>
                                <td className="text-gray-800 dark:text-gray-200 py-4 w-1/8">{item.expiration}</td>
                                <td className="text-gray-800 dark:text-gray-200 py-4 w-1/8">
                                    <button className="text-blue-500">Edit</button>
                                    <button className="text-red-500 ml-4">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center py-4 text-gray-500 dark:text-gray-200">No members found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Members
