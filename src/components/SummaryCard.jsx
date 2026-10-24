import React from 'react'

const SummaryCard = ({title, value, description}) => {
  return (
     <div className="summary-card">
      <h3>{title}</h3>
      <h2>{value}</h2>
      <p>{description}</p>
    </div>
  )
}

export default SummaryCard
