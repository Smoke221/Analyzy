const pdfParse = require("pdf-parse");
const { docxExtractor } = require("./docxExtractor");
const fs = require("fs");
const path = require("path")
const { Buffer } = require('node:buffer');

async function detectFileType(fileFormat) {
  switch (fileFormat.toLowerCase()) {
    case "pdf":
      return "application/pdf";
    case "ppt":
      return "application/vnd.ms-powerpoint";
    case "doc":
    case "docx":
      return "application/msword";
    default:
      return "application/octet-stream";
  }
}

async function extractTextFromPdf(actualFile) {
  const data = await pdfParse(actualFile);

  const extractedText = data.text;
  //   console.log(extractedText);

  return extractedText;
}

async function extractTextFromDocx(actualFile) {
  try {
    const tempFileName = path.join(__dirname, 'temp-file.docx');
    // await fs.promises.writeFile(tempFileName, actualFile);

    const extractedText = await docxExtractor(actualFile);
    console.log(extractedText);

    // return extractedText;
  } catch (error) {
    console.error("Error extracting text from docx:", error);
    return "";
  }
}

function extractTextFromPptx(actualFile) {}

async function extractTextFromFile(actualFile, fileFormat) {
  try {
    // Detect file type
    const fileType = await detectFileType(fileFormat);

    // Extract text based on file type
    let extractedText;
    switch (fileType) {
      case "application/pdf":
        extractedText = extractTextFromPdf(actualFile);
        break;
      // case "application/msword":
      //   extractedText = extractTextFromDocx(actualFile);
      //   break;
      // case "application/vnd.ms-powerpoint":
      //   extractedText = extractTextFromPptx(actualFile);
      //   break;
      default:
        extractedText = "Unsupported file format";
    }

    return extractedText;
  } catch (error) {
    console.error(error);
    throw new Error("Error extracting text from file.");
  }
}

module.exports = { extractTextFromFile };
