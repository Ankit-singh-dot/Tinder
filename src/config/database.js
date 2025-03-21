const mongoose = require("mongoose");
const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://Ankit_dev:Ankit123@cluster0.npet0.mongodb.net/Tinder"
  );
};
module.exports = connectDB;
