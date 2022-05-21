import Todo from "../models/todo.js ";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createTodo = async (req, res) => {
  const todo = req.body;
  const newTodo = new Todo(todo);
  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
