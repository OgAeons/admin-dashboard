import React, { useState, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrum'

function Members({darkMode}) {
    const [members, setMembers] = useState([])

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
            <table className='bg-white dark:bg-gray-800 min-w-full '>
                <thead>
                    <tr>
                        <th className="w-1/6 px-4 text-left">Name</th>
                        <th className="w-1/6 px-4 text-left">Projects</th>
                        <th className="w-1/6 px-4 text-left">Access Expires</th>
                        <th className="w-1/6 px-4 text-left">Role(s)</th>
                        <th className="w-1/6 px-4 text-left">Expiration</th>
                        <th className="w-1/6 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td className="w-1/6 px-4">{member.name}</td>
                            <td className="w-1/6 px-4">{member.projects}</td>
                            <td className="w-1/6 px-4">{member.accessExpires}</td>
                            <td className="w-1/6 px-4">{member.role}</td>
                            <td className="w-1/6 px-4">{member.expiration}</td>
                            <td className="w-1/6 px-4">
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