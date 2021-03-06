import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from "axios";
import SignUp from './components/SignUp';
import LogIn from './components/Login';
import TaskIndex from "./components/TaskIndex";
import TaskDetail from "./components/TaskDetail";
import TaskForm from './components/TaskForm';
//const api = 'https://collabtaskerapi.herokuapp.com'
const api = 'http://127.0.0.1:8000'

function Router() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const saveToken = (token) => {
        setCookie('token', `TOKEN ${token}`);
    }

    const logout = async () => {
        axios.get(`${api}/logout/`, {
            headers: {
                'Authorization': cookies.token
            }
        }).then(() => {
            navigate('/');
        }).catch(function (error) {
            alert(error);
        });
        removeCookie('token');
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<LogIn api={api} setToken={saveToken}/>}/>
                <Route path="/signup" element={<SignUp api={api}/>}/>
                <Route path="/task" element={<TaskIndex api={api} logout={logout} token={cookies.token}/>}/>
                <Route path="/task/:task_id" element={<TaskDetail api={api} logout={logout} token={cookies.token}/>}/>
                <Route path="/task/form" element={<TaskForm api={api} logout={logout} token={cookies.token}/>}/>
            </Routes>
        </div>
    )
}

export default Router;