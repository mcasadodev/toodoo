export const config = {
  port: 1433,
  host: "localhost",
  url: "localhost:5000/todos",
  user: "SA",
  password: "Moramba007",
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
