import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './NavBar.css';

function NavBar(props) {
    return (
        <div className="nav-bar">
            <div className="nav-bar-left-section">
                <div className="nav-bar-title"><Link to={'/'}>CollabTasker</Link></div>
            </div>
            <div className="nav-bar-right-section">
                {props.token && <div className="log-out-btn" onClick={props.logout} style={{cursor: 'pointer'}}>
                    logout
                </div>}
            </div>
        </div>
    )
}

export default NavBar;
