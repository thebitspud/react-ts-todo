import React, { ChangeEvent, useState } from "react";
import "../styles/App.css";
import Task from "./Task";
import { TaskData } from "../types";

function App() {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toLocaleDateString("en-CA"));
  const [color, setColor] = useState<string>("#ff8080");
  const [taskList, setTaskList] = useState<TaskData[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "date":
        setDate(event.target.value);
        break;
      case "color":
        setColor(event.target.value);
        break;
      default:
        throw new Error(`Unexpected input change: ${event.target.name}`);
    }
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    switch (event.target.name) {
      case "desc":
        setDesc(event.target.value);
        break;
      default:
        throw new Error(`Unexpected textarea change: ${event.target.name}`);
    }
  };

  const addTask = (): void => {
    // Task name is mandatory, other fields optional
    if (name === "") return;

    // Do not create tasks with duplicate names
    let getMatches = taskList.filter((task) => task.name === name);
    if (getMatches.length !== 0) {
      setName("");
      return;
    }

    const nextTask: TaskData = {
      name: name,
      desc: desc,
      date: date,
      color: color,
    };

    // Adding nextTask to the existing task list
    console.log(nextTask);
    setTaskList([...taskList, nextTask]);

    // Resetting input fields
    setName("");
    setDesc("");
  };

  const completeTask = (nameToDelete: string): void => {
    setTaskList(taskList.filter((task) => task.name !== nameToDelete));
  };

  return (
    <div className="App">
      <div id="task-list">
        {taskList.map((task: TaskData, key: number) => {
          return <Task key={key} task={task} onComplete={completeTask} />;
        })}
      </div>
      <div id="next-item">
        <h1 className="header">Add Task</h1>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Task Name"
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={date}
          placeholder="Due Date"
          onChange={handleInputChange}
        />
        <textarea
          name="desc"
          value={desc}
          placeholder="Description"
          onChange={handleTextAreaChange}
        />
        <div className="split-row">
          <input
            type="color"
            name="color"
            value={color}
            placeholder="Task Color"
            onChange={handleInputChange}
          />
          <button onClick={addTask}>Add Item</button>
        </div>
      </div>
    </div>
  );
}

export default App;
