const express = require("express");
const { startChat, askGemini } = require("../controllers/askGeminiController");
const chatRouter = express.Router();

chatRouter.post("/:id", startChat);
chatRouter.post("/", askGemini);

module.exports = { chatRouter };
