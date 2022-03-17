import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TaskIndex.css"; 
import { Link } from "react-router-dom";

function TaskIndex() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/task/")
            .then((response) => {
                setTasks(response.data);
                //console.log(response.data);
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