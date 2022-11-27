import mssql from "mssql";
import mysql from "mysql";
import jwt from "jsonwebtoken";

import { config } from "../config.js";

const sql = mssql;
const _mysql = mysql;
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
    const connection = _mysql.createConnection(_config);
    connection.query(
      "SELECT * FROM panels WHERE owner_id = ?",
      [req.userId],
      (err, results) => {
        if (err) throw err;
        connection.end();
        res.status(200).json(results);
      }
    );
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

controller.getPanel = async (req, res) => {
  try {
    const connection = _mysql.createConnection(_config);
    connection.query(
      "SELECT * FROM panels WHERE id = ?",
      [req.params.id],
      (err, results) => {
        if (err) throw err;
        connection.end();
        res.status(200).json(results[0]);
      }
    );
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

controller.createPanel = async (req, res) => {
  try {
    const connection = _mysql.createConnection(_config);
    connection.query(
      `INSERT INTO 
          panels 
          (name, owner_id)
         VALUES (?, ?)`,
      [req.body.name, req.userId],
      (err, results) => {
        if (err) throw err;
        console.log("Panel added succesfully!!!");
        connection.end();
        res.status(201).json(results);
      }
    );
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

controller.editPanel = async (req, res) => {
  try {
    const connection = _mysql.createConnection(_config);
    connection.query(
      `UPDATE 
          panels
       SET 
          name = ?, 
       WHERE id = ?`,
      [req.body.name, req.params.id],
      (err, results) => {
        if (err) throw err;
        console.log("Panel edited succesfully!!!");
        connection.end();
        res.status(201).json(results);
      }
    );
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

controller.deletePanel = async (req, res) => {
  try {
    const connection = _mysql.createConnection(_config);
    connection.query(
      "DELETE FROM panels WHERE id = ?",
      [req.body.id],
      (err, results) => {
        if (err) throw err;
        connection.end();
        res.status(201).json(results);
      }
    );
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
