const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  // console.log("Sending connection request");
  // res.send(user);
  res.send(user.firstName + " " + "sent a connection request");
});
module.exports = requestRouter;
