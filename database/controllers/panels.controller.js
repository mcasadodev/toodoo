import mysql from "mysql";
import jwt from "jsonwebtoken";

import { pool } from "../connection.js";

export const controller = {};

controller.getPanels = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM panels WHERE owner_id = ?",
      [req.userId]
    );
    console.log(result);
    res.status(200).json(result);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

controller.getPanel = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM panels WHERE id = ?", [
      req.params.id,
    ]);
    console.log(result[0]);
    res.status(200).json(result[0]);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

controller.createPanel = async (req, res) => {
  try {
    const [result] = await pool.query(
      `INSERT INTO 
          panels 
          (name, owner_id)
         VALUES (?, ?)`,
      [req.body.name, req.userId]
    );
    console.log("Panel added succesfully!!!");
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

controller.editPanel = async (req, res) => {
  try {
    const [result] = await pool.query(
      `UPDATE 
          panels
       SET 
          name = ?, 
       WHERE id = ?`,
      [req.body.name, req.params.id]
    );
    console.log("Panel edited succesfully!!!");
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

controller.deletePanel = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM panels WHERE id = ?", [
      req.body.id,
    ]);
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
