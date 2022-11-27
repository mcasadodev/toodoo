import jwt from "jsonwebtoken";
import mssql from "mssql";
import mysql from "mysql";
import bcrypt from "bcrypt";

import { User } from "../../models/user.model";
import { config } from "../config.js";

const sql = mssql;
const _mysql = mysql;
const _config = config;

export const controller = {};

// ENCRYPT METHODS - These should go on User.model.js when it's used
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const matchPassword = async (formPassword, userPassword) => {
  return await bcrypt.compare(formPassword, userPassword);
};

controller.signIn = async (req, res) => {
  const errors = [];
  try {
    const connection = _mysql.createConnection(_config);
    connection.query(
      `SELECT * FROM users WHERE email LIKE '${req.body.email}'`,
      (err, results) => {
        if (err) throw err;
        if (!results[0].name) {
          errors.push({ text: "User not found" });
        }
        if (errors.length > 0) {
          res.send(errors);
        } else {
          const match = matchPassword(req.body.password, results[0].password);
          if (match) {
            const { id } = results[0];
            const token = jwt.sign({ id }, process.env.SECRET, {
              expiresIn: 3000,
            });

            //req.session.user = user.recordset[0];
            //req.session.save();

            res.cookie("token", token, {
              httpOnly: false,
            });

            res.json({ auth: true, token, result: results[0] });
          } else {
            res.json({ auth: false });
          }
        }
      }
    );
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

controller.signUp = async (req, res) => {
  const messages = [];
  const errors = [];
  if (req.body.password != req.body.confirmPassword) {
    errors.push({ text: "Passwords do not match" });
  }
  if (req.body.password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters" });
  }
  if (errors.length > 0) {
    res.send({ errors });
  } else {
    try {
      const pwd = await encryptPassword(req.body.password);
      const connection = _mysql.createConnection(_config);
      connection.query(
        `SELECT * FROM users WHERE email LIKE '${req.body.email}'`,
        (err, results) => {
          if (err) throw err;
          if (results[0]) {
            if (results[0].name) {
              messages.push({ text: "Email already exists" });
              const obj = { errors: messages };
              res.send(obj);
            }
          } else {
            //SUCCESS
            connection.query(
              `INSERT INTO 
                users 
                 (name, email, password)
                 VALUES (?, ?, ?)`,
              [req.body.name, req.body.email, pwd],
              (err) => {
                if (err) throw err;
                messages.push({
                  text: "Your new user has been created. Sign in!",
                });
                res.send({ messages });
                //res.send(messages).redirect("../");
                connection.end();
              }
            );
          }
        }
      );
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};

controller.logOut = async (req, res) => {
  try {
    res.status(200).clearCookie("token", {
      sameSite: "none",
      secure: true,
    });
    res.end();
    //json({ message: "logged out successfully" });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

controller.checkIfLogged = async (req, res) => {
  const token = req.cookies.token;
  try {
    jwt.verify(token, process.env.SECRET, (err) => {
      if (!err) {
        res.json({ status: "LOGGED!" });
      } else {
        res.json({ status: "Not logged" });
      }
    });
  } catch (e) {
    res.json({ status: "No token" });
  }
};

controller.getUsers = async (req, res) => {
  // try {
  //   const pool = await sql.connect(_config);
  //   const tasks = await pool.request().query("SELECT * FROM users");
  //   res.status(200).json(tasks.recordsets[0]);
  // } catch (e) {
  //   res.status(404).json({ message: e.message });
  // }
};
