const express = require("express");
const passport = require("passport");
const GoogleStartegy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require("uuid");
const { userModel } = require("../models/user");
const { tokenCookieOptions } = require("../configurations/authTokenCookie");

require("dotenv").config();

const googleRouter = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL;

googleRouter.get(
  "/",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

googleRouter.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: FRONTEND_URL ? `${FRONTEND_URL}/auth?error=google` : "/",
    session: false,
  }),
  async function (req, res) {
    try {
      let user = req.user;
      const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("token", token, tokenCookieOptions);
      const redirectBase = FRONTEND_URL || "https://analyzy.vercel.app";
      res.redirect(`${redirectBase}/?userName=${encodeURIComponent(user.name)}`);
    } catch (err) {
      console.error("Error in Google OAuth callback:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

passport.use(
  new GoogleStartegy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_callbackURL,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, cb) {
      let email = profile._json.email;
      let existedUserData = await userModel.findOne({
        email,
        provider: "google",
      });
      if (existedUserData) {
        return cb(null, existedUserData);
      }
      let name = profile._json.name;

      const user = new userModel({
        name,
        email,
        password: uuidv4(),
        provider: profile.provider,
      });
      await user.save();
      return cb(null, user, {userName: name});
    }
  )
);

module.exports = { googleRouter };
