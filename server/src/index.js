import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
//import session from "express-session";

import usersRoutes from "../routes/users.routes";
import panelsRoutes from "../routes/panels.routes";
import todosRoutes from "../routes/todos.routes";

import { connectDb as connectDbMongoDb } from "../controllers/mongodb/connection.controller";
import { connectDb as connectDbSQLServer } from "../controllers/sqlserver/connection.controller";

dotenv.config();

let connectDb;
if (process.env.DATABASE === "MONGODB") connectDb = connectDbMongoDb;
else connectDb = connectDbSQLServer;

// Initialization
const app = express();

// Midlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// app.use(
//   session({
//     key: "user-id",
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       expires: 60 * 60 * 24, // 24 hours
//       httpOnly: false,
//     },
//   })
// );

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

// Routes
app.use("/", usersRoutes);
app.use("/panels", panelsRoutes);
app.use("/todos", todosRoutes);

connectDb(app);
