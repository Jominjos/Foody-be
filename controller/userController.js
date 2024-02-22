const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const VerifyUser = require("../models/verifyModel");
const generateToken = require("../utils/generateToken");

module.exports = {
  //USER AUTHENTICATION
  authUser: asyncHandler(async (req, res, next) => {
    //console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //console.log(user);
    if (user && (await user.matchPasswords(password))) {
      let token = generateToken(res, user.name);
      let username = user.name;
      let role = user.role;

      res.status(200).json({
        message: "login success",
        token: token,
        username: username,
        role: role,
      });
    } else {
      res.status(401).json({ error: "email or password is incorrect" });
    }
  }),
  //

  //
  //UPDATE USER PUT
  updateUser: asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: req.user });
  }),
  // Get cart

  //Logout user

  logoutUser: asyncHandler(async (req, res, next) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "User logout success" });
  }),
  // GET USER
  getUser: asyncHandler(async (req, res, next) => {
    res.json({
      message: {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }),

  mailVerify: asyncHandler(async (req, res) => {
    try {
      const tokRecieved = req.params.token;
      console.log(tokRecieved);
      res.status(200).json({ message: "mail verified successfully" });
      const dbdata = await VerifyUser.findOne({ token: tokRecieved });
      const userCreated = await User.create({
        name: dbdata.name,
        email: dbdata.email,
        password: dbdata.password,
      });
      console.log(userCreated);
      console.log(dbdata);
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  }),
};
