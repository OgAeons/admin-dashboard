import React  from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function Dashboard({ darkMode, setDarkMode }) {
  return (
    <div>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Sidebar darkMode={darkMode} />
    </div>
  )
}

export default Dashboard