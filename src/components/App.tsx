import React, { ChangeEvent, useState } from "react";
import "../styles/App.css";
import Task from "./Task";
import { TaskData } from "../types";
import { useCookies } from "react-cookie";

function App() {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().substr(0, 10));
  const [color, setColor] = useState<string>("#ff8080");
  const [showInputs, setShowInputs] = useState<boolean>(true);
  const [cookies, setCookies] = useCookies(["tasks"]);
  const [taskList, setTaskList] = useState<TaskData[]>(cookies.tasks ?? []);

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

    const nextTask: TaskData = { name, desc, date, color };

    // Adding nextTask to the existing task list
    const listRef = [...taskList, nextTask];
    setTaskList(listRef);
    updateCookies(listRef);

    // Resetting input fields
    setName("");
    setDesc("");
  };

  const completeTask = (nameToDelete: string): void => {
    // Deleting task
    const listRef = taskList.filter((task) => task.name !== nameToDelete);
    setTaskList(listRef);
    updateCookies(listRef);
  };

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };

  const updateCookies = (listRef: TaskData[]) => {
    setCookies("tasks", listRef, { path: "/", maxAge: 157784630 });
    console.log(listRef);
  };

  return (
    <div className="App">
      <div id="task-list">
        {taskList.map((task: TaskData, key: number) => {
          return <Task key={key} task={task} onComplete={completeTask} />;
        })}
      </div>
      <div id="next-item">
        <h1 id="header" onClick={toggleInputs}>
          Add Task &#9662;
        </h1>
        {showInputs ? (
          <div id="inputs">
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
        ) : null}
      </div>
      <p id="footer">
        This website uses cookies.{" "}
        <a href="https://github.com/thebitspud/react-ts-todo" target="_blank">
          Made by Thebitspud (2021).
        </a>
      </p>
    </div>
  );
}

export default App;
