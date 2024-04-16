const express = require("express");
const { createAccount, login } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/signup", createAccount)
userRouter.post("/login", login)

module.exports = { userRouter };
