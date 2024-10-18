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

  deleteTodoById: async (req, res) => {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.id });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  },

  deleteAllTodos: async (req, res) => {
    await Todo.deleteMany({ user: req.user.id });
    res.json({ message: "All todos deleted successfully" });
  },

  getTodoById: async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id, user: req.user.id });
    
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    
    res.json({ data: todo });
  },

  updateTodoById: async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user.id }, 
      { title, description }, 
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo updated successfully", data: todo });
  },


};
