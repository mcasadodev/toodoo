import mysql from "mysql";
import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

import { config } from "./config.js";

const PORT = process.env.PORT || 5000;

export const pool = createPool(config);

//let _connection;
export const connectDb = (app) => {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

  //_connection = mysql.createConnection(config);

  //_connection.on("error", connectDb(app));

  // function handleDisconnect() {
  //   const connection = mysql.createConnection(config); // Recreate the connection, since
  //   // the old one cannot be reused.
  //   connection.connect(function (err) {
  //     // The server is either down
  //     if (err) {
  //       // or restarting (takes a while sometimes).
  //       console.log("error when connecting to db:", err);
  //       setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
  //     } // to avoid a hot loop, and to allow our node script to
  //   }); // process asynchronous requests in the meantime.
  //   // If you're also serving http, display a 503 error.
  //   connection.on("error", function (err) {
  //     console.log("db error", err);
  //     if (err.code === "PROTOCOL_CONNECTION_LOST") {
  //       // Connection to the MySQL server is usually
  //       handleDisconnect(); // lost due to either server restart, or a
  //     } else {
  //       // connnection idle timeout (the wait_timeout
  //       throw err; // server variable configures this)
  //     }
  //   });
  // }
  // handleDisconnect();
};
