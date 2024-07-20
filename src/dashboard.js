import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, IconButton, TextField, Button, List, ListItem, ListItemText, Checkbox, ListItemSecondaryAction, Select, MenuItem } from '@mui/material';
import { LightMode, DarkMode, Star, StarBorder, Delete } from '@mui/icons-material';
import './styles.css';
import pro from './profile.jpg';

const Dashboard = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [importantTasks, setImportantTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [tasks, darkMode]);

  const addTask = () => {
    if (newTask.trim() && taskDate) {
      const newTaskObject = { task: newTask, date: taskDate, important: false, completed: false, priority: taskPriority };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
      setTaskDate('');
      setTaskPriority('Low');
    }
  };

  const completeTask = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        task.completed = !task.completed;
        if (task.completed) {
          setCompletedTasks([...completedTasks, task]);
        } else {
          setCompletedTasks(completedTasks.filter((_, j) => j !== index));
        }
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const toggleImportant = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        task.important = !task.important;
        if (task.important) {
          setImportantTasks([...importantTasks, task]);
        } else {
          setImportantTasks(importantTasks.filter((_, j) => j !== index));
        }
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    updateChart(tasks.length, completedTasks.length);
  }, [tasks, completedTasks]);

  const updateChart = (pending, done) => {
    const percentage = (done / (pending + done)) * 100 || 0;
    document.querySelector('.circle').style.background = `conic-gradient(#81c784 0% ${percentage}%, #f0f4f8 ${percentage}% 100%)`;
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="container">
        <aside className="sidebar">
          <div className="profile">
            <img src={pro} alt="Profile Picture" />
            <p>Hey, Noble</p>
          </div>
          <nav className="nav">
            <ul>
              <li className="active"><a href="#">All Tasks</a></li>
              <li><a href="#">Today</a></li>
              <li><a href="#">Important</a></li>
              <li><a href="#">Planned</a></li>
              <li><a href="#">Assigned to me</a></li>
              <li><a href="#">Add list</a></li>
            </ul>
          </nav>
          <div className="tasks-summary">
            <p>Today Tasks</p>
            <div className="chart">
              <span>{tasks.length}</span>
              <div className="circle"></div>
            </div>
          </div>
        </aside>
        <main className="main-content">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 2 }}>
                DoIt
              </Typography>
              <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <header className="header">
            <TextField
              label="Add a Task"
              variant="outlined"
              fullWidth
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              margin="normal"
            />
            <TextField
              type="date"
              variant="outlined"
              fullWidth
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              margin="normal"
            />
            <Select
              variant="outlined"
              fullWidth
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              margin="normal"
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
            <Button variant="contained" color="primary" onClick={addTask}>
              Add Task
            </Button>
          </header>
          <section className="tasks">
            <List>
              {tasks.map((task, index) => (
                <ListItem key={index} className={task.completed ? 'completed' : ''}>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => completeTask(index)}
                  />
                  <ListItemText primary={`${task.task} (${task.priority})`} secondary={task.date} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => toggleImportant(index)}>
                      {task.important ? <Star /> : <StarBorder />}
                    </IconButton>
                    <IconButton edge="end" onClick={() => deleteTask(index)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Typography variant="h6">Completed</Typography>
            <List>
              {completedTasks.map((task, index) => (
                <ListItem key={index}>
                  <ListItemText primary={task.task} secondary={task.date} />
                </ListItem>
              ))}
            </List>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
