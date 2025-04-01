const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();
const USER_SAFE_DATA = ["firstName", "lastName", "photoUrl", "About", "Skills"];
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    res.json({
      message: "Data fetched successfully",
      data: connectionRequest,
    });
  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
});
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // console.log(loggedInUser);

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connectionRequest.map((any) => {
      if (any.fromUserId._id.toString() === any.loggedInUser._id.toString()) {
        return any.toUserId;
      }
      return any.fromUserId;
    });
    res.json({ data });
  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
});
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser }],
    }).select("fromUserId toUserId");
    const hideUserFormFeed = new Set();
    connectionRequest.forEach((any) => {
      hideUserFormFeed.add(any.fromUserId.toString());
      hideUserFormFeed.add(any.toUserId.toString());
    });
    console.log(hideUserFormFeed);
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFormFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);
    res.send(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = userRouter;
