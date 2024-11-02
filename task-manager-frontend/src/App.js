// src/App.js
import React from 'react';
import './App.css';
import TaskList from './components/TaskList';

function App() {
    return (
        <div className="App">
            <h1>Task Management Application</h1>
            <TaskList />
        </div>
    );
}

export default App;
