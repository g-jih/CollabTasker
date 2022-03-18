import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TaskIndex.css"; 
import { Link } from "react-router-dom";

function TaskIndex(props) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        console.log('api', props.api);
        axios.get(`${props.api}/task/`)
            .then((response) => {
                setTasks(response.data);
                console.log(response.data);
            }) 
            .catch(function (error) {
                alert(error);
            });
    }, []);

    return (
        <div>
            <h1>Task Index</h1>
            {tasks.map(task =>
                <Link to={`/${task.id}`} key={task.id}>
                    <div>{task.name}</div>
                </Link>)}
        </div>
    )
}

export default TaskIndex;