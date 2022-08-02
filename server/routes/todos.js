import express from "express";

// CONNECT WITH SQLSERVER
import {
  getTodos,
  getTodo,
  createTodo,
  editTodo,
  deleteTodo,
} from "../controllers/MSSQL_todos.js";

// CONNECT WITH MONGODB
//import { getTodos, createTodo } from "../controllers/todos.controller.js";

const router = express.Router();

router.get("/", getTodos);
router.get("/:id", getTodo);
router.post("/", createTodo);
router.put("/edit/:id", editTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
