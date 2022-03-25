import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('signup', form);
        axios.post(`${props.api}/signup/`, form)
        .then((response) => {
            console.log('SignUp response', response);
            navigate('/');
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
                    <Form.Control type="text" value={form.username || ''} onChange={(e) => setForm(prev => ({...prev, username: e.target.value}))} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="text" value={form.email || ''} onChange={(e) => setForm(prev => ({...prev, email: e.target.value}))} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={form.password || ''} onChange={(e) => setForm(prev => ({...prev, password: e.target.value}))} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password1">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control type="password" value={form.password2 || ''} onChange={(e) => setForm(prev => ({...prev, password2: e.target.value}))} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default SignUp;