import React  from 'react'
import Navbar from '../components/Navbar'

function Dashboard({ darkMode, setDarkMode }) {
  return (
    <div>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  )
}

export default Dashboard