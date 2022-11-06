import mssql from "mssql";
import jwt from "jsonwebtoken";

import { Todo } from "../../models/sqlserver/todo.model";
import { config } from "./config";

const sql = mssql;
const _config = config;

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
    const pool = await sql.connect(_config);
    const tasks = await pool
      .request()
      .input("creator_id", sql.Int, req.userId)
      .query("SELECT * FROM tasks WHERE creator_id = @creator_id");

    res.status(200).json(tasks.recordsets[0]);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

controller.getTodo = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    const todo = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM tasks WHERE id = @id");
    res.status(200).json(todo.recordset[0]);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

controller.createTodo = async (req, res) => {
  //console.log("req.session.user: " + req.session.result);
  console.log("req.body.user: " + req.body.user);
  try {
    const pool = await sql.connect(_config);
    const insertTodo = await pool
      .request()
      .input("title", sql.NVarChar, req.body.title)
      .input("description", sql.NVarChar, req.body.description)
      .input("creator_id", sql.Int, req.userId)
      .query(
        `INSERT INTO 
          tasks 
          (title, description, creator_id)
         VALUES ( @title, @description,  @creator_id)`
      );
    console.log("Todo added succesfully!!!");
    res.status(201).json(insertTodo.recordsets);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

controller.editTodo = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    const editTodo = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("title", sql.NVarChar, req.body.title)
      .input("description", sql.NVarChar, req.body.description)
      .query(
        `UPDATE 
          tasks
        SET 
          title = @title, 
          description = @description
        WHERE id = @id`
      );
    consolw.log(editTodo);
    //console.log("Todo added succesfully!!!");
    res.status(201).json(editTodo.recordsets);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

controller.deleteTodo = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    const deleteTodo = await pool
      .request()
      .input("id", sql.Int, req.body.id)
      .query("DELETE FROM tasks WHERE id = @id");
    res.status(201).json(deleteTodo.recordsets);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
