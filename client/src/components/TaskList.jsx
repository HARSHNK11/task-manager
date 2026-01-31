import React from 'react'
import TaskItem from './TaskItem.jsx'
import './TaskList.css'

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  // Count tasks by status
  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1
    return acc
  }, {})

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <div>
          <h2>Your Tasks</h2>
        </div>
        <div className="task-count">
          Total: {tasks.length} task{tasks.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="task-list-empty">
            <p>No tasks found. Create your first task!</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TaskList