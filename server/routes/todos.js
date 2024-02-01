const express = require("express");
const router = express.Router();
const Todo = require("../models/todos");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newTodo = await Todo.create(data);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const deleteTodo = await Todo.findByIdAndDelete(todoId);
    res.status(201).json(deleteTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
