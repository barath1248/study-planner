import { useOutletContext } from 'react-router-dom'
import '../styles/Settings.css'

function Settings() {
  const { theme, setTheme } = useOutletContext()

  function toggleTheme() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings-card">
        <h3>Appearance</h3>
        <p>Current theme: {theme}</p>

        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </div>
  )
}

export default Settings