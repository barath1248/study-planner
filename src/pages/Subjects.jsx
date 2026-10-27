
import { useState } from 'react'
import '../styles/Subject.css'
import { Link } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
function Subjects() {
  const [subjects, setSubjects] = useLocalStorage('study-subjects', [
    { id: 1, name: 'Core Java', description: 'Java fundamentals' },
    { id: 2, name: 'React', description: 'Frontend development' },
    { id: 3, name: 'SQL', description: 'Database queries' },
  ])
  const [subjectName, setSubjectName] = useState('')
  const [description, setDescription] = useState('')

  function addSubject(e) {
    e.preventDefault()

    const name = subjectName.trim()
    if (!name) return

    const newSubject = {
      id: Date.now(),
      name,
      description: description.trim(),
    }

    setSubjects((previousSubjects) => [
      ...previousSubjects,
      newSubject,
    ])

    setSubjectName('')
    setDescription('')
  }

  return (
    <div className="subjects-page">
      <h1>My Subjects</h1>
      <p>Organize the topics you are studying.</p>

      <form onSubmit={addSubject}>
        <input
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          placeholder="Subject name"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <button type="submit">Add Subject</button>
      </form>

      <div className="subjects-list">
        {subjects.map((subject) => (
          <div className="subject-card" key={subject.id}>
            <h3>{subject.name}</h3>
            <p>{subject.description || 'No description yet'}</p>

            <Link to={`/subjects/${subject.id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Subjects
