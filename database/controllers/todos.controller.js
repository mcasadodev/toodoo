import mssql from "mssql";
import mysql from "mysql";
import jwt from "jsonwebtoken";

//import { Todo } from "../../models/todo.model";
//import { config } from "../config.js";
import { pool } from "../connection.js";

//const sql = mssql;
//const _mysql = mysql;
//const _config = config;

export const controller = {};

controller.verifyJWT = (req, res, next) => {
  //const token = req.headers["x-access-token"];
  const token = req.cookies.token;
  try {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      req.userId = decoded.id;
      next();
    });
  } catch (e) {
    res
      .clearCookie("token")
      .json({ auth: false, message: "You failed to authenticate" })
      .end();
    //res.redirect("/");
  }
};

controller.getTodos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM tasks WHERE panel_id = ? AND creator_id = ?",
      [req.params.panelId, req.userId]
    );
    console.log(result);
    res.status(200).json(result);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

controller.getTodo = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
      req.params.todoId,
    ]);
    console.log(result[0]);
    res.status(200).json(result[0]);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

controller.createTodo = async (req, res) => {
  try {
    const [result] = await pool.query(
      `INSERT INTO 
          tasks 
          (title, description, panel_id, creator_id)
         VALUES ( ?, ?, ?, ?)`,
      [req.body.title, req.body.description, req.body.panelId, req.userId]
    );
    console.log("Task added succesfully!!!");
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

controller.editTodo = async (req, res) => {
  try {
    const [result] = await pool.query(
      `UPDATE 
          tasks
        SET 
          title = ?, 
          description = ?
        WHERE id = ?`,
      [req.body.title, req.body.description, req.params.id]
    );
    console.log("Todo edited succesfully!!!");
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

controller.deleteTodo = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [
      req.body.id,
    ]);
    res.status(201).json(result);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
