import express from "express";
import dotenv from "dotenv";

import { controller as controllerMongoDb } from "../controllers/mongodb/users.controller";
import { controller as controllerSQLServer } from "../controllers/sqlserver/users.controller";

dotenv.config();

let usersController;
if (process.env.DATABASE === "MONGODB") usersController = controllerMongoDb;
else usersController = controllerSQLServer;

const router = express.Router();

router.post("/sign-in", usersController.signIn);
router.post("/sign-up", usersController.signUp);
router.post("/log-out", usersController.logOut);

export default router;
