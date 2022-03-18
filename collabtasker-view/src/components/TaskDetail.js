import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Table, ListGroup, ListGroupItem, Button, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import "./TaskDetail.css";

function TaskDetail(props) {
    const navigate = useNavigate();
    const { taskid } = useParams();
    const [task, setTask] = useState({});
    const [taskLogs, setTaskLogs] = useState([]);
    const [taskComments, setTaskComments] = useState({});

    useEffect(() => {
        getTasks();
        getTaskLogs();
        //getTaskComments();
    }, [])

    const getTasks = () => {
        axios.get(`${props.api}/task/${taskid}/`)
            .then((response) => {
                setTask(response.data);
            }) 
            .catch(function (error) {
                alert(error);
            });
    }

    const getTaskLogs = () => {
        axios.get(`${props.api}/task/tasklogs/${taskid}/`)
            .then((response) => {
                setTaskLogs(response.data);
                response.data.forEach(tasklog => {
                    getTaskComments(tasklog.id)
                })
            }) 
            .catch(function (error) {
                alert(error);
            });
    }

    const getTaskComments = (tasklogid) => {        
        axios.get(`${props.api}/task/taskcomments/${tasklogid}/`)
            .then((response) => {
                console.log('task comments', response.data)
                setTaskComments(prev => ({...prev, [tasklogid]: response.data}))
            })
    }

    const updateTask = () => {
        axios.put(`${props.api}/task/${taskid}/`,)
            .then(response => {

            })
    }

    const deleteTask = () => {
        axios.delete(`${props.api}/task/${taskid}/`)
            .then(response => {
                navigate('/');
            })
    }

    useEffect(() => {
        console.log('taskComments 변함', taskComments)
    }, [taskComments])
    return (
        <div>
            {task.name}
            <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button>
                        <Link to={`/form`} state={{ task: task, mode: 'update' }}>
                            <div>수정</div>
                        </Link>
                    </Button>
                    <Button onClick={deleteTask}>삭제</Button>
                </ButtonGroup>
            </ButtonToolbar>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>creator</th>
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
                        <td>{task.username}</td>
                        <td>{task.start_date}</td>
                        <td>{task.end_date}</td>
                        <td>{task.progressname}</td>
                        <td>{task.achievement}</td>
                        <td>{task.created_at}</td>
                    </tr>
                </tbody>
            </Table>

            <ListGroup>
                {taskLogs.map((tasklog, idx) =>
                    <ListGroupItem key={`tasklog${idx}`} style={{textAlign: "left"}}>
                        <div>{tasklog.content}</div>
                        <div>progress: {tasklog.progressname}</div>
                        <div>achievement: {tasklog.achievement}</div>
                        <div>writer: {tasklog.username}</div>
                        <div>published_at: {tasklog.published_at}</div>
                        <ListGroup>
                            {taskComments[tasklog.id] && taskComments[tasklog.id].map((comment, i) => 
                                <ListGroupItem key={i + comment.content}>
                                    <div>{comment.content}</div>
                                    <div>글쓴이: {comment.username}</div>
                                    <div>created_at: {comment.created_at}</div>
                                </ListGroupItem>)}
                        </ListGroup>
                    </ListGroupItem>)}
            </ListGroup>
        </div>
    )
}

export default TaskDetail;