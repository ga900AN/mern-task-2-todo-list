const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Task = require("./models/Task");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });

// Add a new task
app.post("/add", async (req, res) => {
  try {
    const newTask = new Task({
      task: req.body.task,
    });

    await newTask.save();

    res.json({
      message: "Task added successfully",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add task",
      error: error.message,
    });
  }
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get tasks",
      error: error.message,
    });
  }
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});