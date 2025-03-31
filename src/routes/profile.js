const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const profileRouter = express.Router();
profileRouter.patch("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const user = req.user;
    Object.keys(req.body).forEach((k) => {
      user[k] = req.body[k];
    });
    console.log(user);
    await user.save();
    res.json({
      message: `${user.firstName}, your profile updated successfully`,
      data: user,
    });
  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
});
profileRouter.patch("/profile/forgotPassword",userAuth, async(req,res)=>{
  
})
module.exports = profileRouter;
