
import { useState } from 'react'
import '../styles/Schedule.css'
import useLocalStorage from '../hooks/useLocalStorage'
function Schedule() {
  const [sessions, setSessions] = useLocalStorage('study-sessions', [
    {
      id: 1,
      subject: 'Core Java',
      day: 'Monday',
      time: '10:00',
      duration: 60,
    },
    {
      id: 2,
      subject: 'React',
      day: 'Tuesday',
      time: '14:00',
      duration: 90,
    },
  ])
  const [subject, setSubject] = useState('')
  const [day, setDay] = useState('Monday')
  const [time, setTime] = useState('10:00')
  const [duration, setDuration] = useState('60')
  const [selectedDay, setSelectedDay] = useState('All')

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  function addSession(e) {
    e.preventDefault()

    if (!subject.trim() || Number(duration) <= 0) return

    const newSession = {
      id: Date.now(),
      subject: subject.trim(),
      day,
      time,
      duration: Number(duration),
    }

    setSessions((previousSessions) => [
      ...previousSessions,
      newSession,
    ])

    setSubject('')
    setDay('Monday')
    setTime('10:00')
    setDuration('60')
  }

  function deleteSession(id) {
    setSessions((previousSessions) =>
      previousSessions.filter((session) => session.id !== id)
    )
  }

  const filteredSessions = sessions.filter(
    (session) =>
      selectedDay === 'All' || session.day === selectedDay
  )

  return (
    <div className="schedule-page">
      <h1>Weekly Study Schedule</h1>
      <p>Plan your study sessions throughout the week.</p>

      <form className="schedule-form" onSubmit={addSession}>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject name"
          required
        />

        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          {days.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <input
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <button type="submit">Add Session</button>
      </form>

      <div className="schedule-filter">
        <label htmlFor="day-filter">View day: </label>

        <select
          id="day-filter"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="All">All days</option>

          {days.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="session-list">
        {filteredSessions.length === 0 ? (
          <p>No sessions planned for this day.</p>
        ) : (
          filteredSessions.map((session) => (
            <div className="session-card" key={session.id}>
              <div>
                <h3>{session.subject}</h3>
                <p>{session.day} at {session.time}</p>
                <p>{session.duration} minutes</p>
              </div>

              <button
                type="button"
                onClick={() => deleteSession(session.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Schedule
