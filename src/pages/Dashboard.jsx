import { useState } from 'react'
import SummaryCard from '../components/SummaryCard'
import TaskForm from '../components/TaskForm'
import '../styles/Dashboard.css'
import useLocalStorage from '../hooks/useLocalStorage'
function Dashboard() {
    const [tasks, setTasks] = useLocalStorage('study-tasks', [
        { id: 1, title: 'Revise Core Java', completed: true },
        { id: 2, title: 'Practise React Hooks', completed: false },
        { id: 3, title: 'Solve Java coding problems', completed: false },
        { id: 4, title: 'Revise SQL queries', completed: true },
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
        setTasks((previousTask) => previousTask.map((task) => task.id === id ? { ...task, completed: !task.completed }
            : task))
    }
    const totalTasks = tasks.length

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length

    const pendingTasks = totalTasks - completedTasks

    const progress = totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100)

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Track your study progress in one place.</p>

            <div className="summary-grid">
                <SummaryCard
                    title="Total Tasks"
                    value={totalTasks}
                    description="All study tasks"
                />

                <SummaryCard
                    title="Completed"
                    value={completedTasks}
                    description="Tasks finished"
                />

                <SummaryCard
                    title="Pending"
                    value={pendingTasks}
                    description="Tasks remaining"
                />

                <SummaryCard
                    title="Progress"
                    value={`${progress}%`}
                    description="Overall completion"
                />
            </div>
            <TaskForm onAddTask={addTask} />
            <div className="task-search">
                <input
                    type="text"
                    placeholder="Search study tasks..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <div className="task-filters">
                <button onClick={() => setFilter('all')}>
                    All
                </button>

                <button onClick={() => setFilter('pending')}>
                    Pending
                </button>

                <button onClick={() => setFilter('completed')}>
                    Completed
                </button>
            </div>

            <section className="task-section">
                <h2>My Study Tasks</h2>

                {filteredTasks.map((task) => (
                    <div className="task-item" key={task.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTask(task.id)}
                            />

                            <span className={task.completed ? 'task-done' : ''}>
                                {task.title}
                            </span>
                        </label>

                        <div className="task-actions">
                            <span className={task.completed ? 'completed' : 'pending'}>
                                {task.completed ? 'Completed' : 'Pending'}
                            </span>

                            <button
                                className="delete-button"
                                onClick={() => deleteTask(task.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default Dashboard
