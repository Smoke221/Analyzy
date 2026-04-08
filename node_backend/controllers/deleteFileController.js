const { fileModel } = require("../models/file");
const { canAccessFile } = require("../helpers/fileAccess");

async function deleteFile(req, res) {
  try {
    const id = req.params.id;

    const file = await fileModel.findById(id);

    if (!file) {
      return res.status(404).json({ message: "File not found." });
    }

    if (!canAccessFile(file, req)) {
      return res.status(403).json({ message: "Access denied." });
    }

    await fileModel.findByIdAndDelete(id);
    res.status(200).json({ message: "File deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Catch Error: Internal Server Error." });
  }
}

module.exports = { deleteFile };
