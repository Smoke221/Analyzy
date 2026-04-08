const express = require("express");
const fileUpload = require("express-fileupload");
const { optionalAuth } = require("../middlewares/optionalAuth");
const { handleFileUploads } = require("../controllers/handleFileController");
const { analyzedText } = require("../controllers/getTextAnalyzedController");
const { getFiles } = require("../controllers/getUploadedFilesController");
const { deleteFile } = require("../controllers/deleteFileController");

const analyzeFileRouter = express.Router();
analyzeFileRouter.use(fileUpload());

analyzeFileRouter.post("/upload", optionalAuth, handleFileUploads);

analyzeFileRouter.get("/files", optionalAuth, getFiles);

analyzeFileRouter.get("/analyz/:id", optionalAuth, analyzedText);

analyzeFileRouter.delete("/delete/:id", optionalAuth, deleteFile);

module.exports = { analyzeFileRouter };
