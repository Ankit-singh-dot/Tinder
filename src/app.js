const express = require("express");
const connectDB = require("./config/database");
const app = express();
connectDB()
  .then((result) => {
    console.log("db connect successfully");
    app.listen(8000, () => {
      console.log("SAY my name");
    });
  })
  .catch((err) => {
    console.error("db not connected successfully");
  });
