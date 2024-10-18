const express = require("express");
const { getAllTodos, addTodo, deleteTodo } = require("../controllers/todo-controller");
const { validateToken } = require("../middleware/auth");

const router = express.Router();

router.get("/", validateToken, getAllTodos);
router.post("/", validateToken, addTodo);
router.delete("/:id", validateToken, deleteTodo);

module.exports = router;
