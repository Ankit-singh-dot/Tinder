const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailID: {
    type: String,
  },
});
module.exports = mongoose.model("user", userSchema);
