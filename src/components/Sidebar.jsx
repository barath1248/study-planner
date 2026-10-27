import { NavLink } from 'react-router-dom'
import useOnline from '../hooks/useOnline'
import '../styles/Sidebar.css'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: '◫' },
  { to: '/tasks', label: 'Tasks', icon: '☑' },
  { to: '/schedule', label: 'Schedule', icon: '◷' },
  { to: '/subjects', label: 'Skills', icon: '◆' },
  { to: '/settings', label: 'Settings', icon: '⚙' },
]

const Sidebar = () => {
  const isOnline = useOnline()

  return (
    <div className="sidebar-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-mark" aria-hidden="true">
            📚
          </div>
          <div className="sidebar-brand-text">
            <strong>Study Planner</strong>
            <span>Stay on track</span>
          </div>
        </div>

        <h3>Menu</h3>

        <nav className="sidebar-links" aria-label="Main">
          {NAV_ITEMS.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} end={to === '/'}>
              <span className="sidebar-link-icon" aria-hidden="true">
                {icon}
              </span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div
            className={isOnline ? 'status-online' : 'status-offline'}
            role="status"
          >
            <span className="status-dot" aria-hidden="true" />
            {isOnline ? 'Online' : 'Offline'}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
