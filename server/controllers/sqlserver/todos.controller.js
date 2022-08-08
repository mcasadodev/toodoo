import mssql from "mssql";

import { Todo } from "../../models/sqlserver/todo.model";
import { config } from "./config";

const sql = mssql;
const _config = config;

export const todosController = {};

todosController.getTodos = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    const todos = await pool.request().query("SELECT * FROM todosList");
    res.status(200).json(todos.recordsets[0]);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

todosController.getTodo = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    const todo = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM todosList WHERE id = @id");
    res.status(200).json(todo.recordsets[0]);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

todosController.createTodo = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    const insertTodo = await pool
      .request()
      .input("title", sql.NVarChar, req.body.title)
      .input("creator", sql.NVarChar, req.body.creator)
      .input("message", sql.NVarChar, req.body.message)
      .input("tags", sql.NVarChar, req.body.tags)
      .query(
        `INSERT INTO 
          todosList 
          (title, creator, message, tags)
         VALUES ( @title, @creator, @message, @tags)`
      );
    //console.log("Todo added succesfully!!!");
    res.status(201).json(insertTodo.recordsets);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

todosController.editTodo = async (req, res) => {
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
          todosList
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

todosController.deleteTodo = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    const deleteTodo = await pool
      .request()
      .input("id", sql.Int, req.body.id)
      .query("DELETE FROM todosList WHERE id = @id");
    res.status(201).json(deleteTodo.recordsets);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
