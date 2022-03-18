import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskIndex from "./components/TaskIndex";
import TaskDetail from "./components/TaskDetail";

//const api = 'https://collabtaskerapi.herokuapp.com'
const api = 'http://127.0.0.1:8000'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TaskIndex api={api}/>}/>
        <Route path="/:taskid" element={<TaskDetail api={api}/>}/>
      </Routes>
    </div>
  );
}

export default App;
