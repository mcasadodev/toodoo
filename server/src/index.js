import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import usersRoutes from "../routes/users.routes";
import panelsRoutes from "../routes/panels.routes";
import membersRoutes from "../routes/members.routes";
import todosRoutes from "../routes/todos.routes";
import participantsRoutes from "../routes/participants.routes";

import { connectDb } from "../database/connection";

dotenv.config();

// Initialization
const app = express();

// Midlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

if (process.env.ENV === "PRO") {
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
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

app.use(cookieParser());

// Routes
app.use("/", usersRoutes);
app.use("/panels", panelsRoutes);
app.use("/members", membersRoutes);
app.use("/todos", todosRoutes);
app.use("/participants", participantsRoutes);

connectDb(app);
