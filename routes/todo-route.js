const express = require("express");
const { getAllTodos, addTodo,  getTodoById, updateTodoById, deleteTodoById, deleteAllTodos } = require("../controllers/todo-controller");
const { validateToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", validateToken, getAllTodos);
router.get("/:id", validateToken, getTodoById);
router.put("/:id", validateToken, updateTodoById);
router.post("/", validateToken, addTodo);
router.delete("/", validateToken, deleteAllTodos);
router.delete("/:id", validateToken, deleteTodoById);

module.exports = router;
