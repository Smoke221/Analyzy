const express = require("express");
const fileUpload = require("express-fileupload");
const { handleFileUploads } = require("../controllers/handleFileController");
const { analyzedText } = require("../controllers/getTextAnalyzedController");
const { getFiles } = require("../controllers/getUploadedFilesController");

const analyzeFileRouter = express.Router();
analyzeFileRouter.use(fileUpload());

analyzeFileRouter.post("/upload", handleFileUploads);

analyzeFileRouter.get("/files", getFiles)

analyzeFileRouter.get("/analyz/:id", analyzedText);

module.exports = { analyzeFileRouter };
