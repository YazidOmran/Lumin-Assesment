import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask, updateTask, addTask } from '../api';
import { Button, List, ListItem, ListItemText, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [filter, setFilter] = useState('All');

    // Fetch tasks when the component mounts
    useEffect(() => {
        const getTasks = async () => {
            try {
                const data = await fetchTasks();
                setTasks(data);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };

        getTasks();
    }, []);

    // Function to handle deleting a task
    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id)); // Remove the deleted task from the state
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    // Function to handle saving a task (add or update)
    const handleSaveTask = async (task) => {
        try {
            // If the task has an id, it's an update, otherwise it's a new task
            if (task.id) {
                await updateTask(task.id, task);
            } else {
                await addTask(task);
            }
            const data = await fetchTasks();
            setTasks(data);
            setSelectedTask(null); // Clear the selected task after saving
        } catch (error) {
            console.error("Failed to save task:", error);
        }
    };

    // Function to handle filtering tasks
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Filter tasks based on the selected filter
    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        return task.status === filter;
    });

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Task List
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select value={filter} onChange={handleFilterChange}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                </Select>
            </FormControl>
            <List>
                {filteredTasks.map((task) => (
                    <ListItem key={task.id} divider>
                        <ListItemText
                            primary={task.title}
                            secondary={`Status: ${task.status}, Due: ${task.dueDate}`}
                        />
                        <Box>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => setSelectedTask(task)}
                                sx={{ marginRight: 1 }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleDelete(task.id)}
                            >
                                Delete
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>
            <TaskForm task={selectedTask} onSave={handleSaveTask} />
        </Box>
    );
};

export default TaskList;

