// App.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, editTask, toggleTaskCompletion, selectFilteredTasks, setFilter } from "./tasksSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const filteredTasks = useSelector(selectFilteredTasks);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "" });
  const filter = useSelector((state) => state.tasks.filter);

  // Add Task Handler
  const handleAddTask = () => {
    if (!newTask.title.trim() || !newTask.dueDate.trim()) return;
    dispatch(addTask(newTask));
    setNewTask({ title: "", description: "", dueDate: "" });
  };

  return (
    <div className="app">
      <header>Task Management Dashboard</header>
      <div className="task-dashboard">
        <div className="add-task-form">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Task Title"
          />
          <textarea
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Task Description"
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <button id="addtask" onClick={handleAddTask}>Add Task</button>
        </div>

        <div className="task-filters tf1">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => dispatch(setFilter("all"))}
          >
            All Tasks
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => dispatch(setFilter("completed"))}
          >
            Completed Tasks
          </button>
          </div>
          <div className="task-filters tf2">
          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => dispatch(setFilter("pending"))}
          >
            Pending Tasks
          </button>
          <button
            className={filter === "overdue" ? "active" : ""}
            onClick={() => dispatch(setFilter("overdue"))}
          >
            Overdue Tasks
          </button>
        </div>

        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="task-actions">
                <button
                  className="complete"
                  onClick={() => dispatch(toggleTaskCompletion(task.id))}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  className="edit"
                  onClick={() => {
                    const title = prompt("Edit Title", task.title) || task.title;
                    const description = prompt("Edit Description", task.description) || task.description;
                    const dueDate = prompt("Edit Due Date", task.dueDate) || task.dueDate;
                    dispatch(editTask({ id: task.id, title, description, dueDate }));
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => dispatch(deleteTask(task.id))}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
