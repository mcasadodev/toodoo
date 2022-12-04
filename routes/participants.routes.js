import express from "express";
import dotenv from "dotenv";

import { verifyJWT } from "../database/controllers/auth.controller.js";
import { controller } from "../database/controllers/participants.controller.js";

dotenv.config();

const router = express.Router();

router.get("/participants-list", verifyJWT, controller.getParticipants);
router.post("/add-participant", verifyJWT, controller.addParticipant);
router.delete("/delete/:id", verifyJWT, controller.deleteParticipant);

export default router;
