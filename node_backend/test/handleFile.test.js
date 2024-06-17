const { handleFileUploads } = require("../controllers/handleFileController");
const { fileModel } = require("../models/file");
const { extractTextFromFile } = require("../helpers/textExtractor");
const { AWS } = require("../configurations/aws");

jest.mock("../models/file");
jest.mock("../helpers/textExtractor");
jest.mock("../configurations/aws");

describe("handleFileUploads", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      files: {
        uploadedFile: {
          name: "test.pdf",
          data: Buffer.from("test data"),
        },
      },
      userID: "12345",
      clientIp: "127.0.0.1",
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    AWS.S3.mockImplementation(() => {
      return {
        upload: jest.fn().mockReturnThis(),
        promise: jest.fn().mockResolvedValue({
          Location: "https://s3.amazonaws.com/bucket/test.pdf",
        }),
      };
    });

    extractTextFromFile.mockResolvedValue("Extracted text from the file.");
    fileModel.mockImplementation(() => {
      return {
        save: jest.fn().mockResolvedValue(true),
      };
    });
  });

  it("should upload a file and save file details to the database", async () => {
    await handleFileUploads(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Files uploaded successfully.",
    });

    expect(AWS.S3().upload).toHaveBeenCalledWith({
      Bucket: process.env.BUCKET_NAME,
      Key: req.files.uploadedFile.name,
      Body: req.files.uploadedFile.data,
      ContentType: "application/pdf",
      ContentDisposition: 'inline; filename="test.pdf"',
    });

    expect(extractTextFromFile).toHaveBeenCalledWith(
      req.files.uploadedFile.data,
      "pdf"
    );

    expect(fileModel).toHaveBeenCalledWith({
      fileName: req.files.uploadedFile.name,
      fileURL: "https://s3.amazonaws.com/bucket/test.pdf",
      owner: req.userID,
      isAuthenticated: true,
      requestIP: undefined,
      extractedText: "Extracted text from the file.",
    });

    expect(fileModel().save).toHaveBeenCalled();
  });

  it("should return an error if no files are uploaded", async () => {
    req.files = null;

    await handleFileUploads(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "No files were uploaded.",
    });
  });

  it("should handle internal server errors", async () => {
    AWS.S3().promise.mockRejectedValue(new Error("S3 upload error"));

    await handleFileUploads(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Catch Error: Internal Server Error.",
    });
  });
});
