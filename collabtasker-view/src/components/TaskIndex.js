import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TaskIndex.css"; 
import GanttChart from "./GanttChart";
import NavBar from "./NavBar";

function TaskIndex(props) {
    const [chartData, setChartData] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        console.log('api', props.api, 'token', props.token);
        getTasks();
    }, []);

    const getTasks = async () => {
        axios.get(`${props.api}/task/`, {
            headers: {
                'Authorization': props.token
            }
        }).then((response) => {
            setTasks(response.data);
            let items = {};
            response.data.forEach(task => {
                const taskData = {
                    id: task.id,
                    name: task.name,
                    startDate: task.start_date,
                    endDate: task.end_date,
                    achievement: task.achievement,
                    progress: task.progress_type
                }
                if (task.item in items) {
                    items[task.item].tasks.push(taskData);
                } else {
                    items[task.item] = {
                        name: task.itemname,
                        tasks: [taskData]
                    }
                }
            });
            setChartData(Object.keys(items).map(key => ({id: key, ...items[key]})));

            console.log(response.data);
            console.log('chartData', items);
        }).catch(function (error) {
            alert(error);
        });
    }
    
    return (
        <div>
            <NavBar logout={props.logout} token={props.token}/>
            <div className="content-body">
                <GanttChart data={chartData}/>
            </div>
        </div>
    )
}

export default TaskIndex;