
import { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import ProgressBar from '../components/ProgressBar'
import '../styles/Tasks.css'

function Tasks() {
  const [tasks, setTasks] = useLocalStorage('study-tasks', [])
  const [taskTitle, setTaskTitle] = useState('')
  const [filter, setFilter] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [error, setError] = useState('')

  // Add a new task
  function addTask(e) {
    e.preventDefault()

    const title = taskTitle.trim()

    if (!title) {
      setError('Please enter a task title.')
      return
    }

    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    }

    setTasks(prev => [...prev, newTask])
    setTaskTitle('')
    setError('')
  }

  // Toggle task completion
  function toggleTask(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  // Delete a task
  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  // Search and filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesStatus =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed)

    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchText.trim().toLowerCase())

    return matchesStatus && matchesSearch
  })

  const completedTasks = tasks.filter(
    task => task.completed
  ).length

  return (
    <div className="tasks-page">
      <h1>My Tasks</h1>
      <p>Manage your study tasks in one place.</p>

      {/* Add Task Form */}
      <form className="tasks-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={taskTitle}
          onChange={e => {
            setTaskTitle(e.target.value)
            setError('')
          }}
        />

        <button type="submit">Add Task</button>
      </form>

      {error && (
        <p className="tasks-error">{error}</p>
      )}

      {/* Task Summary */}
      <div className="tasks-summary">
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed: {completedTasks}</p>
        <p>Pending: {tasks.length - completedTasks}</p>
      </div>

      {/* Reusable ProgressBar Component */}
      <ProgressBar
        completed={completedTasks}
        total={tasks.length}
      />

      {/* Search and Filter */}
      <div className="tasks-controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />

        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Task List / Empty State */}
      {filteredTasks.length === 0 ? (
        <p className="tasks-empty">
          {tasks.length === 0
            ? 'No tasks added yet. Add your first task!'
            : 'No tasks match your search or filter.'}
        </p>
      ) : (
        <div className="tasks-list">
          {filteredTasks.map(task => (
            <div className="tasks-card" key={task.id}>
              <label
                className={task.completed ? 'completed' : ''}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />

                {task.title}
              </label>

              <button
                type="button"
                className="delete-task"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tasks
