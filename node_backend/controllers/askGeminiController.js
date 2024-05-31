const {
  sendMessageToBard,
  startChatWithContext,
  chatWithAI,
} = require("../helpers/chatAI");
const { fileModel } = require("../models/file");

async function startChat(req, res) {
  try {
    const id = req.params.id;

    const userMessage = req.body.message;

    const fileData = await fileModel.findOne({
      _id: id,
    });
    if (!fileData) {
      return res.status(404).json({ message: "File not found" });
    }

    const context = fileData.extractedText;
    try {
        const response = await chatWithAI(context, userMessage);
        res.send(response); // Send response back to user (optional)
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
  } catch (error) {
    console.error("Error starting chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function askGemini(req, res) {
  const { question } = req.body;
  const chat = req.session.chat;

  if (!chat) {
    return res.status(400).json({ message: "Chat has not been initialized." });
  }

  try {
    const response = await sendMessageToBard(chat, question);
    const text = await response.text();
    res.json({ answer: text });
  } catch (error) {
    console.error("Error getting answer from Bard:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { startChat, askGemini };
