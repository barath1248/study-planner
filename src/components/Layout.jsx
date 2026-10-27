
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import useLocalStorage from '../hooks/useLocalStorage'
function Layout() {
  const [username, setUsername] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [theme, setTheme] = useLocalStorage('study-theme', 'light')

  function handleSubmit(e) {
    e.preventDefault()

    const trimmedName = nameInput.trim()

    if (trimmedName) {
      setUsername(trimmedName)
      setIsSubmitted(true)
    }
  }

  if (!isSubmitted) {
    return (
      <div className="welcome-screen">
        <h1>Welcome to Study Planner</h1>
        <p>Enter your name to get started.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />

          <button type="submit">Get Started</button>
        </form>
      </div>
    )
  }

  return (

    <div className={`app-layout ${theme}`}>
      <Navbar username={username} />

      <div className="main-container">
        <Sidebar />

        <main className="page-content">
          <Outlet context={{ theme, setTheme }} />
        </main>
      </div>
    </div>
  )

}

export default Layout
