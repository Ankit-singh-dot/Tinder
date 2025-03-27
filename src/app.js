const express = require("express");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const cookieParse = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { validateSignUpData } = require("./utils/validation");
const app = express();
app.use(express.json());
app.use(cookieParse());

app.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);
    // encrypting the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("data added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
  // await user.save();
  // res.send("data added successfully");
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error(" invalid credential");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // creating a JWT token
      const token = await jwt.sign({ _id: user._id }, "AnkitSingh@123");
      console.log(token);

      res.cookie("token", token);
      res.send("Login successfully");
    } else {
      throw new Error("invalid credential");
    }
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});
app.get("/profile", async (req, res) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;
    if (!token) {
      throw new Error("invalid Token");
    }
    // validate this token
    const decodedMessage = await jwt.verify(token, "AnkitSingh@123");
    console.log(decodedMessage);
    const { _id } = decodedMessage;
    console.log("Logged in user is :" + _id);
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user doesn't exist");
    }
    // console.log(cookie);
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
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
