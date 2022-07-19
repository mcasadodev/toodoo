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
  const todo = req.body;
  const newTodo = new Todo(todo);
  try {
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
