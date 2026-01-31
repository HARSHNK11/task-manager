import React from 'react'
import './Filter.css'

const Filter = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { value: 'all', label: 'All Tasks', emoji: '📋' },
    { value: 'pending', label: 'Pending', emoji: '⏳' },
    { value: 'in-progress', label: 'In Progress', emoji: '🚧' },
    { value: 'completed', label: 'Completed', emoji: '✅' }
  ]

  return (
    <div className="filter card">
      <h3>🔍 Filter Tasks</h3>
      <div className="filter-buttons">
        {filters.map(filter => (
          <button
            key={filter.value}
            className={`filter-btn ${currentFilter === filter.value ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.emoji} {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Filter