const express = require("express");
const fileUpload = require("express-fileupload");
const { handleFileUploads } = require("../controllers/handleFileController");
const { analyzedText } = require("../controllers/getTextAnalyzedController");

const analyzeFileRouter = express.Router();
analyzeFileRouter.use(fileUpload());

analyzeFileRouter.post("/upload", handleFileUploads);

analyzeFileRouter.get("/analyz", analyzedText);

module.exports = { analyzeFileRouter };
