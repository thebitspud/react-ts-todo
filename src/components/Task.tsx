import React from "react";
import { TaskData } from "../types";
import "../styles/Task.css";

type TaskProps = {
  task: TaskData;
  onComplete(nameToDelete: string): void;
};

const Task = (props: TaskProps) => (
  <div className="Task" style={{ borderRightColor: props.task.color }}>
    <h2 className="task-header" style={{ margin: 0 }}>
      {props.task.name}
    </h2>
    <div>{props.task.desc}</div>
    <br />
    <div>{new Date(props.task.date).toDateString()}</div>
    <div>{props.task.color}</div>
    <button className="delete" onClick={() => props.onComplete(props.task.name)}>
      &#x2715;
    </button>
  </div>
);

export default Task;
