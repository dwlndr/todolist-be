const express = require("express");
const { getAllTodos, addTodo, deleteTodo } = require("../controllers/todo-controller");
const { validateToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", validateToken, getAllTodos);
router.get("/:id", validateToken, getTodoById);
router.put("/:id", validateToken, updateTodoById);
router.post("/", validateToken, addTodo);
router.delete("/:id", validateToken, deleteTodo);
router.delete("/:id", validateToken, deleteTodoById);

module.exports = router;
