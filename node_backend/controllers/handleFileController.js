const AWS = require("aws-sdk");
const { fileModel } = require("../models/file");
const { extractTextFromFile } = require("../helpers/textExtractor");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

// Create an S3 instance
const s3 = new AWS.S3();

async function handleFileUploads(req, res) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }
    const uploadedFile = req.files.uploadedFile;
    const fileFormat = uploadedFile.name.split(".").pop().toLowerCase();
    let contentType;
    switch (fileFormat) {
      case "pdf":
        contentType = "application/pdf";
        break;
      case "ppt":
        contentType = "application/vnd.ms-powerpoint";
        break;
      case "doc":
      case "docx":
        contentType = "application/msword";
        break;
      default:
        contentType = "application/octet-stream";
    }

    // Set ContentDisposition header to inline with filename
    const contentDisposition = `inline; filename="${uploadedFile.name}"`;

    // Upload the file to S3 with appropriate content type
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: uploadedFile.name,
      Body: uploadedFile.data,
      ContentType: contentType,
      ContentDisposition: contentDisposition,
    };

    const s3UploadResponse = await s3.upload(params).promise();

    // Ensure that s3UploadResponse.Location is defined
    if (!s3UploadResponse.Location) {
      return res
        .status(500)
        .json({ message: "Internal Server Error. S3 Location is undefined." });
    }

    // Extract text from the uploaded file
    const extractedText = await extractTextFromFile(
      uploadedFile,
      fileFormat
    );

    const newFile = new fileModel({
      fileName: uploadedFile.name,
      fileURL: s3UploadResponse.Location,
      owner: req.body.userID,
      extractedText: extractedText,
    });

    await newFile.save();

    res.status(200).json({ message: "File uploaded successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Catch Error: Internal Server Error." });
  }
}

module.exports = { handleFileUploads };
