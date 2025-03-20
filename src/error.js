const express = require("express");
const app = express();
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});
app.get("/getUserData", (req, res) => {
  throw new Error("aeeetormaikechodo");
  res.send("user data send ");
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});
app.listen(6979, (req, res) => {
  console.log("people you know to people you don't");
});
