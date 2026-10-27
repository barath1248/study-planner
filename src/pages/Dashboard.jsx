import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import SummaryCard from '../components/SummaryCard'
import TaskForm from '../components/TaskForm'
import ProgressBar from '../components/ProgressBar'
import DailyFocus from '../components/DailyFocus'
import SubjectIcon from '../components/SubjectIcon'
import '../styles/Dashboard.css'
import useLocalStorage from '../hooks/useLocalStorage'

function Dashboard() {
    const { username } = useOutletContext() ?? {}
    const [tasks, setTasks] = useLocalStorage('study-tasks', [
        { id: 1, title: 'Revise Core Java', completed: true },
        { id: 2, title: 'Practise React Hooks', completed: false },
        { id: 3, title: 'Solve Java coding problems', completed: false },
        { id: 4, title: 'Revise SQL queries', completed: true },
    ])
    const [subjects] = useLocalStorage('study-subjects', [
        { id: 1, name: 'Core Java', description: 'Java fundamentals' },
        { id: 2, name: 'React', description: 'Frontend development' },
        { id: 3, name: 'SQL', description: 'Database queries' },
    ])
    const [filter, setFilter] = useState('all')
    const [searchText, setSearchText] = useState('')

    const filteredTasks = tasks.filter((task) => {
        const matchesStatus =
            filter === 'all' ||
            (filter === 'completed' && task.completed) ||
            (filter === 'pending' && !task.completed)

        const matchesSearch = task.title
            .toLowerCase()
            .includes(searchText.toLowerCase().trim())

        return matchesStatus && matchesSearch
    })

    function addTask(title) {
        const newTask = {
            id: Date.now(),
            title: title,
            completed: false,
        }

        setTasks((previousTasks) => [...previousTasks, newTask])
    }

    function deleteTask(id) {
        setTasks((previousTasks) =>
            previousTasks.filter((task) => task.id !== id)
        )
    }

    function toggleTask(id) {
        setTasks((previousTask) =>
            previousTask.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }

    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task) => task.completed).length
    const pendingTasks = totalTasks - completedTasks
    const progress =
        totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

    const displayName = username?.trim() || 'there'

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div>
                    <p className="dashboard-eyebrow">Overview</p>
                    <h1>Hello, {displayName}</h1>
                    <p className="dashboard-lead">
                        Track tasks, skills, and progress in one place.
                    </p>
                </div>
                <Link to="/subjects" className="dashboard-cta">
                    Manage skills
                </Link>
            </header>

            <DailyFocus />

            <div className="dashboard-progress-panel">
                <ProgressBar completed={completedTasks} total={totalTasks} />
            </div>

            <div className="summary-grid">
                <SummaryCard
                    title="Total Tasks"
                    value={totalTasks}
                    description="All study tasks"
                    variant="indigo"
                />
                <SummaryCard
                    title="Completed"
                    value={completedTasks}
                    description="Tasks finished"
                    variant="green"
                />
                <SummaryCard
                    title="Pending"
                    value={pendingTasks}
                    description="Tasks remaining"
                    variant="amber"
                />
                <SummaryCard
                    title="Progress"
                    value={`${progress}%`}
                    description="Overall completion"
                    variant="violet"
                />
            </div>

            <div className="dashboard-layout">
                <div className="dashboard-main">
                    <TaskForm onAddTask={addTask} />

                    <div className="task-toolbar">
                        <div className="task-search">
                            <input
                                type="text"
                                placeholder="Search study tasks..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <div className="task-filters">
                            {[
                                { key: 'all', label: 'All' },
                                { key: 'pending', label: 'Pending' },
                                { key: 'completed', label: 'Completed' },
                            ].map(({ key, label }) => (
                                <button
                                    key={key}
                                    type="button"
                                    className={
                                        filter === key ? 'is-active' : undefined
                                    }
                                    onClick={() => setFilter(key)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <section className="task-section">
                        <div className="task-section-head">
                            <h2>My Study Tasks</h2>
                            <span className="task-count">
                                {filteredTasks.length} shown
                            </span>
                        </div>

                        {filteredTasks.length === 0 ? (
                            <p className="task-empty">
                                No tasks match your search or filter.
                            </p>
                        ) : (
                            filteredTasks.map((task) => (
                                <div className="task-item" key={task.id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => toggleTask(task.id)}
                                        />
                                        <span
                                            className={
                                                task.completed ? 'task-done' : ''
                                            }
                                        >
                                            {task.title}
                                        </span>
                                    </label>

                                    <div className="task-actions">
                                        <span
                                            className={
                                                task.completed
                                                    ? 'completed'
                                                    : 'pending'
                                            }
                                        >
                                            {task.completed
                                                ? 'Completed'
                                                : 'Pending'}
                                        </span>

                                        <button
                                            type="button"
                                            className="delete-button"
                                            onClick={() => deleteTask(task.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </section>
                </div>

                <aside className="dashboard-skills">
                    <div className="dashboard-skills-head">
                        <h2>Your skills</h2>
                        <Link to="/subjects">View all</Link>
                    </div>
                    <p className="dashboard-skills-lead">
                        Icons are picked from each skill name automatically.
                    </p>
                    <ul className="skill-list">
                        {subjects.map((subject) => (
                            <li key={subject.id}>
                                <Link
                                    to={`/subjects/${subject.id}`}
                                    className="skill-list-item"
                                >
                                    <SubjectIcon name={subject.name} size="sm" />
                                    <div className="skill-list-text">
                                        <strong>{subject.name}</strong>
                                        <span>
                                            {subject.description ||
                                                'No description'}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {subjects.length === 0 && (
                        <p className="task-empty">
                            Add subjects on the Skills page to see them here.
                        </p>
                    )}
                </aside>
            </div>
        </div>
    )
}

export default Dashboard
