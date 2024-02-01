import "../src/style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/todos");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleNewTask = async () => {
    try {
      await axios.post("http://localhost:4000/api/todos", { text: newTask });
      const response = await axios.get("http://localhost:4000/api/todos");
      setTodos(response.data);
      setNewTask('');
    } catch (error) {
      console.error("Error creating new task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/todos/${taskId}`);
        const response = await axios.get("http://localhost:4000/api/todos");
        setTodos(response.data);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1>My Tasks</h1>
      <div className="form-wrapper">
        <input
          type="text"
          placeholder="Enter your todos"
          value={newTask}
          onChange={handleChange}
        />
        <button onClick={handleNewTask} disabled={!newTask.trim()}>
          New task
        </button>
      </div>
      <div className="boxes-wrapper">
        {todos.length === 0 ? (
          <p>No tasks in the database.</p>
        ) : (
          todos.map((todo) => (
            <div className="todo-boxes" key={todo._id}>
              <p>{todo.text}</p>
              <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDeleteTask(todo._id)} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
