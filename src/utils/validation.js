const validation = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }  if (!validation.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }  if (
    (!validation.isStrongPassword(password))
  ) {
    throw new Error("Your password is not strong");
  }
};
module.exports = {
  validateSignUpData,
};
