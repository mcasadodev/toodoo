import express from "express";

// CONNECT WITH SQLSERVER
import { getTodos, createTodo } from "../actions/MSSQL_todos.js";

// CONNECT WITH MONGODB
//import { getTodos, createTodo } from "../actions/todos.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);

export default router;
