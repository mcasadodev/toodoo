import express from "express";
import dotenv from "dotenv";

import { controller as controllerSQLServer } from "../controllers/sqlserver/panels.controller";

dotenv.config();

let panelsController = controllerSQLServer;

const router = express.Router();

router.get(
  "/panels-list",
  panelsController.verifyJWT,
  panelsController.getPanels
);
router.get("/:id", panelsController.verifyJWT, panelsController.getPanel);
router.post(
  "/create-panel",
  panelsController.verifyJWT,
  panelsController.createPanel
);
router.put("/edit/:id", panelsController.verifyJWT, panelsController.editPanel);

router.delete(
  "/delete/:id",
  panelsController.verifyJWT,
  panelsController.deletePanel
);

export default router;
