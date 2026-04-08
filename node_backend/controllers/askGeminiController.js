const { askAboutFile } = require("../helpers/textAIController");
const { fileModel } = require("../models/file");
const { canAccessFile } = require("../helpers/fileAccess");

async function askGemini(req, res) {
  try {
    const id = req.params.id;
    const userMessage = req.body?.message;

    if (userMessage == null || !String(userMessage).trim()) {
      return res.status(400).json({ message: "message is required" });
    }

    const file = await fileModel.findById(id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    if (!canAccessFile(file, req)) {
      return res.status(403).json({ message: "Access denied." });
    }

    const text = String(userMessage).trim();
    const userEntry = {
      role: "user",
      content: text,
      createdAt: new Date(),
    };

    if (!Array.isArray(file.chatHistory)) {
      file.chatHistory = [];
    }
    file.chatHistory.push(userEntry);

    try {
      const response = await askAboutFile(file.extractedText, text);
      file.chatHistory.push({
        role: "assistant",
        content: response,
        createdAt: new Date(),
      });
      await file.save();
      return res.send(response);
    } catch (error) {
      file.chatHistory.pop();
      await file.save().catch(() => {});
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error("Error starting chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { askGemini };
