const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      // index: true,
      unique: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    lastName: String,
    emailId: {
      type: String,
      required: true,
      // index: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address" + value);
        }
      },
    },
    relationshipStatus: String,
    photoUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?t=st=1742851179~exp=1742854779~hmac=01f1c879c031ac3c977f62bb0774fedeeb6f068b617a4aa2c6bce9a1f28ac4cd&w=1380",
    },
    Skills: {
      type: [String],
    },
    About: {
      type: String,
      default: "this is the default about of the user",
    },
    Gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender data is not valid ");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
