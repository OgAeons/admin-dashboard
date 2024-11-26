import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Breadcrumb() {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <nav className="text-sm text-gray-600 dark:text-gray-300 mb-4">
      <ul className="flex items-center space-x-2 p-4">
        <li>
          <Link to="/" className="hover:underline">
            Dashboard
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const pathTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1

          return (
            <li key={index} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
              ) : (
                <Link to={pathTo} className="hover:underline">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Breadcrumb
