import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

export const config = {
  //connectionLimit: 20,
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
};

export const pool = mysql.createPool(config);

// export const config = {
//   port: 1433,
//   host: "localhost",
//   url: "localhost:5000/todos",
//   user: process.env.MSSQL_USER,
//   password: process.env.MSSQL_PASSWORD,
//   server: "localhost",
//   database: "TODOO",
//   trustServerCertificate: true,
//   sql: {
//     options: {
//       trustedConnection: true,
//       enableArithAort: true,
//       instancename: "SQLSERVER",
//     },
//   },
// };
