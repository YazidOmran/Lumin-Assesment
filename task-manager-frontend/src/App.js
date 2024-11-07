import React, { useEffect, useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import { Typography, Box, Button, Avatar, Popover, IconButton } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
    const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const [userPermissions, setUserPermissions] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const fetchPermissions = async () => {
            if (user) {
                try {
                    const token = await getAccessTokenSilently();
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    setUserPermissions(decodedToken.permissions || []);
                } catch (error) {
                    console.error("Failed to retrieve permissions:", error);
                }
            }
        };
        fetchPermissions();
    }, [getAccessTokenSilently, user]);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popoverId = open ? 'user-info-popover' : undefined;

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
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>
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

                {/* User Profile and Login/Logout */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {!isAuthenticated ? (
                        <Button
                            variant="contained"
                            onClick={() => loginWithRedirect()}
                            sx={{ 
                                marginRight: 2, 
                                backgroundColor: '#5c6bc0', 
                                color: 'white',
                                '&:hover': { backgroundColor: '#3f51b5' }
                            }}
                        >
                            Log In
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                onClick={() => logout({ returnTo: window.location.origin })}
                                sx={{ 
                                    marginRight: 2, 
                                    backgroundColor: '#5c6bc0', 
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#3f51b5' }
                                }}
                            >
                                Log Out
                            </Button>
                            <IconButton onClick={handleAvatarClick}>
                                <Avatar alt={user.name} src={user.picture} />
                            </IconButton>
                        </>
                    )}

                    {/* Popover with User Details */}
                    <Popover
                        id={popoverId}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <Box sx={{ 
                            padding: 2, 
                            minWidth: 200,
                            backgroundColor: '#f5f5f5', 
                            borderRadius: 2, 
                            boxShadow: 3,
                            textAlign: 'left',
                        }}>
                            {user && (
                                <>
                                    <Typography variant="h6" sx= {{marginBottom: 1}}><strong>Welcome, {user.name}!</strong></Typography>
                                    <Typography variant="body2">
                                        <strong>Email: </strong>{user.email}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Permissions:</strong> {userPermissions.join(', ') || "None"}
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Popover>
                </Box>
            </Box>

            {/* Task List */}
            <TaskList userPermissions={userPermissions} />

            {/* Footer */}
            <Box sx={{ padding: 2, backgroundColor: '#f0f0f0', textAlign: 'center', marginTop: 4 }}>
                <Typography variant="body2" color="textSecondary">
                    Developed by Yazid Omran for Lumin Software Solutions 11/07/2024
                </Typography>
            </Box>
        </div>
    );
}

export default App;
