import mssql from "mssql";

import { Todo } from "../models/MSSQL_todo.js";
import { config } from "./MSSQL_dbconfig.js";

//import config from "./MSSQL_dbconfig";

const sql = mssql;
const _config = config;

export const getTodos = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    const todos = await pool.request().query("SELECT * FROM todosList");
    console.log(todos.recordsets);
    res.status(200).json(todos.recordsets[0]);
  } catch (e) {
    console.log(e);
    res.status(404).json({ message: e.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const pool = await sql.connect(_config);
    await pool.request().query(
      `INSERT INTO todosList (
        title,
        creator,
        message,
        tags)
      VALUES (
        ${req.body.title},
        ${req.body.creator},
        ${req.body.message},
        ${req.body.tags})`
    );
    console.log("Todo added succesfully!!!");
    res.status(200).json(todos.recordsets[0]);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
