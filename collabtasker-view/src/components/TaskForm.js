import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import './TaskForm.css';
import NavBar from "./NavBar";

function TaskForm(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [items, setItems] = useState([]);
    const [progressTypes, setProgressTypes] = useState([]);
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState(location.state.task);
    const [selectedUser, setSelectedUser] = useState('');
    const [participants, setParticipants] = useState([]);
    const mode = location.state.mode;

    useEffect(() => {
        console.log('props.task', location.state.task);
        getItems();
        getProgressTypes();
        getUsers();
    }, [])

    const getItems = async () => {
        axios.get(`${props.api}/task/items/`, {
            headers: {
                'Authorization': props.token
            }
        }).then((response) => {
            setItems(response.data);
            if (form.item === undefined) {
                setForm(prev => ({...prev, item: response.data[0].id}));
            }
        }) 
        .catch(function (error) {
            alert(error);
        });
    }

    const getProgressTypes = async () => {
        axios.get(`${props.api}/task/progresstypes/`, {
            headers: {
                'Authorization': props.token
            }
        }).then((response) => {
            setProgressTypes(response.data);
            if (form.progress_type === undefined) {
                setForm(prev => ({...prev, progress_type: response.data[0].id}));
            }
        }).catch(function (error) {
            alert(error);
        });
    }

    const getUsers = async () => {
        axios.get(`${props.api}/task/users/`, {
            headers: {
                'Authorization': props.token
            }
        }).then((response) => {
            console.log('users', response.data)
            setUsers(response.data);
        }).catch(function (error) {
            alert(error);
        });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (mode === 'create') {
            createTask();
        } else if (mode === 'update') {
            updateTask();
        }
    }

    const createTask = async () => {
        axios.post(`${props.api}/task/`, {
            ...form,
            participants: undefined,
            username: undefined,
            participant_list: participants
        }, {
            headers: {
                'Authorization': props.token
            }
        }).then((response) => {
            console.log('createTask response', response, response.data.id);
            navigate(`/task/${response.data.id}`);
        })
        .catch(function (error) {
            alert(error);
        });
    }

    const updateTask = async () => {
        axios.patch(`${props.api}/task/${form.id}/`, {
            ...form,
            participants: undefined,
            username: undefined,
            participant_list: participants
        }, {
            headers: {
                'Authorization': props.token
            }
        }).then((response) => {
            console.log('updateTask response', response, response.data.id);
            navigate(`/task/${response.data.id}`);
        })
        .catch(function (error) {
            alert(error);
        });
    }

    const participantSelectChangeHandler = (e) => {
        console.log('options', e.target.value);
        setSelectedUser(e.target.value);
        setParticipants(prev => [...prev, e.target.value]);
    }

    return (
        <div className="task-form">
            <NavBar logout={props.logout} token={props.token}/>
            <div className="content-body">
                <div className="task-form-input-container">
                    <form onSubmit={submitHandler}>
                        <div className="task-form-item">
                            <div className="task-form-name">Name</div>
                            <input type="text" value={form.name} onChange={(e) => setForm(prev => ({...prev, name: e.target.value}))} />
                        </div>
                        <div className="task-form-item">
                            <div className="task-form-name">Start Date</div>
                            <input type="date" value={form.start_date} onChange={(e) => setForm(prev => ({...prev, start_date: e.target.value}))}/>
                        </div>
                        <div className="task-form-item">
                            <div className="task-form-name">End Date</div>
                            <input type="date" value={form.end_date} onChange={(e) => setForm(prev => ({...prev, end_date: e.target.value}))}/>
                        </div>
                        <div className="task-form-item">
                            <div className="task-form-name">상위카테고리</div>
                            <select value={form.item} onChange={(e) => setForm(prev => ({...prev, item: e.target.value}))}>
                                {items && items.map(item =>
                                    <option key={item.name} value={item.id}>{item.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="task-form-item">
                            <div className="task-form-name">Achievement</div>
                            <input type="number" value={form.achievement} onChange={(e) => setForm(prev => ({...prev, achievement: e.target.value}))}/>
                        </div>
                        <div className="task-form-item">
                            <div className="task-form-name">Progress</div>
                            <select value={form.progress_type} onChange={(e) => setForm(prev => ({...prev, progress_type: e.target.value}))}>
                                {progressTypes && progressTypes.map(type =>
                                    <option key={type.name} value={type.id}>{type.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="task-form-item">
                            <div className="task-form-name">Participants</div>
                            <select onChange={participantSelectChangeHandler}>
                                {users.map(user => 
                                    <option key={`user_${user.id}`} value={user.id}>{user.username}</option>
                                )}
                            </select>
                            <div>{participants}</div>
                        </div>
                        <div>
                            {users.map(user => user.username)}
                        </div>
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TaskForm;