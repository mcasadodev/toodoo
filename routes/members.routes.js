import express from "express";
import dotenv from "dotenv";

import { controller } from "../database/controllers/members.controller.js";

dotenv.config();

const router = express.Router();

router.get("/members-list", controller.verifyJWT, controller.getMembers);
router.post("/add-member", controller.verifyJWT, controller.addMember);
router.delete("/delete/:id", controller.verifyJWT, controller.deleteMember);

export default router;
