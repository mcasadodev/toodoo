import express from "express";

// CONNECT WITH SQLSERVER
import { getTodos, createTodo } from "../controllers/MSSQL_todos.js";

// CONNECT WITH MONGODB
//import { getTodos, createTodo } from "../controllers/todos.controller.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);

export default router;
