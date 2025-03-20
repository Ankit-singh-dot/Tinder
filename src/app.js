const express = require("express");
const app = express();
// app.use("/hello/2", (req, res) => {
//   res.send("this is me batman");
// });
// app.get("/hello", (req, res) => {
//   res.send({ firstName: "Ankit", SecondName: "Singh" });
// });
// app.post("/hello", (req, res) => {
//   res.send("data saved successfully");
// });
app.get("/hello", (req, res) => {
    console.log("this is me superman");
  res.send("this is me superman");
});
app.get("/hello/madam", (req, res) => {
    console.log("this is me ");
  res.send("this is me ");
});
app.listen(8000, () => {
  console.log("listening to the port of 8000");
});
