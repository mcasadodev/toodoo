import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import todosRoutes from "../routes/todos.routes";
import usersRoutes from "../routes/users.routes";

import { connectDb as connectDbMongoDb } from "../controllers/mongodb/connection.controller";
import { connectDb as connectDbSQLServer } from "../controllers/sqlserver/connection.controller";

dotenv.config();

let connectDb;
if (process.env.DATABASE === "MONGODB") connectDb = connectDbMongoDb;
else connectDb = connectDbSQLServer;

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/todos", todosRoutes);
app.use("/users", usersRoutes);

connectDb(app);
