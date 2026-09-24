import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Get all tasks from backend
  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();

      setTasks(data);
    } catch (error) {
      console.log("Error getting tasks:", error);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: task,
        }),
      });

      const data = await response.json();

      alert(data.message);

      // Clear input
      setTask("");

      // Get updated task list
      getTasks();
    } catch (error) {
      console.log("Error adding task:", error);
      alert("Failed to add task");
    }
  };

  // Run when page opens
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <h1>My To-Do List</h1>

      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <h2>Tasks</h2>

      <ul>
        {tasks.map((item) => (
          <li key={item._id}>{item.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;