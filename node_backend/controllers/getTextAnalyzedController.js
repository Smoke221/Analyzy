const { analyzeFileData } = require("../helpers/textAIController");
const { fileModel } = require("../models/file");

async function analyzedText(req, res) {
  try {
    const id = req.params.id;

    const isFileExists = await fileModel.findOne({
      _id: id,
    });
    if (!isFileExists) {
      res.status(400).json({ message: "File does not exist." });
    }
    const extractedText = isFileExists.extractedText;
    const result = await analyzeFileData(extractedText);

    res.status(200).json({ message: "File has been analyzed.", result, isFileExists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Catch Error: Internal Server Error." });
  }
}
module.exports = { analyzedText };
