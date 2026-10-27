
import { useState } from 'react'
import '../styles/Subject.css'
import { Link } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
import SubjectIcon from '../components/SubjectIcon'

function Subjects() {
  const [subjects, setSubjects] = useLocalStorage('study-subjects', [
    { id: 1, name: 'Core Java', description: 'Java fundamentals' },
    { id: 2, name: 'React', description: 'Frontend development' },
    { id: 3, name: 'SQL', description: 'Database queries' },
  ])
  const [subjectName, setSubjectName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  function addSubject(e) {
    e.preventDefault()

    const trimmedName = subjectName.trim()
    const trimmedDescription = description.trim()

    if (!trimmedName) {
      setError('Please enter a subject name.')
      return
    }

    const newSubject = {
      id: Date.now(),
      name: trimmedName,
      description: trimmedDescription,
    }

    setSubjects((prev) => [...prev, newSubject])

    setSubjectName('')
    setDescription('')
    setError('')
  }

  return (
    <div className="subjects-page">
      <header className="subjects-header">
        <div>
          <p className="page-eyebrow">Skills</p>
          <h1>My Subjects</h1>
          <p className="page-lead">
            Each card shows a logo matched from the skill name — no upload needed.
          </p>
        </div>
      </header>

      <form className="subjects-form" onSubmit={addSubject}>
        <input
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          placeholder="Skill name (e.g. React, Python)"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
        />
        {error && <p className="form-error">{error}</p>}
        <button type="submit">Add skill</button>
      </form>

      <div className="subjects-list">
        {subjects.map((subject) => (
          <article className="subject-card" key={subject.id}>
            <div className="subject-card-top">
              <SubjectIcon name={subject.name} size="lg" />
              <div>
                <h3>{subject.name}</h3>
                <p>{subject.description || 'No description yet'}</p>
              </div>
            </div>

            <Link className="subject-card-link" to={`/subjects/${subject.id}`}>
              View details →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Subjects
