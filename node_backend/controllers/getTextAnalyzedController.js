const { analyzeFileData } = require("../helpers/textAIController");
const { fileModel } = require("../models/file");
const { canAccessFile, toPublicFile } = require("../helpers/fileAccess");

async function analyzedText(req, res) {
  try {
    const id = req.params.id;
    const forceRefresh =
      req.query.refresh === "1" ||
      req.query.refresh === "true" ||
      req.query.refresh === "yes";

    const file = await fileModel.findById(id);
    if (!file) {
      return res.status(400).json({ message: "File does not exist." });
    }

    if (!canAccessFile(file, req)) {
      return res.status(403).json({ message: "Access denied." });
    }

    let result;
    let fromCache = false;

    if (file.cachedAnalysis && !forceRefresh) {
      result = file.cachedAnalysis;
      fromCache = true;
    } else {
      result = await analyzeFileData(file.extractedText);
      file.cachedAnalysis = result;
      file.analysisUpdatedAt = new Date();
      await file.save();
    }

    res.status(200).json({
      message: fromCache ? "Cached analysis." : "File has been analyzed.",
      result,
      fromCache,
      chatHistory: file.chatHistory || [],
      isFileExists: toPublicFile(file),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Catch Error: Internal Server Error." });
  }
}

module.exports = { analyzedText };
