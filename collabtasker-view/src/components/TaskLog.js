import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskComment from "./TaskComment";
import "./TaskLog.css";

function TaskLog(props) {
    const [taskLog, setTaskLog] = useState();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const getTaskLog = async (taskLogId) => {
        axios.get(`${props.api}/task/tasklog/${taskLogId}/`, {
            headers: {
                'Authorization': props.token
            }
        }).then((response) => {
            setTaskLog(response.data);
        })
    }

    const getComments = async (taskLogId) => {     
        axios.get(`${props.api}/task/taskcomments/${taskLogId}/`, {
            headers: {
                'Authorization': props.token
            }
        }).then((response) => {
            setComments(response.data);
        })
    }

    const deleteComment = async (commentId) => {
        axios.delete(`${props.api}/task/taskcomment/${commentId}/`, {
            headers: {
                'Authorization': props.token
            }
        }).then(response => {
            console.log('delete', response.data);
            setComments(comments.filter(comment => comment.id !== commentId));
        })
    };

    const submitCommentHandler = async (taskLogId) => {
        if (newComment.trim() !== '') {
            axios.post(`${props.api}/task/taskcomments/${taskLogId}/`, {
                content: newComment
            }, {
                headers: {
                    'Authorization': props.token
                }
            }).then((response) => {
                console.log('createTask response', response, response.data.id);
                setNewComment('');
                setComments(prev => [...prev, response.data]);
            })
            .catch(function (error) {
                alert(error);
            });
        }
    }

    const commentInputKeyDownHandler = (e) => {
        if (e.key === 'Enter') {
            submitCommentHandler(props.id);
        }
    }

    useEffect(() => {
        getTaskLog(props.id);
        getComments(props.id);
    }, []);

    return (
        <div className="task-log" key={`tasklog${props.index}`} style={{textAlign: "left"}}>
            {taskLog && 
            <div>
                <div className="task-log-top flex-start">
                    <div className="task-log-title">{taskLog.content}</div>
                    <div className="task-log-date">{taskLog.published_at.split('T')[0]} {taskLog.published_at.split('T')[1].split('+')[0]}</div>
                </div>
                <div>progress: {taskLog.progressname}</div>
                <div>achievement: {taskLog.achievement}%</div>
                <div>writer: {taskLog.username}</div>
                <div className="task-comment-section">
                    {comments && comments.map((comment, i) => 
                        <TaskComment key={`log${props.id}comment${comment.id}`} comment={comment} 
                            api={props.api} token={props.token}
                            deleteComment={deleteComment}/>)}
                    <div className="task-comment-input">
                        <input type="text" value={newComment} 
                            onChange={(e) => setNewComment(e.target.value)} 
                            onKeyDown={commentInputKeyDownHandler}/>
                        <button className="task-comment-submit" onClick={() => submitCommentHandler(taskLog.id)}>Submit</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default TaskLog;