import jwt from "jsonwebtoken";

//import { User } from "../../models/user.model";
import { pool } from "../connection.js";
import { encryptPassword, matchPassword } from "./auth.controller.js";

export const controller = {};

controller.signIn = async (req, res) => {
  const errors = [];
  try {
    const [result] = await pool.query(
      `SELECT * FROM users WHERE email LIKE '${req.body.email}'`
    );
    if (!result[0]) {
      errors.push({ text: "User or password do not match" });
      res.send({ errors });
    } else {
      const match = await matchPassword(req.body.password, result[0].password);
      if (match) {
        const { id } = result[0];
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 3000,
        });

        //req.session.user = user.recordset[0];
        //req.session.save();

        res.cookie("token", token, {
          httpOnly: false,
        });

        res.json({ auth: true, token, result: result[0] });
      } else {
        errors.push({ text: "User or password do not match" });
        res.send({ errors });
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
  if (!req.body.name) {
    errors.push({ text: "User must have a name" });
  }
  if (req.body.password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters" });
  }
  if (req.body.password != req.body.confirmPassword) {
    errors.push({ text: "Passwords do not match" });
  }
  if (errors.length > 0) {
    res.send({ errors });
  } else {
    try {
      const pwd = await encryptPassword(req.body.password);
      const [result] = await pool.query(
        `SELECT * FROM users WHERE email LIKE '${req.body.email}'`
      );

      if (result[0]) {
        if (result[0].name) {
          messages.push({ text: "Email already exists" });
          const obj = { errors: messages };
          res.send(obj);
        }
      } else {
        //SUCCESS
        await pool.query(
          `INSERT INTO 
                users 
                 (name, email, password)
                 VALUES (?, ?, ?)`,
          [req.body.name, req.body.email, pwd]
        );
        messages.push({
          text: "Your new user has been created. Sign in!",
        });
        res.send({ messages });
        //res.send(messages).redirect("../");
      }
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
