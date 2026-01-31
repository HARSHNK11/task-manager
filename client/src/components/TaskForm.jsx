import React, { useState } from 'react'
import './TaskForm.css'

const TaskForm = ({ onAddTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    dueDate: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      alert('Please enter a task title')
      return
    }

    console.log('Submitting task with data:', formData)
    setSubmitting(true)
    const success = await onAddTask(formData)
    
    if (success) {
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        dueDate: ''
      })
    }
    
    setSubmitting(false)
  }

  return (
    <div className="task-form card">
      <h3>➕ Add New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
            disabled={submitting}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description (optional)"
            rows="3"
            disabled={submitting}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
            disabled={submitting}
          >
            <option value="pending">⏳ Pending</option>
            <option value="in-progress">🚧 In Progress</option>
            <option value="completed">✅ Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className="form-control"
            value={formData.dueDate}
            onChange={handleChange}
            disabled={submitting}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={submitting || !formData.title.trim()}
        >
          {submitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  )
}

export default TaskForm