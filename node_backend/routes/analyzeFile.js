const express = require("express");
const fileUpload = require("express-fileupload");
const { handleFileUploads } = require("../controllers/handleFileController");

const analyzeFileRouter = express.Router();
analyzeFileRouter.use(fileUpload())

analyzeFileRouter.post("/upload", handleFileUploads)

module.exports = { analyzeFileRouter };
