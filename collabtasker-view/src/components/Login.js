import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogIn(props) {
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`${props.api}/account/login/`, form)
        .then((response) => {
            console.log('LogIn response', response);
            navigate('/task');
        })
        .catch(function (error) {
            alert(error);
        });
    }

    return (
        <div>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={form.username} onChange={(e) => setForm(prev => ({...prev, username: e.target.value}))} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={form.password} onChange={(e) => setForm(prev => ({...prev, password: e.target.value}))} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default LogIn;