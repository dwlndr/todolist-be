const Todo = require("../models/Todo");

module.exports = {
  getAllTodos: async (req, res) => {
    const todos = await Todo.find({ user: req.user.id });
    res.json({ data: todos });
  },

  addTodo: async (req, res) => {
    const { title, description } = req.body;
    const newTodo = new Todo({
      title,
      description,
      user: req.user.id,
    });
    await newTodo.save();
    res.json({ message: "Todo added successfully" });
  },

  deleteTodo: async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted successfully" });
  },
};
