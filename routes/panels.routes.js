import express from "express";
import dotenv from "dotenv";

import { controller } from "../database/controllers/panels.controller.js";

dotenv.config();

const router = express.Router();

router.get("/panels-list", controller.verifyJWT, controller.getPanels);
router.get("/panel-:id", controller.verifyJWT, controller.getPanel);
router.post("/create-panel", controller.verifyJWT, controller.createPanel);
router.put("/edit/:id", controller.verifyJWT, controller.editPanel);
router.delete("/delete/:id", controller.verifyJWT, controller.deletePanel);

export default router;
