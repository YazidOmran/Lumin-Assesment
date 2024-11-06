// src/App.js
import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import { Typography, Box, Button, Avatar } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    return (
        <div className="App">
            {/* Header */}
            <Box
                sx={{
                    padding: 4,
                    background: 'linear-gradient(to right, #3f51b5, #5c6bc0)',
                    color: 'white',
                    borderRadius: '0px 0px 16px 16px', 
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

                {/* Login/Logout Buttons */}
                {!isAuthenticated ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => loginWithRedirect()}
                        sx={{ marginTop: 2 }}
                    >
                        Log In
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => logout({ returnTo: window.location.origin })}
                        sx={{ marginTop: 2 }}
                    >
                        Log Out
                    </Button>
                )}

                {/* User Profile */}
                {isAuthenticated && user && (
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                        <Avatar alt={user.name} src={user.picture} sx={{ marginRight: 2 }} />
                        <Typography variant="h6">{user.name}</Typography>
                    </Box>
                )}
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
