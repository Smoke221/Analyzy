const { askAboutFile } = require("../helpers/textAIController");
const { fileModel } = require("../models/file");

async function askGemini(req, res) {
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
      const response = await askAboutFile(context, userMessage);
      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error("Error starting chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { askGemini };
