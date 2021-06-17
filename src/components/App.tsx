import React, { ChangeEvent, useState } from "react";
import "../styles/App.css";
import Task from "./Task";
import { TaskData } from "../types";

function App() {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toLocaleDateString());
  const [color, setColor] = useState<string>("#ff8000");
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

  return (
    <div className="App">
      <h1 className="header">My To-do list</h1>
      <div id="next-item">
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
      <div id="task-list">
        {taskList.map((task: TaskData, key: number) => {
          return <Task key={key} task={task} />;
        })}
      </div>
    </div>
  );
}

export default App;
