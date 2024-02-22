const jwt = require("jsonwebtoken");

const generateToken = (res, name) => {
  const token = jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  //   res.cookie("jwt", token, {
  //     path: "/",
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: "none",
  //     maxAge: 1000 * 60 * 60 * 24,
  //     domain: ".netlify.app",
  //   });
  return token;
};

module.exports = generateToken;
