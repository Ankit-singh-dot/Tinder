const express = require("express");
const app = express();
// app.use("/hello/2", (req, res) => {
//   res.send("this is me batman");
// });
app.get("/hello", (req, res) => {
  res.send({ firstName: "Ankit", SecondName: "Singh" });
});
app.post("/hello", (req, res) => {
  res.send("data saved successfully");
});
app.use("/hello", (req, res) => {
  res.send("this is me superman");
});
app.listen(8000, () => {
  console.log("listening to the port of 8000");
});
