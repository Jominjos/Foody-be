const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  console.log("from auth headers:", req.headers);

  let token;
  token = req.headers.token;
  //console.log(req.headers.accesstoken);
  //console.log(token);
  if (token) {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);

      let userdata = await User.find({ name: decoded.name }).select(
        "-password"
      );

      req.user = userdata[0];
      console.log("from authmiddleware", req.user);
      next();
    } catch {
      res.json({ message: "crash" });
    }
  } else {
    res.json({ message: "please login", headers: req.headers });
  }
});

module.exports = protect;
