const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Ankit_dev:Ankit123@cluster0.npet0.mongodb.net/DEV_TINDER"
  );
};
module.exports = connectDB;
