const express = require("express");
const passport = require("passport");
const GoogleStartegy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require("uuid");
const { userModel } = require("../models/user");

require("dotenv").config();

const googleRouter = express.Router();

googleRouter.get(
  "/",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

googleRouter.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    let user = req.user;
    const token = jwt.sign({ userID: user._id }, "secret", {
      expiresIn: "1hr",
    });
    // Successful authentication, redirect home.
    res.redirect("/");
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
      let existedUserData = await userModel.findOne({ email, provider: "google" });
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
      return cb(null, user);
    }
  )
);

module.exports = { googleRouter };
