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
    //res.redirect("/");
  }
};

controller.getPanels = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    const tasks = await pool
      .request()
      .input("owner_id", sql.Int, req.userId)
      .query("SELECT * FROM panels WHERE owner_id = @owner_id");

    res.status(200).json(tasks.recordsets[0]);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

controller.getPanel = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    const todo = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM panels WHERE id = @id");
    res.status(200).json(todo.recordset[0]);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

controller.createPanel = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    const insertPanel = await pool
      .request()
      .input("name", sql.NVarChar, req.body.name)
      //.input("description", sql.NVarChar, req.body.description)
      .input("owner_id", sql.Int, req.userId)
      .query(
        `INSERT INTO 
          panels 
          (name, owner_id)
         VALUES ( @name, @owner_id)`
      );
    console.log("Panel added succesfully!!!");
    res.status(201).json(insertPanel.recordsets);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

controller.editPanel = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    const editPanel = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("name", sql.NVarChar, req.body.name)
      //.input("description", sql.NVarChar, req.body.description)
      .query(
        `UPDATE 
          panels
        SET 
        name = @name, 
        WHERE id = @id`
      );
    consolw.log(editPanel);
    res.status(201).json(editPanel.recordsets);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

controller.deletePanel = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    const deletePanel = await pool
      .request()
      .input("id", sql.Int, req.body.id)
      .query("DELETE FROM panels WHERE id = @id");
    res.status(201).json(deletePanel.recordsets);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
