import mssql from "mssql";
import jwt from "jsonwebtoken";

import { config } from "../config.js";

const sql = mssql;
const _config = config;

export const controller = {};

controller.getParticipants = async (req, res) => {
  try {
    const panelId = req.headers["current-panel"];
    const pool = await sql.connect(_config);
    // const tasks = await pool
    //   .request()
    //   .input("panel_id", sql.Int, panelId)
    //   .query(`SELECT m.name as MEMBER_NAME
    //           FROM USERS m
    //           JOIN USERS_PANELS mp
    //           ON m.id = mp.member_id
    //           WHERE mp.panel_id = @panel_id
    //           ORDER BY mp.panel_id`);

    res.status(200).json(tasks.recordsets[0]);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

controller.addParticipant = async (req, res) => {
  try {
    // const pool = await sql.connect(_config);
    // const insertParticipant = await pool
    //   .request()
    //   .input("name", sql.NVarChar, req.body.name)
    //   .input("owner_id", sql.Int, req.userId)
    //   .query(
    //     `INSERT INTO
    //       panels
    //       (name, owner_id)
    //      VALUES ( @name, @owner_id)`
    //   );
    res.status(201).json(insertParticipant.recordsets);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

controller.deleteParticipant = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    // const deleteParticipant = await pool
    //   .request()
    //   .input("id", sql.Int, req.body.id)
    //   .query("DELETE FROM panels WHERE id = @id");
    res.status(201).json(deleteParticipant.recordsets);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
