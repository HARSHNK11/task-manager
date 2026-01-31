import React, { useState } from 'react'
import './TaskItem.css'

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  })

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    const success = await onUpdateTask(task._id, editData)
    if (success) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
    })
    setIsEditing(false)
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'status-pending'
      case 'in-progress': return 'status-in-progress'
      case 'completed': return 'status-completed'
      default: return ''
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (isEditing) {
    return (
      <div className="task-item card editing">
        <div className="form-group">
          <input
            type="text"
            name="title"
            className="form-control"
            value={editData.title}
            onChange={handleEditChange}
            placeholder="Task title"
          />
        </div>
        
        <div className="form-group">
          <textarea
            name="description"
            className="form-control"
            value={editData.description}
            onChange={handleEditChange}
            placeholder="Task description"
            rows="2"
          />
        </div>
        
        <div className="form-group">
          <select
            name="status"
            className="form-control"
            value={editData.status}
            onChange={handleEditChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            className="form-control"
            value={editData.dueDate}
            onChange={handleEditChange}
          />
        </div>
        
        <div className="task-actions">
          <button onClick={handleSave} className="btn btn-primary">
            Save
          </button>
          <button onClick={handleCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`task-item card ${task.status}`}>
      <div className="task-header">
        <div>
          <h3 className="task-title">{task.title}</h3>
          <span className={`status-badge ${getStatusColor(task.status)}`}>
            {task.status.replace('-', ' ')}
          </span>
        </div>
        <div className="task-actions">
          <button 
            onClick={() => setIsEditing(true)}
            className="btn-edit"
            title="Edit task"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDeleteTask(task._id)}
            className="btn-delete"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      
      <div className="task-footer">
        <span className="task-date">
          📅 Created: {formatDate(task.createdAt)}
        </span>
        {task.dueDate && (
          <span className="task-due-date">
            ⏰ Due: {formatDate(task.dueDate)}
          </span>
        )}
      </div>
    </div>
  )
}

export default TaskItem