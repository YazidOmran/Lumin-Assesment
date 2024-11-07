import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask, updateTask, addTask } from '../api';
import { useAuth0 } from '@auth0/auth0-react';
import {
    Button, List, ListItem, ListItemText, Box, Typography, Select, MenuItem, FormControl, InputLabel,
    Card, CardContent, CardActions, Divider, Grid, Dialog, DialogTitle, DialogContent, DialogActions,
    ToggleButton, ToggleButtonGroup, Snackbar, Alert
} from '@mui/material';
import TaskForm from './TaskForm';

const TaskList = ({ userPermissions }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [filter, setFilter] = useState('All');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [viewType, setViewType] = useState('card');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const checkPermission = (permission) => {
        if (!userPermissions.includes(permission)) {
            setAlertMessage(`You lack the required permission: ${permission}`);
            setAlertOpen(true);
            return false;
        }
        return true;
    };

    useEffect(() => {
        const getTasks = async () => {
            try {
                const token = await getAccessTokenSilently();
                const data = await fetchTasks(token);
                setTasks(data);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };

        getTasks();
    }, [getAccessTokenSilently]);

    const handleDelete = async () => {
        if (!checkPermission('delete:tasks')) return;

        if (taskToDelete) {
            try {
                const token = await getAccessTokenSilently();
                await deleteTask(taskToDelete.id, token);
                setTasks(tasks.filter(task => task.id !== taskToDelete.id));
                setIsDeleteDialogOpen(false);
                setTaskToDelete(null);
            } catch (error) {
                console.error("Failed to delete task:", error);
            }
        }
    };

    const handleDeleteClick = (task) => {
        setTaskToDelete(task);
        setIsDeleteDialogOpen(true);
    };

    const handleSaveTask = async (task) => {
        if (task.id) {
            if (!checkPermission('edit:tasks')) return;
        } else {
            if (!checkPermission('create:tasks')) return;
        }

        try {
            const token = await getAccessTokenSilently();
            if (task.id) {
                await updateTask(task.id, task, token);
            } else {
                await addTask(task, token);
            }
            const data = await fetchTasks(token);
            setTasks(data);
            setSelectedTask(null);
            setIsDialogOpen(false);
        } catch (error) {
            console.error("Failed to save task:", error);
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleEditClick = (task) => {
        setSelectedTask(task);
        setIsDialogOpen(true);
    };

    const handleAddClick = () => {
        setSelectedTask(null);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedTask(null);
    };

    const handleDeleteDialogClose = () => {
        setIsDeleteDialogOpen(false);
        setTaskToDelete(null);
    };

    const handleViewTypeChange = (event, newViewType) => {
        if (newViewType !== null) {
            setViewType(newViewType);
        }
    };

    const handleAlertClose = () => setAlertOpen(false);

    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        return task.status === filter;
    });

    return (
        <Box sx={{ padding: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <FormControl sx={{ width: '200px' }}>
                    <InputLabel>Status</InputLabel>
                    <Select value={filter} onChange={handleFilterChange}>
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleAddClick}>
                    Add a New Task
                </Button>
                <ToggleButtonGroup
                    value={viewType}
                    exclusive
                    onChange={handleViewTypeChange}
                    aria-label="view type"
                >
                    <ToggleButton value="card" aria-label="card view">
                        Card View
                    </ToggleButton>
                    <ToggleButton value="list" aria-label="list view">
                        List View
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Typography variant="h4" gutterBottom align="center">
                Task List
            </Typography>

            {viewType === 'card' ? (
                <Grid container spacing={3}>
                    {filteredTasks.map((task) => (
                        <Grid item xs={12} sm={6} md={4} key={task.id}>
                            <Card variant="outlined" sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {task.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        Status: {task.status}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Description: {task.description}
                                    </Typography>
                                </CardContent>
                                <Divider />
                                <CardActions sx={{ justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleEditClick(task)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDeleteClick(task)}
                                    >
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <List>
                    {filteredTasks.map((task) => (
                        <ListItem key={task.id} divider>
                            <ListItemText
                                primary={task.title}
                                secondary={`Status: ${task.status}, Due: ${new Date(task.dueDate).toLocaleDateString()}, Description: ${task.description}`}
                            />
                            <Box>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleEditClick(task)}
                                    sx={{ marginRight: 1 }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleDeleteClick(task)}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            )}

            {/* Task Dialog */}
            <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                <DialogTitle>{selectedTask ? "Edit Task" : "Add a New Task"}</DialogTitle>
                <DialogContent>
                    <TaskForm task={selectedTask} onSave={handleSaveTask} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose} fullWidth maxWidth="xs">
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this task?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Alert Snackbar */}
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="warning" sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TaskList;
