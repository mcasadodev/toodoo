import express from "express";
import dotenv from "dotenv";

import { controller } from "../database/controllers/todos.controller.js";

dotenv.config();

const router = express.Router();

router.get("/:panelId/tasks-list", controller.verifyJWT, controller.getTodos);
router.get("/task-:todoId", controller.verifyJWT, controller.getTodo);
router.post("/create-todo", controller.verifyJWT, controller.createTodo);
router.put("/edit/:id", controller.verifyJWT, controller.editTodo);
router.delete("/delete/:id", controller.verifyJWT, controller.deleteTodo);

export default router;
