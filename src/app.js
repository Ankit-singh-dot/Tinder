const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
  console.log(req.body);

  const user = new User(req.body);
  await user.save();
  res.send("yeh lo ho gaya ");
});
// get user by emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailID: userEmail });
    res.send(user);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});
// delete user by id
app.get("/delete", async (req, res) => {
  const userid = req.body._id;
  try {
    const user = await User.findByIdAndDelete(userid);
    res.send("user successfully deleted ");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});
// update data of the user
app.patch("/user", async (req, res) => {
  const userId = req.body._id;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("done");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});
// feed api
app.get("/feed", async (req, res) => {
  const users = await User.find({});
  res.send(users);
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
