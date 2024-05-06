const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileURL: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const fileModel = mongoose.model("File", fileSchema);

module.exports = { fileModel };
