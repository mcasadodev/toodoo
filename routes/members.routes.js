import express from "express";
import dotenv from "dotenv";

import { verifyJWT } from "../database/controllers/auth.controller.js";
import { controller } from "../database/controllers/members.controller.js";

dotenv.config();

const router = express.Router();

router.get("/members-list", verifyJWT, controller.getMembers);
router.post("/add-member", verifyJWT, controller.addMember);
router.delete("/delete/:id", verifyJWT, controller.deleteMember);

export default router;
