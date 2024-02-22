const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const VerifyUser = require("../models/verifyModel");
const generateToken = require("../utils/generateToken");
const sendMail = require("../utils/sendMail");
const path = require("path");
const verifyFilePath = path.join(__dirname, "..", "public", "verified.html");
module.exports = {
  //CREATE USER
  createUser: asyncHandler(async (req, res, next) => {
    try {
      const userData = req.body;

      // Check if the email address already exists
      const existingEmailUser = await User.findOne({ email: userData.email });
      if (existingEmailUser) {
        return res.status(400).json({ error: "Email address already in use" });
      }

      // Check if the username already exists
      const existingUsernameUser = await User.findOne({ name: userData.name });
      if (existingUsernameUser) {
        return res.status(400).json({ error: "Username already in use" });
      }
      const verificationPending = await VerifyUser.findOne({
        email: userData.email,
      });
      if (verificationPending) {
        return res
          .status(400)
          .json({ error: "verification mail already sent" });
      }
      const token = await generateToken(res, userData.email);
      const verifyUser = await { ...req.body, token };
      const dbdata = await VerifyUser.create(verifyUser);
      await sendMail(
        userData.email,
        "SignUp Verification",
        `
        <h2 > FOODY EMAIL VERIFICATION</h2>
        <h3>Dear User,</h3>

        <h3> We hope this message finds you well. To ensure the security of your account, we require you to verify your sign-in attempt.</h3>
        
        <a href="https://foody-be.onrender.com/api/user/verify/${token}">👉Click to verify</a>
        `
      );
      res.status(200).json({ message: "Check inbox or Spam Folder" });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "User creation failed" });
    }
  }),
  mailVerify: asyncHandler(async (req, res) => {
    try {
      const tokRecieved = req.params.token;
      console.log(tokRecieved);

      const dbdata = await VerifyUser.findOne({ token: tokRecieved });

      if (dbdata) {
        const userDetails = { ...dbdata._doc };
        delete userDetails._id;
        delete userDetails.__v;
        delete userDetails.token;
        console.log(userDetails);
        const userCreated = await User.create(userDetails);
        const delUser = await VerifyUser.deleteOne({ token: tokRecieved });
        res.sendFile(verifyFilePath);
        // console.log(delUser);
        // console.log(userCreated);
        // console.log(dbdata);
      } else {
        res.redirect("http://localhost:6003/login");
      }
    } catch (e) {
      console.log(e);
      res.json({ error: e });
    }
  }),
};
