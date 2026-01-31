# Task Manager - MERN Stack Application

A full-stack task management application built with MongoDB, Express.js, React, and Node.js. This application allows users to create, read, update, and delete tasks with features like filtering, sorting by due date, and visual analytics.

## Features

### Core Functionality (CRUD Operations)
- ✅ **Create** - Add new tasks with title, description, status, and due date
- ✅ **Read** - View all tasks in an organized list
- ✅ **Update** - Edit existing tasks (title, description, status, due date)
- ✅ **Delete** - Remove tasks with styled confirmation modal

### Additional Features
- 🔍 **Filter Tasks** - Filter by status (All, Pending, In Progress, Completed)
- 📅 **Sort by Due Date** - Tasks automatically sorted by nearest due date
- 📊 **Task Statistics** - Visual breakdown with bar charts
- 🎨 **Modern UI** - Clean, responsive design with gradient backgrounds
- 🔔 **Toast Notifications** - Real-time feedback for user actions
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Recharts** - Data visualization library
- **React Toastify** - Toast notifications
- **Axios** - HTTP client (installed)
- **React Icons** - Icon library (installed)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management

## Project Structure

```
task-manager/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── Filter.jsx
│   │   │   ├── TaskStats.jsx
│   │   │   └── ConfirmModal.jsx
│   │   ├── App.jsx        # Main app component
│   │   ├── App.css        # Global styles
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── server/                # Backend (Node.js + Express)
    ├── controllers/       # Request handlers
    │   └── taskController.js
    ├── models/           # Database models
    │   └── Task.js
    ├── routes/           # API routes
    │   └── tasks.js
    ├── server.js         # Server entry point
    ├── package.json
    └── .env             # Environment variables

```

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** (optional) - For cloning the repository

## Setup Instructions

### 1. Clone or Download the Project

```bash
cd task-manager
```

### 2. Setup Backend (Server)

Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `server` directory:
```bash
# Windows
type nul > .env

# Mac/Linux
touch .env
```

Add the following environment variables to `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
NODE_ENV=development
```

**Note:** 
- If using MongoDB Atlas, replace `MONGODB_URI` with your connection string
- For local MongoDB, ensure MongoDB service is running

Start the server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Setup Frontend (Client)

Open a new terminal and navigate to the client directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:3001` (or the next available port)

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:3001
```

## API Endpoints

### Tasks API (`/api/tasks`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Health Check
- GET `/api/health` - Check server status

## Usage Guide

### Creating a Task
1. Fill in the task form in the left column
2. Enter title (required), description (optional), status, and due date (optional)
3. Click "Add Task" button
4. Task will appear in the middle column sorted by due date

### Updating a Task
1. Click the edit (✏️) icon on any task
2. Modify the fields as needed
3. Click "Save" to update or "Cancel" to discard changes

### Deleting a Task
1. Click the delete (🗑️) icon on any task
2. Confirm deletion in the styled modal popup
3. Task will be removed from the list

### Filtering Tasks
1. Use the filter buttons in the left column
2. Select: All Tasks, Pending, In Progress, or Completed
3. Task list updates automatically

### Viewing Statistics
- Check the right column for visual analytics
- View task counts by status (Completed, Pending, In Progress)
- See task breakdown bar chart

## Database Schema

### Task Model
```javascript
{
  title: String (required, max 200 chars),
  description: String (max 1000 chars),
  status: String (enum: 'pending', 'in-progress', 'completed'),
  dueDate: Date (optional),
  createdAt: Date (auto-generated)
}
```

## Development

### Building for Production

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
- Set `NODE_ENV=production` in `.env`
- Deploy to your hosting platform (Heroku, Railway, Render, etc.)

## License

This project is open source and available for educational purposes.

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

---

**Built using the MERN Stack**
