import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

function applyStoredTheme() {
  try {
    const saved = localStorage.getItem('study-theme')
    const theme = saved !== null ? JSON.parse(saved) : 'light'
    document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light'
  } catch {
    document.documentElement.dataset.theme = 'light'
  }
}

applyStoredTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
