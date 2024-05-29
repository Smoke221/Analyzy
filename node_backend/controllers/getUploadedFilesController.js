const { fileModel } = require("../models/file");

async function getFiles(req, res) {
  try {
    const userId = req.body.userID;

    const files = await fileModel.find({ owner: userId });

    res
      .status(200)
      .json({ message: "Retrieved all the uploaded files.", files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Catch Error: Internal Server Error." });
  }
}

module.exports = { getFiles };
