import { useState } from 'react'
import SummaryCard from '../components/SummaryCard'

function Dashboard() {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Revise Core Java', completed: true },
        { id: 2, title: 'Practise React Hooks', completed: false },
        { id: 3, title: 'Solve Java coding problems', completed: false },
        { id: 4, title: 'Revise SQL queries', completed: true },
    ])

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

            <section className="task-section">
                <h2>My Study Tasks</h2>

                {tasks.map((task) => (
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

                        <span className={task.completed ? 'completed' : 'pending'}>
                            {task.completed ? 'Completed' : 'Pending'}
                        </span>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default Dashboard
