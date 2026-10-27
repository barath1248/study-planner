
import { useParams, Link } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
import SubjectIcon from '../components/SubjectIcon'
import '../styles/SubjectsDetails.css'

function SubjectsDetails() {
  const { id } = useParams()

  const [subjects] = useLocalStorage('study-subjects', [
    { id: 1, name: 'Core Java', description: 'Java fundamentals' },
    { id: 2, name: 'React', description: 'Frontend development' },
    { id: 3, name: 'SQL', description: 'Database queries' },
  ])

  const subject = subjects.find((item) => item.id === Number(id))

  if (!subject) {
    return (
      <div className="subject-details">
        <h1>Subject not found</h1>
        <Link to="/subjects">Back to Subjects</Link>
      </div>
    )
  }

  return (
    <div className="subject-details">
      <Link className="back-link" to="/subjects">
        ← Back to Subjects
      </Link>

      <div className="subject-details-hero">
        <SubjectIcon name={subject.name} size="lg" />
        <div>
          <p className="page-eyebrow">Skill</p>
          <h1>{subject.name}</h1>
          <p>{subject.description || 'No description provided.'}</p>
        </div>
      </div>
    </div>
  )
}

export default SubjectsDetails
