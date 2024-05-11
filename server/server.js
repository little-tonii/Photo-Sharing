const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION ...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./src/app");
const mongoose = require("mongoose");

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const SERVER_PORT = process.env.SERVER_PORT;

mongoose
  .connect(DATABASE_URL.replace("<password>", DATABASE_PASSWORD))
  .then((connect) => {
    console.log("Database is successfully connected.");
  });

const server = app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLE REJECTION ...");
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
