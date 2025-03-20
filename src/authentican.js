const express = require("express");
const app = express();
const adminAuth = require("./middlewares/auth");
app.use("/admin", adminAuth);
app.get("/admin/getAllUserData", (req, res) => {
  res.send("this is done");
});
app.listen(6969, (req,res) => {
  console.log("listening ot the port 6969");
});
