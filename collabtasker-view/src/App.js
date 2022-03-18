import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskIndex from "./components/TaskIndex";
import TaskDetail from "./components/TaskDetail";
import TaskForm from './components/TaskForm';
import { Navbar, Container } from 'react-bootstrap';
//const api = 'https://collabtaskerapi.herokuapp.com'
const api = 'http://127.0.0.1:8000'

function App() {
  return (
    <div className="App">
      <Navbar bg="light" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            Collab Tasker
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<TaskIndex api={api}/>}/>
        <Route path="/:taskid" element={<TaskDetail api={api}/>}/>
        <Route path="/form" element={<TaskForm api={api}/>}/>
      </Routes>
    </div>
  );
}

export default App;
