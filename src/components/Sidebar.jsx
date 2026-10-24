import { NavLink } from 'react-router-dom'
import useOnline from '../hooks/useOnline'
const Sidebar = () => {
    const isOnline = useOnline();
    return (
        <div>
            <aside className="sidebar">
                <h3>menu</h3>

                <nav className="sidebar-links">
                    <NavLink to="/">Dashboard</NavLink>
                    <NavLink to="/tasks">Tasks</NavLink>
                    <NavLink to="/schedule">Schedule</NavLink>
                    <NavLink to="/subjects">Subjects</NavLink>
                    <NavLink to="/settings">Settings</NavLink>
                </nav>
                <div className={isOnline ? 'status-online' : 'status-offline'}>
                    Status: {isOnline ? 'Online' : 'Offline'}
                </div>
            </aside>
        </div>
    )
}

export default Sidebar
