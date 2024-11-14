// src/App.js
import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import { Typography, Box } from '@mui/material';

function App() {
    return (
        <div className="App">
            {/* Header */}
            <Box
                sx={{
                    padding: 4,
                    background: 'linear-gradient(to right, #3f51b5, #5c6bc0)',
                    color: 'white',
                    borderRadius: '0px 0px 16px 16px', // Top corners angular, bottom corners rounded
                    boxShadow: 3,
                    marginBottom: 4,
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 700,
                        letterSpacing: 1.5,
                        fontSize: '2.5rem',
                        textTransform: 'uppercase',
                    }}
                >
                    Task Management Application
                </Typography>
                <Typography variant="subtitle1" sx={{ fontStyle: 'italic', opacity: 0.8 }}>
                    Organize and manage your tasks efficiently
                </Typography>
            </Box>

            {/* Task List */}
            <TaskList />

            {/* Footer */}
            <Box sx={{ padding: 2, backgroundColor: '#f0f0f0', textAlign: 'center', marginTop: 4 }}>
                <Typography variant="body2" color="textSecondary">
                    Developed by Yazid Omran for Lumin Software Solutions 11/02/2024
                </Typography>
            </Box>
        </div>
    );
}

export default App;
