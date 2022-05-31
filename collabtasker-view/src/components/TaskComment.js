import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TaskComment.css";

function TaskComment(props) {

    return (
        <div className="task-comment">
            <div className="flex-between task-comment-top">
                <div className="flex-start">
                    <div className="task-comment-creator">{props.comment.username}</div>
                    <div className="task-comment-create-date">{props.comment.created_at.split('T')[0]}  {props.comment.created_at.split('T')[1].split('+')[0]}</div>
                </div>
                <div className="task-comment-delete" 
                    onClick={() => props.deleteComment(props.comment.id)}>
                    삭제
                </div>
            </div>
            <div>{props.comment.content}</div>
        </div>
    )
}

export default TaskComment;