import Todo from "../../models/mongodb/todo.model";

export const controller = {};

controller.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

controller.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json(todo);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

controller.createTodo = async (req, res) => {
  const todo = req.body;
  const newTodo = new Todo(todo);
  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

controller.editTodo = async (req, res) => {
  try {
    const { title, creator, message, tags } = req.body;
    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      title,
      creator,
      message,
      tags,
    });
    res.status(200).json(todo);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

controller.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json(todo);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
