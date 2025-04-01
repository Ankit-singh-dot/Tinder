const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cookieParse = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParse());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// get user by emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    res.send(user);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});
app.get("/delete", async (req, res) => {
  const userid = req.body._id;
  try {
    const user = await User.findByIdAndDelete(userid);
    res.send("user successfully deleted ");
  } catch (error) {
    res.send(400).send("something went wrong");
  }
});
// update user by id
app.patch("/update/:_id", async (req, res) => {
  const userId = req.params?._id;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      // "_id",
      "photoUrl",
      "About",
      "Gender",
      "Age",
      "Skills",
      // "password",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("done");
  } catch (error) {
    res.status(400).send(error.message);
  }
});
connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(4000, () => {
      console.log("listing to the port 4000");
    });
  })
  .catch(() => {
    console.error("unable to connect to the database ");
  });
