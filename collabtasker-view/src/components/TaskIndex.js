import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TaskIndex.css"; 
import { Link } from "react-router-dom";
import { Table, ListGroup, ListGroupItem, Button } from "react-bootstrap";

function TaskIndex(props) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        console.log('api', props.api, 'token', props.token);
        getTasks();
    }, []);

    const getTasks = () => {
        axios.get(`${props.api}/task/`, {
            headers: {
                'Authorization': props.token
            }
        }).then((response) => {
            setTasks(response.data);
            console.log(response.data);
        }).catch(function (error) {
            alert(error);
        });
    }

    return (
        <div>
            <Button variant="primary">
                <Link to={`/task/form`} state={{ task: {}, mode: 'create'}}>추가</Link>
            </Button>
            <ListGroup>
                {tasks.map(task =>
                <ListGroupItem key={task.id + task.name}>
                    <Link to={`/task/${task.id}`} key={task.id}>
                        <div>{task.name}</div>
                    </Link>
                </ListGroupItem>)}
            </ListGroup>
        </div>
    )
}

export default TaskIndex;