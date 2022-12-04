import express from "express";
import dotenv from "dotenv";

import { verifyJWT } from "../database/controllers/auth.controller.js";
import { controller } from "../database/controllers/todos.controller.js";

dotenv.config();

const router = express.Router();

router.get("/:panelId/tasks-list", verifyJWT, controller.getTodos);
router.get("/task-:todoId", verifyJWT, controller.getTodo);
router.post("/create-todo", verifyJWT, controller.createTodo);
router.put("/edit/:id", verifyJWT, controller.editTodo);
router.delete("/delete/:id", verifyJWT, controller.deleteTodo);

export default router;
