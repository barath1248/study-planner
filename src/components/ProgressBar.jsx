
import '../styles/ProgressBar.css'

function ProgressBar({ completed, total }) {
  const progress = total === 0
    ? 0
    : Math.round((completed / total) * 100)

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-info">
        <span>Study Progress</span>
        <span>{progress}%</span>
      </div>

      <div
        className="progress-bar-track"
        role="progressbar"
        aria-label="Study progress"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p>{completed} of {total} tasks completed</p>
    </div>
  )
}

export default ProgressBar
