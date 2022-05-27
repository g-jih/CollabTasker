import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GanttChart.css"; 

function GanttChart(props) {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [chartData, setChartData] = useState([]);
    const { innerWidth: width, innerHeight: height } = window;
    const nameWidth = 100;
    const [widthUnit, setWidthUnit] = useState(20);
    const [gridLines, setGridLines] = useState();
    const [days, setDays] = useState(0);

    function initChartData(rawData) {
        let wholeStartDate, wholeEndDate;
        const data = rawData.reduce((acc, cur, idx) => {
            let itemStartDate, itemEndDate, tasks;
            tasks = cur.tasks.reduce((tasklist, task)  => {
                if (itemStartDate === undefined || task.startDate < itemStartDate) {
                    itemStartDate = task.startDate;
                    if (wholeStartDate === undefined || task.startDate < wholeStartDate) {
                        wholeStartDate = task.startDate;
                    }
                }
                if (itemEndDate === undefined || task.endDate > itemEndDate) {
                    itemEndDate = task.endDate;
                    if (wholeEndDate === undefined || task.endDate > wholeEndDate) {
                        wholeEndDate = task.endDate;
                    }
                }
                tasklist.push({...task, days: getDifferenceInDays(task.startDate, task.endDate)});
                return tasklist;
            }, []);
            acc.push({...cur, startDate: itemStartDate, endDate: itemEndDate, days: getDifferenceInDays(itemStartDate, itemEndDate), tasks: tasks});
            return acc;
        }, []);

        setChartData(data);
        setStartDate(wholeStartDate);
        setEndDate(wholeEndDate);
        setWidthUnit((width - nameWidth) / getDifferenceInDays(wholeStartDate, wholeEndDate));
        console.log(wholeStartDate, wholeEndDate);
        console.log(typeof width, typeof nameWidth, typeof getDifferenceInDays(wholeStartDate, wholeEndDate), 
         width - nameWidth, '/',  getDifferenceInDays(wholeStartDate, wholeEndDate), '/', (width - nameWidth) / getDifferenceInDays(wholeStartDate, wholeEndDate));
    }

    useEffect(() => {
        initChartData(props.data);
        console.log('width', width);
    }, [props.data]);

    useEffect(() => {
        setDays(getDifferenceInDays(startDate, endDate));
        setGridLines(Array.from(Array(parseInt(days / 5)).keys()).map(key =>
            <div key={'line' + key} className="gantt-chart-grid-line" style={{width: widthUnit * 5, marginLeft: widthUnit * key * 5}}></div>));
    }, [startDate, endDate]);

    return (
        <div className="gantt-chart">
            <div className="gantt-chart-grid" style={{width: widthUnit * days + nameWidth }}>
                {gridLines}
            </div>
            <div className="gantt-chart-header">
                <div className="gantt-chart-row">
                    <div className="gantt-chart-name">
                        Name
                    </div>
                    <div className="gantt-chart-date-bar">
                        <div className="gantt-chart-date" style={{left: nameWidth}}>
                            {startDate}
                        </div>
                        <div className="gantt-chart-date" style={{left: widthUnit * days + nameWidth}}>
                            {endDate}
                        </div>
                    </div>
                </div>
            </div>
            <div className="gantt-chart-body">
                {chartData.map(item => 
                    <div className="gantt-chart-group" key={`item${item.id}`}>
                        <div className="gantt-chart-row">
                            <div className="gantt-chart-name gantt-chart-item-name">
                                {item.name}
                            </div>
                            <div className="gantt-chart-bar-container">
                                <div className="gantt-chart-bar" 
                                    style={{ marginLeft: widthUnit * getDifferenceInDays(startDate, item.startDate),
                                        width: item.days === 0 ? widthUnit * 0.5 : widthUnit * item.days }}>
                                </div>
                            </div>
                        </div>
                        {item.tasks.map(task => 
                            <div className="gantt-chart-row" key={`task${task.id}`}>
                                <div className="gantt-chart-name gantt-chart-task-name" onClick={() => navigate(`/task/${task.id}`)}>
                                    {task.name}
                                </div>
                                <div className="gantt-chart-bar-container">
                                    <div className="gantt-chart-bar" 
                                        style={{ marginLeft: widthUnit * getDifferenceInDays(startDate, task.startDate),
                                                width: task.days === 0 ? widthUnit * 0.5 : widthUnit * task.days }}>
                                    </div>
                                    <div className="gantt-chart-bar gantt-chart-bar-achievement" 
                                        style={{ marginLeft: widthUnit * getDifferenceInDays(startDate, task.startDate),
                                                width: widthUnit * task.days * task.achievement / 100}}>
                                        {task.achievement}%
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>)}
            </div>
        </div>
    )
}

export default GanttChart;

function getDifferenceInDays(startDate, endDate) {
    if (startDate === undefined || endDate === undefined) {
        return 1;
    }
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    return (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24);
}