import React, { useState, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrum'

function Members({darkMode}) {
    const [members, setMembers] = useState([])
    const [selectedMembers, setSelectedMembers] = useState([])
    const [selectAll, setSelectAll] = useState(false)

    function handleSelectAllChange() {
        if(selectAll){
            setSelectedMembers([])
        } else {
            const all = members.map((member) => member.id)
            setSelectedMembers(all)
        }
        setSelectAll(!selectAll)
    }

    function handleCheckboxChange(id) {
        setSelectedMembers((prevSelected) =>
            prevSelected.includes(id) ? prevSelected.filter((memberId) => memberId !== id) : [...prevSelected, id] 
        )
    }

    useEffect(() => {
        fetch('api/members')
            .then((response) => response.json())
            .then((data) => setMembers(data.members))
            .catch((error) => console.error('Error fetching members:', error))
    }, [])

  return (
    <div className='no-select bg-gray-100 dark:bg-gray-700 mt-1 ml-1 w-full'>
        <Breadcrumb />
        
        <div className='px-6 py-2'>
            <h1 className="text-2xl font-bold mb-6">Members ({members.length})</h1>
            <table className='bg-white dark:bg-gray-800 min-w-full'>
                <thead>
                    <tr>
                        <th className="py-4 pl-4 flex items-center space-x-2 border border-gray-300">
                            <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} className="form-checkbox h-4 w-4 text-white" />
                            <span className='text-gray-800 font-medium'>{selectedMembers.length} / {members.length}</span>
                        </th>
                        <th className="py-4 px-4 text-left border border-gray-300">Name</th>
                        <th className="py-4 px-4 text-left border border-gray-300">Projects</th>
                        <th className="py-4 px-4 text-left border border-gray-300">Access Expires</th>
                        <th className="py-4 px-4 text-left border border-gray-300">Role(s)</th>
                        <th className="py-4 px-4 text-left border border-gray-300">Expiration</th>
                        <th className="py-4 px-4 text-left border border-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td className="py-4 px-4 border border-gray-300">
                                <input type="checkbox" checked={selectedMembers.includes(member.id)} onChange={() => handleCheckboxChange(member.id)} />
                            </td>
                            <td className="py-4 px-4 border border-gray-300">{member.name}</td>
                            <td className="py-4 px-4 border border-gray-300">{member.projects}</td>
                            <td className="py-4 px-4 border border-gray-300">{member.accessExpires}</td>
                            <td className="py-4 px-4 border border-gray-300">{member.role}</td>
                            <td className="py-4 px-4 border border-gray-300">{member.expiration}</td>
                            <td className="py-4 px-4 border border-gray-300">
                                <button className="text-blue-500">Edit</button>
                                <button className="text-red-500 ml-4">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Members