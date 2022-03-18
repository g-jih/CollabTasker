import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import './TaskForm.css';

function TaskForm(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [items, setItems] = useState();
    const [progressTypes, setProgressTypes] = useState();
    const [form, setForm] = useState(location.state.task);
    const mode = location.state.mode;

    useEffect(() => {
        console.log('props.task', location.state.task);
        getItems();
        getProgressTypes();
    }, [])

    const getItems = () => {
        axios.get(`${props.api}/task/items/`)
            .then((response) => {
                setItems(response.data);
                console.log('item', response.data);
                if (form.item === undefined) {
                    setForm(prev => ({...prev, item: response.data[0].id}));
                }
            }) 
            .catch(function (error) {
                alert(error);
            });
    }

    const getProgressTypes = () => {
        axios.get(`${props.api}/task/progresstype/`)
        .then((response) => {
            setProgressTypes(response.data);
            console.log('progresstype', response.data);
            if (form.progress_type === undefined) {
                setForm(prev => ({...prev, progress_type: response.data[0].id}));
            }
        }) 
        .catch(function (error) {
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

    const createTask = () => {
        axios.post(`${props.api}/task/`, {
            ...form,
            created_at: new Date(),
            user: 1
        })
        .then((response) => {
            console.log('createTask response', response, response.data.id);
            navigate(`/${response.data.id}`);
        })
        .catch(function (error) {
            alert(error);
        });
    }

    const updateTask = () => {
        console.log('update form', form)
        axios.put(`${props.api}/task/${form.id}/`, form)
        .then((response) => {
            console.log('updateTask response', response, response.data.id);
            navigate(`/${response.data.id}`);
        })
        .catch(function (error) {
            alert(error);
        });
    }

    return (
        <div>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={form.name} onChange={(e) => setForm(prev => ({...prev, name: e.target.value}))} />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="startDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" value={form.start_date} onChange={(e) => setForm(prev => ({...prev, start_date: e.target.value}))}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="endDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" value={form.end_date} onChange={(e) => setForm(prev => ({...prev, end_date: e.target.value}))}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="item">
                        <Form.Label>상위카테고리</Form.Label>
                        <Form.Select value={form.item} onChange={(e) => setForm(prev => ({...prev, item: e.target.value}))}>
                            {items && items.map(item =>
                                <option key={item.name} label={item.name}>{item.id}</option>
                            )}
                    </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="progresstype">
                        <Form.Label>Progress</Form.Label>
                        <Form.Select value={form.progress_type} onChange={(e) => setForm(prev => ({...prev, progress_type: e.target.value}))}>
                            {progressTypes && progressTypes.map(type =>
                                <option key={type.name} label={type.name}>{type.id}</option>
                            )}
                    </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="achievement">
                        <Form.Label>Achievement</Form.Label>
                        <Form.Control type="number" value={form.achievement} onChange={(e) => setForm(prev => ({...prev, achievement: e.target.value}))}/>
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default TaskForm;