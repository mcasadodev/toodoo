import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import usersRoutes from "./routes/users.routes.js";
import panelsRoutes from "./routes/panels.routes.js";
import membersRoutes from "./routes/members.routes.js";
import todosRoutes from "./routes/todos.routes.js";
import participantsRoutes from "./routes/participants.routes.js";

import { connectDb } from "./database/connection.js";

dotenv.config();

// Initialization
const app = express();
//const path = require("node:path");

// Midlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cookieParser());

// Routes

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
app.use(cors());

connectDb(app);
