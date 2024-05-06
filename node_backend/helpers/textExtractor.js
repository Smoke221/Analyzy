const { Document, Packer } = require("docx");
const { Presentation } = require("pptxgenjs");
const pdfParse = require("pdf-parse");

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

async function extractTextFromPdf(fileBuffer) {
  const data = await pdfParse(fileBuffer);

  const extractedText = data.text;
//   console.log(extractedText);

  return extractedText;
}

function extractTextFromDocx(fileBuffer) {
  const doc = new Document();
  doc.load(fileBuffer);
  const extractedText = doc.getRawText();
  return extractedText;
}

function extractTextFromPptx(fileBuffer) {
  const prs = new Presentation();
  prs.load(fileBuffer);
  let text = "";
  prs.slides.forEach((slide) => {
    slide.getContent().forEach((content) => {
      text += content.text + "\n";
    });
  });
  return text;
}

async function extractTextFromFile(fileBuffer, fileFormat) {
  try {
    // Detect file type
    const fileType = await detectFileType(fileFormat);

    // Extract text based on file type
    let extractedText;
    switch (fileType) {
      case "application/pdf":
        extractedText = extractTextFromPdf(fileBuffer);
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        extractedText = extractTextFromDocx(fileBuffer);
        break;
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        extractedText = extractTextFromPptx(fileBuffer);
        break;
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
