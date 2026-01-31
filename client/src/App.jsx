import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import Filter from './components/Filter.jsx'
import TaskStats from './components/TaskStats.jsx'
import ConfirmModal from './components/ConfirmModal.jsx'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tasks')
      const data = await response.json()
      
      if (data.success) {
        console.log('Fetched tasks:', data.data)
        setTasks(data.data)
      } else {
        toast.error('Failed to fetch tasks')
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
      toast.error('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })

      const data = await response.json()
      
      if (data.success) {
        setTasks([data.data, ...tasks])
        toast.success('Task added successfully!')
        return true
      } else {
        toast.error(data.message || 'Failed to add task')
        return false
      }
    } catch (error) {
      console.error('Error adding task:', error)
      toast.error('Failed to add task')
      return false
    }
  }

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })

      const data = await response.json()
      
      if (data.success) {
        setTasks(tasks.map(task => 
          task._id === taskId ? data.data : task
        ))
        toast.success('Task updated successfully!')
        return true
      } else {
        toast.error(data.message || 'Failed to update task')
        return false
      }
    } catch (error) {
      console.error('Error updating task:', error)
      toast.error('Failed to update task')
      return false
    }
  }

  const handleDeleteTask = async (taskId) => {
    setTaskToDelete(taskId)
    setModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!taskToDelete) return

    try {
      const response = await fetch(`/api/tasks/${taskToDelete}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      
      if (data.success) {
        setTasks(tasks.filter(task => task._id !== taskToDelete))
        toast.success('Task deleted successfully!')
      } else {
        toast.error(data.message || 'Failed to delete task')
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      toast.error('Failed to delete task')
    } finally {
      setModalOpen(false)
      setTaskToDelete(null)
    }
  }

  const cancelDelete = () => {
    setModalOpen(false)
    setTaskToDelete(null)
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  // Filter and sort tasks
  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter)

  // Sort by due date (nearest first), tasks without due date go to the end
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // If neither has a due date, maintain current order
    if (!a.dueDate && !b.dueDate) return 0
    // Tasks without due date go to the end
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    // Sort by due date ascending (nearest first)
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })

  console.log('Sorted tasks:', sortedTasks.map(t => ({ title: t.title, dueDate: t.dueDate })))

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="app">
      <ToastContainer />
      <header className="header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <p>Manage your tasks efficiently</p>
        </div>
      </header>

      <main className="container">
        <div className="app-layout">
          <div className="sidebar">
            <TaskForm onAddTask={handleAddTask} />
            <Filter currentFilter={filter} onFilterChange={handleFilterChange} />
          </div>
          
          <div className="main-content">
            <div className="tasks-header">
              <h2>Your Tasks ({sortedTasks.length})</h2>
              <button onClick={fetchTasks} className="btn btn-secondary">
                Refresh
              </button>
            </div>
            
            <TaskList 
              tasks={sortedTasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
            
            {sortedTasks.length === 0 && (
              <div className="empty-state">
                <p>No tasks found. {filter !== 'all' && 'Try changing the filter.'}</p>
                {filter !== 'all' && (
                  <button 
                    onClick={() => setFilter('all')}
                    className="btn btn-primary"
                  >
                    Show All Tasks
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="graphs-section">
            <TaskStats tasks={tasks} />
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>Task Manager - MERN Stack Application</p>
        </div>
      </footer>

      <ConfirmModal
        isOpen={modalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  )
}

export default App