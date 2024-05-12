const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function analyzeFileData(extractedText) {
  const textReceived = extractedText;

  const analysisPrompt = `Analyze the following text:

  ${textReceived}

  **Here are some specific aspects to consider in your analysis:**

  * Summarize the key points.
  * Identify the main topic or theme.
  * Analyze the sentiment of the text (positive, negative, neutral) and suggest for improvements in a single line.

  **Please include some of the following in your response:**

  * A bulleted list of key findings. (restrict the bullet points for the top two)
  * A concise summary of the text.
  `;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    const text = await response.text();

    return text;
  } catch (error) {
    console.error("Google Generative AI request failed:", error);
    throw error;
  }
}

module.exports = { analyzeFileData };
