const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileURL: {
    type: String,
    required: true,
  },
  extractedText: {
    type: String,
    // required: true,
  },
  cachedAnalysis: {
    type: String,
  },
  analysisUpdatedAt: {
    type: Date,
  },
  chatHistory: {
    type: [chatMessageSchema],
    default: [],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  isAuthenticated: {
    type: Boolean,
    required: true,
    default: false,
  },
  requestIP: {
    type: String,
    // required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const fileModel = mongoose.model("File", fileSchema);

module.exports = { fileModel };
