const express = require("express");
const app = express();
app.use("/namaste",(req, res) => {
  res.send("this is me ");
});
app.use("/never",(req, res) => {
  res.send("always");
});
app.use("/hello",(req, res) => {
  res.send("hello hello hello ");
});
app.listen(3000, () => {
  console.log("listening to the port 3000");
});
