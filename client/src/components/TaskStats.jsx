import React from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import '../components/TaskStats.css'

const TaskStats = ({ tasks }) => {
  // Calculate task statistics
  const completed = tasks.filter(task => task.status === 'completed').length
  const pending = tasks.filter(task => task.status === 'pending').length
  const inProgress = tasks.filter(task => task.status === 'in-progress').length

  const pieData = [
    { name: 'Completed', value: completed, fill: '#10b981' },
    { name: 'Pending', value: pending, fill: '#ef4444' },
    { name: 'In Progress', value: inProgress, fill: '#f59e0b' }
  ]

  const barData = [
    { name: 'Completed', count: completed },
    { name: 'Pending', count: pending },
    { name: 'In Progress', count: inProgress }
  ]

  const COLORS = ['#10b981', '#ef4444', '#f59e0b']

  return (
    <div className="task-stats">
      <h3>Task Statistics</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number completed">{completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-number pending">{pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-item">
          <div className="stat-number in-progress">{inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <h4>Task Breakdown</h4>
          {(completed + pending + inProgress) > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#667eea" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="no-data">No tasks yet</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskStats
