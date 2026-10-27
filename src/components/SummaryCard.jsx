const SummaryCard = ({ title, value, description, variant = 'indigo' }) => {
  return (
    <div className={`summary-card summary-card--${variant}`}>
      <h3>{title}</h3>
      <h2>{value}</h2>
      <p>{description}</p>
    </div>
  )
}

export default SummaryCard
