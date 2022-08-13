import express from "express";
import dotenv from "dotenv";

import { controller as controllerMongoDb } from "../controllers/mongodb/todos.controller";
import { controller as controllerSQLServer } from "../controllers/sqlserver/todos.controller";

dotenv.config();

let todosController;
if (process.env.DATABASE === "MONGODB") todosController = controllerMongoDb;
else todosController = controllerSQLServer;

const router = express.Router();

router.get("/", todosController.getTodos);
router.get("/:id", todosController.getTodo);
router.post("/", todosController.createTodo);
router.put("/edit/:id", todosController.editTodo);
router.delete("/delete/:id", todosController.deleteTodo);

export default router;
