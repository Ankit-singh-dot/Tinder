const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);
    // encrypting the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

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
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error(" invalid credential");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // creating a JWT token
      const token = await user.getJWT();
      // console.log(token);

      res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.send("Login successfully");
    } else {
      throw new Error("invalid credential");
    }
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});
module.exports = authRouter;
