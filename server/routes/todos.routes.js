import express from "express";
import dotenv from "dotenv";

import { todosController as todosControllerMongoDb } from "../controllers/mongodb/todos.controller";
import { todosController as todosControllerSQLServer } from "../controllers/sqlserver/todos.controller";

dotenv.config();

let todosController = {};

if (process.env.DATABASE === "MONGODB")
  todosController = todosControllerMongoDb;
else todosController = todosControllerSQLServer;

const router = express.Router();

router.get("/", todosController.getTodos);
router.get("/:id", todosController.getTodo);
router.post("/", todosController.createTodo);
router.put("/edit/:id", todosController.editTodo);
router.delete("/delete/:id", todosController.deleteTodo);

export default router;
