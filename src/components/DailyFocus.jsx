import { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import '../styles/DailyFocus.css'

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function DailyFocus() {
  const [stored, setStored] = useLocalStorage('study-daily-focus', {
    date: '',
    text: '',
  })
  const [draft, setDraft] = useState(
    stored.date === todayKey() ? stored.text : ''
  )
  const [saved, setSaved] = useState(false)

  const isToday = stored.date === todayKey() && stored.text.trim()
  const displayFocus = isToday ? stored.text : ''

  function handleSave(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return

    setStored({ date: todayKey(), text })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2000)
  }

  function handleClear() {
    setStored({ date: todayKey(), text: '' })
    setDraft('')
  }

  return (
    <section className="daily-focus" aria-labelledby="daily-focus-title">
      <div className="daily-focus-head">
        <div>
          <p className="daily-focus-eyebrow">Today&apos;s focus</p>
          <h2 id="daily-focus-title">One goal for this study session</h2>
        </div>
        {displayFocus && (
          <button type="button" className="daily-focus-clear" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      {displayFocus ? (
        <p className="daily-focus-active">{displayFocus}</p>
      ) : (
        <p className="daily-focus-hint">
          Set a single priority so you know what to finish first.
        </p>
      )}

      <form className="daily-focus-form" onSubmit={handleSave}>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="e.g. Finish React hooks chapter"
          maxLength={120}
        />
        <button type="submit" disabled={!draft.trim()}>
          {saved ? 'Saved' : 'Set focus'}
        </button>
      </form>
    </section>
  )
}

export default DailyFocus
