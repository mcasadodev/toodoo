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

const { pathname: root } = new URL("./", import.meta.url);

if (process.env.ENV === "PRO") {
  app.get("/*", function (req, res) {
    res.sendFile(path.join(root, "/client/build/index.html"));
  });
  /* Routes -
   *** MUST GO BELOW CORS SETUP ***
   */
  app.use("/users", usersRoutes);
  app.use("/panels", panelsRoutes);
  app.use("/members", membersRoutes);
  app.use("/todos", todosRoutes);
  app.use("/participants", participantsRoutes);
  app.use(cors());
} else if (process.env.ENV === "DEV") {
  /* Routes -
   *** MUST GO BELOW CORS SETUP ***
   */
  app.use("/users", usersRoutes);
  app.use("/panels", panelsRoutes);
  app.use("/members", membersRoutes);
  app.use("/todos", todosRoutes);
  app.use("/participants", participantsRoutes);
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
}

// Midlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cookieParser());
app.use(express.static(root + "/client/build"));

connectDb(app);
