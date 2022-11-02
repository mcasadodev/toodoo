import mssql from "mssql";
import jwt from "jsonwebtoken";

import { Todo } from "../../models/sqlserver/todo.model";
import { config } from "./config";

const sql = mssql;
const _config = config;

export const controller = {};

controller.verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.json({ auth: false, message: "There is no token" });
  } else {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "You failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

controller.getTodos = async (req, res) => {
  try {
    //if (req.session.user === undefined) res.status(200).json([]);
    const pool = await sql.connect(_config);
    const todos = await pool
      .request()
      .input("creator_email", sql.NVarChar, req.session.user.email)
      .query("SELECT * FROM todos WHERE creator_email = @creator_email");

    res.status(200).json(todos.recordsets[0]);
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
      .query("SELECT * FROM todos WHERE id = @id");
    res.status(200).json(todo.recordset[0]);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

controller.createTodo = async (req, res) => {
  console.log(req.session.user);
  console.log(req.body.user);
  try {
    const pool = await sql.connect(_config);
    const insertTodo = await pool
      .request()
      .input("title", sql.NVarChar, req.body.title)
      .input("creator", sql.NVarChar, req.body.creator)
      .input("message", sql.NVarChar, req.body.message)
      .input("tags", sql.NVarChar, req.body.tags)
      .input("creator_email", sql.NVarChar, req.body.user)
      .query(
        `INSERT INTO 
          todos 
          (title, creator, message, tags, creator_email)
         VALUES ( @title, @creator, @message, @tags, @creator_email)`
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
      .input("creator", sql.NVarChar, req.body.creator)
      .input("message", sql.NVarChar, req.body.message)
      .input("tags", sql.NVarChar, req.body.tags)
      .query(
        `UPDATE 
          todos
        SET 
          title = @title, 
          creator = @creator,
          message = @message,
          tags = @tags
        WHERE id = @id`
      );
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
      .query("DELETE FROM todos WHERE id = @id");
    res.status(201).json(deleteTodo.recordsets);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
