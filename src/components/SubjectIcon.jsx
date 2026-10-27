import { getSubjectIcon } from '../utils/subjectIcons'
import '../styles/SubjectIcon.css'

function SubjectIcon({ name, size = 'md' }) {
  const { type, iconUrl, color, initials } = getSubjectIcon(name)

  return (
    <div
      className={`subject-icon subject-icon--${size}`}
      style={{ '--subject-accent': color }}
      aria-hidden="true"
    >
      {type === 'logo' ? (
        <img src={iconUrl} alt="" className="subject-icon__img" />
      ) : (
        <span className="subject-icon__initials">{initials}</span>
      )}
    </div>
  )
}

export default SubjectIcon
