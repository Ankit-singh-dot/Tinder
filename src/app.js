const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
app.post("/signup", async (req, res) => {
  const id = {
    firstName: "Ankit",
    secondName: "singh",
    emailID: "@chala_ja_bsdk",
  };
  const user = new User(id);
  await user.save();
  res.send("yeh lo ho gaya ");
});
connectDB()
  .then(() => {
    console.log("database connection done ");
    app.listen(8000, () => {
      console.log("this is me listening from the port 8000");
    });
  })
  .catch((err) => {
    console.error("connection lost ");
  });
