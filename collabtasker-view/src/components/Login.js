import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';

function LogIn(props) {
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    const submitHandler = async (e) => {
        e.preventDefault();
        axios.post(`${props.api}/login/`, form)
        .then((response) => {
            props.setToken(response.data.token);
            navigate('/task');
        })
        .catch(function (error) {
            console.log('error', error)
            alert(error);
        });
    }

    return (
        <div>
            <div className="login">
                <div className="login-title disable-drag" onClick={() => navigate('/')}>CollabTasker</div>
                <form onSubmit={submitHandler} class="login-form">
                    <div class="login-form">
                        <input type="text" name="username" id="username" placeholder="username"
                            value={form.username} onChange={(e) => setForm(prev => ({...prev, username: e.target.value}))}
                            required/>
                    </div>
                    <div class="login-form">
                        <input type="password" name="password" id="password" placeholder="password"
                            value={form.password} onChange={(e) => setForm(prev => ({...prev, password: e.target.value}))}
                            required/>
                    </div>
                    <div class="login-form">
                        <button type="submit">Sign In</button>
                    </div>
                </form>
                <div class="sign-up disable-drag" onClick={() => navigate('/signup')}>
                    Sign Up
                </div>
            </div>
        </div>
    )
}

export default LogIn;