const validation = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }
  if (!validation.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
  if (!validation.isStrongPassword(password)) {
    throw new Error("Your password is not strong");
  }
};
const validateEditProfileData = (req) => {
  const allowedEditFiled = [
    "firstName",
    "lastName",
    "photoUrl",
    "About",
    "Age",
    "Skills",
  ];
  const isAllowedEdit = Object.keys(req.body).every((k) =>
    allowedEditFiled.includes(k)
  );
  return isAllowedEdit;
};
module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
