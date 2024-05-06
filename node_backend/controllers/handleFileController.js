const AWS = require("aws-sdk");
const { fileModel } = require("../models/file");
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
    // console.log(uploadedFile);

    // Upload the file to S3
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: uploadedFile.name,
      Body: uploadedFile.data,
    };

    const s3UploadResponse = await s3.upload(params).promise();

    // Ensure that s3UploadResponse.Location is defined
    if (!s3UploadResponse.Location) {
      return res
        .status(500)
        .json({ message: "Internal Server Error. S3 Location is undefined." });
    }

     const newFile = new fileModel({
        fileName: uploadedFile.name,
        fileURL: s3UploadResponse.Location,
        owner: req.body.userID,
      });
  
      await newFile.save();

    res.status(200).json({ message: "File uploaded successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Catch Error: Internal Server Error." });
  }
}

module.exports = { handleFileUploads };
