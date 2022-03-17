import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskIndex from "./components/TaskIndex";
import TaskDetail from "./components/TaskDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TaskIndex/>}/>
        <Route path="/:taskid" element={<TaskDetail />}/>
      </Routes>
    </div>
  );
}

export default App;
