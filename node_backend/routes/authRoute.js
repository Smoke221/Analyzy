const express = require("express");
const { tokenCookieOptions } = require("../configurations/authTokenCookie");

const authRouter = express.Router();

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", tokenCookieOptions);
  res.status(200).json({ message: "Logged out." });
});

module.exports = { authRouter };
