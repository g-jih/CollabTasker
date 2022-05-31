import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import TaskLog from "./TaskLog";
import NavBar from "./NavBar";
import "./TaskDetail.css";

function TaskDetail(props) {
    const navigate = useNavigate();
    const { task_id } = useParams();
    const [task, setTask] = useState({});
    const [taskLogs, setTaskLogs] = useState([]);

    useEffect(() => {
        getTask();
        getTaskLogs();
    }, [])

    const getTask = async () => {
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

    const getTaskLogs = async () => {
        axios.get(`${props.api}/task/tasklogs/${task_id}/`, {
            headers: {
                'Authorization': props.token
            }
        }).then((response) => {
            console.log('taskslog', response.data)
            setTaskLogs(response.data);
        }) 
        .catch(function (error) {
            alert(error);
        });
    }

    const deleteTask = async () => {
        axios.delete(`${props.api}/task/${task_id}/`, {
            headers: {
                'Authorization': props.token
            }
        }).then(response => {
            navigate('/task');
        })
    }

    return (
        <div className="task-detail">
            <NavBar logout={props.logout} token={props.token}/>
            <div className="content-body task-detail-container">
                <div className="task-detail-title">
                    {task.name}
                </div>
                <div className="flex-end">
                    <Link to={`/task/form`} state={{ task: task, mode: 'update' }}>
                        <button style={{marginRight: "10px"}}>
                            수정
                        </button>   
                    </Link>
                    <button onClick={deleteTask} style={{marginRight: "10px"}}>
                        삭제
                    </button>
                </div>
                <div className="task-detail-item">
                    <div className="task-detail-name">작업명</div>
                    <div className="task-detail-content">{task.name}</div>
                </div>
                <div className="task-detail-item">
                    <div className="task-detail-name">작성자</div>
                    <div className="task-detail-content">{task.username}</div>
                </div>
                <div className="task-detail-item">
                    <div className="task-detail-name">기간</div>
                    <div className="task-detail-content">{task.start_date} - {task.end_date}</div>
                </div>
                <div className="task-detail-item">
                    <div className="task-detail-name">구분</div>
                    <div className="task-detail-content">{task.progressname}</div>
                </div>
                <div className="task-detail-item">
                    <div className="task-detail-name">진행률</div>
                    <div className="task-detail-content">{task.achievement}%</div>
                </div>
                <div className="task-detail-item">
                    <div className="task-detail-name">생성일</div>
                    <div className="task-detail-content">{task.created_at}</div>
                </div>
                <div className="task-detail-item">
                    <div className="task-detail-name">Collaborators</div>
                    <div className="task-detail-content">{task.participants && task.participants.map(participant => <span key={participant.username}>{participant.username} </span>)}</div>
                </div>

                <div>
                    {taskLogs.map((taskLogId, index) => <TaskLog key={`taskLog${index}`} api={props.api} token={props.token} id={taskLogId} index={index} />)}
                </div>
            </div>
        </div>
    )
}

export default TaskDetail;