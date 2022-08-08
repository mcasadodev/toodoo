import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: 1433,
  host: "localhost",
  url: "localhost:5000/todos",
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: "localhost",
  database: "todos",
  trustServerCertificate: true,
  sql: {
    options: {
      trustedConnection: true,
      enableArithAort: true,
      instancename: "SQLSERVER",
    },
  },
};
