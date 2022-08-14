import express from "express";
import dotenv from "dotenv";

import { controller as controllerMongoDb } from "../controllers/mongodb/todos.controller";
import { controller as controllerSQLServer } from "../controllers/sqlserver/todos.controller";

dotenv.config();

let todosController;
if (process.env.DATABASE === "MONGODB") todosController = controllerMongoDb;
else todosController = controllerSQLServer;

const router = express.Router();

/* todosController.verifyJWT, */
router.get("/", todosController.getTodos);
router.get("/:id", todosController.verifyJWT, todosController.getTodo);
router.post("/", todosController.verifyJWT, todosController.createTodo);
router.put("/edit/:id", todosController.verifyJWT, todosController.editTodo);
router.delete(
  "/delete/:id",
  todosController.verifyJWT,
  todosController.deleteTodo
);

export default router;
