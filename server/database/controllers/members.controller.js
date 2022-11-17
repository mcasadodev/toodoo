import mssql from "mssql";
import jwt from "jsonwebtoken";

import { config } from "../config";

const sql = mssql;
const _config = config;

export const controller = {};

controller.verifyJWT = (req, res, next) => {
  const token = req.cookies.token;
  try {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      req.userId = decoded.id;
      next();
    });
  } catch (e) {
    res
      .clearCookie("token")
      .redirect("/")
      .json({ auth: false, message: "You failed to authenticate" })
      .end();
  }
};

controller.getMembers = async (req, res) => {
  try {
    const panelId = req.headers["current-panel"];
    const pool = await sql.connect(_config);
    const tasks = await pool.request().input("panel_id", sql.Int, panelId)
      .query(`SELECT m.id, m.name
              FROM USERS m 
              JOIN USERS_PANELS mp
              ON m.id = mp.member_id
              WHERE mp.panel_id = @panel_id
              ORDER BY mp.panel_id`);

    res.status(200).json(tasks.recordsets[0]);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

controller.addMember = async (req, res) => {
  try {
    const panelId = req.headers["current-panel"];
    const pool = await sql.connect(_config);
    const insertMember = await pool
      .request()
      .input("member_id", sql.Int, req.body.memberId)
      .input("panel_id", sql.Int, panelId)
      .query(
        `INSERT INTO
         users_panels
         VALUES (@member_id, @panel_id)`
      );
    res.status(201).json(insertMember.recordsets);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

controller.deleteMember = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    // const deleteMember = await pool
    //   .request()
    //   .input("id", sql.Int, req.body.id)
    //   .query("DELETE FROM panels WHERE id = @id");
    res.status(201).json(deleteMember.recordsets);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
