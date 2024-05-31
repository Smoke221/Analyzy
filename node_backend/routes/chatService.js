const express = require("express");
const { askGemini } = require("../controllers/askGeminiController");
const chatRouter = express.Router();

chatRouter.post("/:id", askGemini);

module.exports = { chatRouter };
