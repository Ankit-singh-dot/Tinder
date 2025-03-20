const express = require("express");
const app = express();
app.use(
  (req, res, next) => {
    res.send("i am iron man");
    console.log("this is tony stark ");
    next();
  },
  (req, res) => {
    res.send("kya re land ke");
  }
);
app.listen(3000, () => {
  console.log("sun raha hu bkl 3000 port pe");
});
