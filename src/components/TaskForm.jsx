
import { useState } from 'react'
import '../styles/TaskForm.css'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      setError('Please enter a task title.')
      return
    }

    onAddTask(trimmedTitle)
    setTitle('')
    setError('')
  }

  function handleChange(e) {
    setTitle(e.target.value)

    if (error) {
      setError('')
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task..."
        value={title}
        onChange={handleChange}
      />

      <button type="submit">Add Task</button>

      {error && <p className="form-error">{error}</p>}
    </form>
  )
}

export default TaskForm
