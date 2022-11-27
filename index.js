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
app.use("/", usersRoutes);
app.use("/", panelsRoutes);
app.use("/", membersRoutes);
app.use("/", todosRoutes);
app.use("/", participantsRoutes);

if (process.env.ENV === "PRO") {
  app.use(cors());
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else if (process.env.ENV === "DEV") {
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
}

connectDb(app);
