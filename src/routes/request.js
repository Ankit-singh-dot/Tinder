const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const requestRouter = express.Router();
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const toUserId = req.params.toUserId;
      const fromUserId = req.user._id;
      const status = req.params.status;
      const connectionRequest = new ConnectionRequest({
        toUserId,
        fromUserId,
        status,
      });
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).send("invalid status type" + " " + status);
      }
      const ShouldIdExist = await User.findById({ _id: toUserId });
      if (!ShouldIdExist) {
        return res.status(400).send("User does not exist");
      }
      if (fromUserId == toUserId) {
        return res
          .status(400)
          .send("You can't send connection request to yourself");
      }
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { toUserId, fromUserId },
          { toUserId: fromUserId, fromUserId: toUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "connection request already exist " });
      }

      const data = await connectionRequest.save();
      res.json({
        message: "connection request send successfully",
        data,
      });
    } catch (error) {
      res.status(400).send("Error" + error.message);
    }
  }
);
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status is not allowed !" });
      }
      const connectionRequest =await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request not found" });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: "connection request" + status, data });
    } catch (error) {
      res.status(400).send("Error: " + error.message);
    }
  }
);
module.exports = requestRouter;
