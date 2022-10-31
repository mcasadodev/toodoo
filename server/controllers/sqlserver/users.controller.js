import jwt from "jsonwebtoken";
import mssql from "mssql";

import { User } from "../../models/sqlserver/user.model";
import { config } from "./config";
import bcrypt from "bcrypt";

const sql = mssql;
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
    const pool = await sql.connect(_config);
    const user = await pool
      .request()
      //.input("email", sql.NVarChar, req.body.email)
      .query(
        `SELECT * FROM users WHERE email LIKE '${req.body.email}'`
        //`SELECT * FROM users WHERE email LIKE '${req.body.email}'`
      );

    if (!user.recordset[0].name) {
      errors.push({ text: "User not found" });
    }
    if (errors.length > 0) {
      res.send(errors);
    } else {
      const match = await matchPassword(
        req.body.password,
        user.recordset[0].password
      );
      if (match) {
        const id = user.recordset[0].id;
        const token = jwt.sign({ id }, "jwtSecret", {
          expiresIn: 300,
        });
        req.session.user = user.recordset[0];
        req.session.save();
        res.json({ auth: true, token, result: user.recordset[0] });
      } else {
        res.json({ auth: false });
      }
    }
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
    res.send(errors);
  } else {
    try {
      const pool = await sql.connect(_config);
      const emailUser = await pool
        .request()
        .input("email", sql.NVarChar, req.body.email)
        .query(`SELECT * FROM users WHERE email LIKE '${req.body.email}'`);

      if (emailUser.recordset[0].name) {
        messages.push({ text: "Email already exists" });
        res.send(messages);
      } else {
        //SUCCESS
        const pwd = await encryptPassword(req.body.password);

        await pool
          .request()
          .input("name", sql.NVarChar, req.body.name)
          .input("email", sql.NVarChar, req.body.email)
          .input("password", sql.NVarChar, pwd)
          .query(
            `INSERT INTO 
            users 
             (name, email, password)
             VALUES ( @name, @email, @password)`
          );

        messages.push({ text: "New user created" });
        res.send(messages);
        //res.send(messages).redirect("../");
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};

controller.logOut = async (req, res) => {
  try {
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
