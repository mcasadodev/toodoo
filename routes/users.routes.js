import express from "express";
import dotenv from "dotenv";

import { controller } from "../database/controllers/users.controller.js";

dotenv.config();

const router = express.Router();

router.post("/sign-in", controller.signIn);
router.post("/sign-up", controller.signUp);
router.get("/log-out", controller.logOut);
router.get("/check-if-logged", controller.checkIfLogged);
router.get("/users-list", controller.getUsers);

export default router;
