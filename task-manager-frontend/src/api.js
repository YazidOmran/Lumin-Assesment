import axios from 'axios';

// Base URL for your ASP.NET Core API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://localhost:5001/api/tasks";

// Fetch all tasks
export const fetchTasks = async (token) => {
    try {
        const response = await axios.get(API_BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Add a new task
export const addTask = async (task, token) => {
    try {
        const response = await axios.post(API_BASE_URL, task, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Update a task by ID
export const updateTask = async (id, updatedTask, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, updatedTask, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Delete a task by ID
export const deleteTask = async (id, token) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("Error deleting task:", error.response ? error.response.data : error.message);
        throw error;
    }
};
