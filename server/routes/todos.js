import express from "express";

import { getTodos, createTodo } from "../controllers/todos.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);

export default router;
