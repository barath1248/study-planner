function Navbar({username}) {
  return (
    <nav className="navbar">
      <h2>Study Planner</h2>

      <div className="navbar-right">
        <span>Welcome, {username}!</span>
      </div>
    </nav>
  )
}

export default Navbar
