import React, { useState, useEffect } from 'react'

function Alert({ message, type }) {
    const [visible, setVisible] = useState(true)

    const getAlertClass = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500'
            case 'error':
                return 'bg-red-500'
            case 'info':
                return 'bg-blue-500'
            default:
                return 'bg-gray-500'
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    if (!visible) {
        return null
    }

    return (
        <div
            className={`${getAlertClass()} text-white py-3 px-6 rounded-lg fixed top-4 right-4 shadow-lg z-50 flex items-center`}
            style={{ maxWidth: '300px' }}
        >
            <span className="mr-2">✔️</span>
            {message}
        </div>
    )
}

export default Alert
