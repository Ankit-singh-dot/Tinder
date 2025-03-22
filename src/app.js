const express = require("express");
const User = require("./models/user");
const connectDB = require("./config/database");

const app = express();
app.use(express.json()); 
app.post("/signup", async (req, res) => {
 
  // creating a user instance of user model
  const user = new User(
    {firstName: "ankit",
    lastName: "singh",
    emailId: "hat_na_laude",}
  );
  await user.save();
  res.send("user successfully");
});
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
