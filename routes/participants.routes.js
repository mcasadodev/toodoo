import express from "express";
import dotenv from "dotenv";

import { controller } from "../database/controllers/participants.controller.js";

dotenv.config();

const router = express.Router();

router.get(
  "/participants-list",
  controller.verifyJWT,
  controller.getParticipants
);
router.post(
  "/add-participant",
  controller.verifyJWT,
  controller.addParticipant
);
router.delete(
  "/delete/:id",
  controller.verifyJWT,
  controller.deleteParticipant
);

export default router;
