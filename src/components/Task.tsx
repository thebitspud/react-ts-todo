import React, { useState } from "react";
import { TaskData } from "../types";
import "../styles/Task.css";

type TaskProps = {
  task: TaskData;
  onComplete(nameToDelete: string): void;
};

function Task(props: TaskProps) {
  const [showDetails, setShowDetails] = useState<boolean>(true);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="Task" style={{ borderRightColor: props.task.color }}>
      <h2 className="task-header" onClick={toggleDetails}>
        {props.task.name}
      </h2>
      <button className="delete" onClick={() => props.onComplete(props.task.name)}>
        &#x2715;
      </button>
      {showDetails ? (
        <div className="details">
          <div>{props.task.desc}</div>
          <br />
          <div>{new Date(props.task.date).toUTCString().substr(0, 16)}</div>
          <div>{props.task.color}</div>
        </div>
      ) : null}
    </div>
  );
}

export default Task;
