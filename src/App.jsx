
import { Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Schedule from './pages/Schedule'
import Subjects from './pages/Subjects'
import Settings from './pages/Settings'
import SubjectsDetails from './pages/SubjectsDetails'
import Layout from './components/Layout'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subjects/:id" element={<SubjectsDetails />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
