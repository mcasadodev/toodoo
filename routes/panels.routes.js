import express from "express";
import dotenv from "dotenv";

import { verifyJWT } from "../database/controllers/auth.controller.js";
import { controller } from "../database/controllers/panels.controller.js";

dotenv.config();

const router = express.Router();

router.get("/panels-list", verifyJWT, controller.getPanels);
router.get("/panel-:id", verifyJWT, controller.getPanel);
router.post("/create-panel", verifyJWT, controller.createPanel);
router.put("/edit/:id", verifyJWT, controller.editPanel);
router.delete("/delete/:id", verifyJWT, controller.deletePanel);

export default router;
