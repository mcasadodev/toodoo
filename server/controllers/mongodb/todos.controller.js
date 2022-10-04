import Todo from "../../models/mongodb/todo.model";
import jwt from "jsonwebtoken";

export const controller = {};

controller.verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.json({ auth: false, message: "There is no token" });
  } else {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "You failed to authenticate" });
        //console.log("Auth failed");
      } else {
        //console.log("Auth succeeded");
        req.userId = decoded.id;
        next();
      }
    });
  }
};

controller.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.session.user.email });
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
  // console.log("req.session FROM createTodo: " + req.session);
  // console.log("req.session.user FROM createTodo: " + req.session.user);
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
