import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Table } from "react-bootstrap";
import "./TaskDetail.css";

function TaskDetail() {
    const { taskid } = useParams();
    const [task, setTask] = useState({});
    const [taskLogs, setTaskLogs] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/task/${taskid}/`)
            .then((response) => {
                setTask(response.data);
                console.log('task', response.data);
            }) 
            .catch(function (error) {
                alert(error);
            });

        axios.get(`http://127.0.0.1:8000/task/tasklogs/${taskid}/`)
            .then((response) => {
                setTaskLogs(response.data);
                console.log('tasklog', response.data);
            }) 
            .catch(function (error) {
                alert(error);
            });
    }, [])
    return (
        <div>
            {task.name}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>start_date</th>
                        <th>end_date</th>
                        <th>progress</th>
                        <th>achievement</th>
                        <th>created_at</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{task.name}</td>
                        <td>{task.start_date}</td>
                        <td>{task.end_date}</td>
                        <td>{task.progress}</td>
                        <td>{task.achievement}</td>
                        <td>{task.created_at}</td>
                    </tr>
                </tbody>
            </Table>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>content</th>
                        <th>progress</th>
                        <th>achivement</th>
                        <th>writer</th>
                        <th>published_at</th>
                    </tr>
                </thead>
                <tbody>
                    {taskLogs.map((tasklog, idx) =>
                        <tr key={`tasklog${idx}`}>
                            <td>{tasklog.content}</td>
                            <td>{tasklog.progress}</td>
                            <td>{tasklog.achievement}</td>
                            <td>{tasklog.writer}</td>
                            <td>{tasklog.published_at}</td>
                            
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default TaskDetail;