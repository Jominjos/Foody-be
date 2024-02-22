const express = require("express");
const User = require("../controller/userController");
const SignUp = require("../controller/signupController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

//user Routes
router.post("/", SignUp.createUser);
router.post("/auth", User.authUser);
router.post("/logout", User.logoutUser);
router.get("/verify/:token", SignUp.mailVerify);
router
  .route("/profile")
  .get(protect, User.getUser)
  .put(protect, User.updateUser);

// .post(protect, User.addToCart)
//.delete(protect, User.delFromCart);

module.exports = router;
