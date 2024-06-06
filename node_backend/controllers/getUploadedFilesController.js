const { fileModel } = require("../models/file");

async function getFiles(req, res) {
  try {
    const userId = req.userID;

    if (!userId) {
      const userIp = req.clientIp;
      const files = await fileModel.find({
        isAuthenticated: false,
        requestIP: userIp,
      });

      res.status(200).json({ message: "Files of guest user.", files });
    } else {
      const files = await fileModel.find({
        owner: userId,
      });

      res
        .status(200)
        .json({ message: "Retrieved all the uploaded files.", files });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Catch Error: Internal Server Error." });
  }
}

module.exports = { getFiles };
