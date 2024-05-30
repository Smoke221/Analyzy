const { fileModel } = require("../models/file");

async function deleteFile(req, res) {
  try {
    const id = req.params.id;

    const doesFileExist = await fileModel.findById(id);

    if (!doesFileExist) {
      return res.status(404).json({ message: "File not found." });
    }

    await fileModel.findByIdAndDelete(id);
    res.status(200).json({ message: "File deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Catch Error: Internal Server Error." });
  }
}

module.exports = { deleteFile };
