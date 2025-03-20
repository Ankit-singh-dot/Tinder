const adminAuth = (req, res, next) => {
  console.log("kabhi kabhi mere dil ");

  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(403).send("Access Denied");
  } else {
    next();
  }
};
module.exports = adminAuth;
