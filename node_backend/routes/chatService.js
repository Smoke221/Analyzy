const express = require("express");
const { optionalAuth } = require("../middlewares/optionalAuth");
const { askGemini } = require("../controllers/askGeminiController");
const chatRouter = express.Router();

chatRouter.post("/:id", optionalAuth, askGemini);

module.exports = { chatRouter };
