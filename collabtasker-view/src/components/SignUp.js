import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './SignUp.css';

function SignUp(props) {
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`${props.api}/signup/`, form)
        .then((response) => {
            navigate('/');
        })
        .catch(function (error) {
            alert(error);
        });
    }

    return (
        <div className='signup'>
            <div className="login-title disable-drag" onClick={() => navigate('/')}>CollabTasker</div>
            <form onSubmit={submitHandler} class="login-form">
                <div class="login-form">
                    <input type="text" name="username" id="username" placeholder="Username"
                        value={form.username || ''} onChange={(e) => setForm(prev => ({...prev, username: e.target.value}))}
                        required/>
                </div>
                <div class="login-form">
                    <input type="text" name="email" id="email" placeholder="E-mail"
                        value={form.email || ''} onChange={(e) => setForm(prev => ({...prev, email: e.target.value}))}
                        required/>
                </div>
                <div class="login-form">
                    <input type="password" name="password" id="password" placeholder="Password"
                        value={form.password || ''} onChange={(e) => setForm(prev => ({...prev, password: e.target.value}))}
                        required/>
                </div>
                <div class="login-form">
                    <input type="password" name="password" id="password" placeholder="Password *"
                        value={form.password2 || ''} onChange={(e) => setForm(prev => ({...prev, password2: e.target.value}))}
                        required/>
                </div>
                <div class="login-form">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;