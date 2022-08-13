import express from "express";
import dotenv from "dotenv";

import { controller as controllerMongoDb } from "../controllers/mongodb/users.controller";
//import { controller as controllerSQLServer } from "../controllers/sqlserver/users.controller";

dotenv.config();

let usersController;
if (process.env.DATABASE === "MONGODB") usersController = controllerMongoDb;
//else usersController = controllerSQLServer;

const router = express.Router();

// router.get("/", usersController.getUsers);
// router.get("/:id", usersController.getUser);
// router.post("/", usersController.createUser);
// router.put("/edit/:id", usersController.editUser);
// router.delete("/delete/:id", usersController.deleteUser);

export default router;
