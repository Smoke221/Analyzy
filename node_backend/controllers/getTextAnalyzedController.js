const { analyzeFileData } = require("../helpers/textAIController");
const { fileModel } = require("../models/file");

async function analyzedText(req, res) {
  try {
    const isFileExists = await fileModel.findOne({ fileName: "sample.pdf" });
    if (!isFileExists) {
      res.status(400).json({ message: "File does not exist." });
    }
    const extractedText = isFileExists.extractedText;
    const result = await analyzeFileData(extractedText);

    res.status(200).json({ message: "File has been analyzed.", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Catch Error: Internal Server Error." });
  }
}
module.exports = { analyzedText };
