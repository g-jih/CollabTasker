import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./TaskDetail.css";

function TaskDetail(props) {
    const navigate = useNavigate();
    const { task_id } = useParams();
    const [task, setTask] = useState({});
    const [taskLogs, setTaskLogs] = useState([]);
    const [taskComments, setTaskComments] = useState({});
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        getTask();
        getTaskLogs();
        //getTaskComments();
    }, [])

    const getTask = () => {
        axios.get(`${props.api}/task/${task_id}/`, {
            headers: {
                'Authorization': props.token
            }
        }).then((response) => {
            console.log('getTask', response.data);
            setTask(response.data);
        }).catch(function (error) {
            alert(error);
        });
    }

    const getTaskLogs = () => {
        axios.get(`${props.api}/task/tasklogs/${task_id}/`, {
            headers: {
                'Authorization': props.token
            }
        }).then((response) => {
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
        axios.get(`${props.api}/task/taskcomments/${tasklogid}/`, {
            headers: {
                'Authorization': props.token
            }
        }).then((response) => {
            console.log('task comments', response.data)
            setTaskComments(prev => ({...prev, [tasklogid]: response.data}))
        })
    }

    const deleteTask = () => {
        axios.delete(`${props.api}/task/${task_id}/`, {
            headers: {
                'Authorization': props.token
            }
        }).then(response => {
            navigate('/task');
        })
    }

    const submitCommentHandler = (tasklogid) => {
        axios.post(`${props.api}/task/taskcomments/${tasklogid}/`, {
            ...newComment
        }, {
            headers: {
                'Authorization': props.token
            }
        }).then((response) => {
            console.log('createTask response', response, response.data.id);
            navigate(`/task/${response.data.id}`);
        })
        .catch(function (error) {
            alert(error);
        });
    }

    return (
        <div>
            {task.name}
            <button>
                <Link to={`/task/form`} state={{ task: task, mode: 'update' }}>
                    <div>수정</div>
                </Link>
            </button>
            <button onClick={deleteTask}>
                삭제
            </button>
            <table>
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
            </table>
            <div>Collaborators: {task.participants && task.participants.map(participant => <span key={participant.username}>{participant.username} </span>)}</div>
            <ul>
                {taskLogs.map((tasklog, idx) =>
                    <li key={`tasklog${idx}`} style={{textAlign: "left"}}>
                        <div>{tasklog.content}</div>
                        <div>progress: {tasklog.progressname}</div>
                        <div>achievement: {tasklog.achievement}</div>
                        <div>writer: {tasklog.username}</div>
                        <div>published_at: {tasklog.published_at}</div>
                        <ul>
                            {taskComments[tasklog.id] && taskComments[tasklog.id].map((comment, i) => 
                                    <li key={i + comment.content}>
                                        <div>{comment.content}</div>
                                        <div>글쓴이: {comment.username}</div>
                                        <div>created_at: {comment.created_at}</div>
                                    </li>)}
                            <li>
                                <div>
                                    <div>Comment</div>
                                    <input  type="text" onChange={(e) => setNewComment(prev => ({...prev, content: e.target.value}))} />
                                    <button onClick={() => submitCommentHandler(tasklog.id)}>Submit</button>
                                </div>
                            </li>
                        </ul>
                    </li>)}
            </ul>
        </div>
    )
}

export default TaskDetail;