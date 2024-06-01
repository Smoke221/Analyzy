const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

async function analyzeFileData(extractedText) {
  const analysisPrompt = generateAnalysisPrompt(extractedText);
  try {
    const result = await generativeModel.generateContent(analysisPrompt);
    return await result.response.text();
  } catch (error) {
    console.error("Google Generative AI request failed:", error);
    throw error;
  }
}

async function askAboutFile(extractedText, userMessage) {
  const reviewPrompt = generateReviewPrompt(extractedText, userMessage);
  try {
    const result = await generativeModel.generateContent(reviewPrompt);
    return await result.response.text();
  } catch (error) {
    console.error("Google Generative AI request failed:", error);
    throw error;
  }
}

function generateAnalysisPrompt(extractedText) {
  return `
    Analyze the following text:
    
    ${extractedText}
    
    **Here are some specific aspects to consider in your analysis:**
    
    * Summarize the key points.
    * Identify the main topic or theme.
    * Analyze the sentiment of the text (positive, negative, neutral) and suggest for improvements in a single line.
    
    **Please include some of the following in your response:**
    
    * A bulleted list of key findings. (restrict the bullet points for the top two)
    * A concise summary of the text.
  `;
}

function generateReviewPrompt(extractedText, userMessage) {
  return `
    Take a moment to review the following passage:

    ${extractedText}

    Get ready for some questions! Respond briefly, in 1 or 2 lines. If a question doesn't apply, just skip it.

    Here's your first question: ${userMessage}
  `;
}

module.exports = { analyzeFileData, askAboutFile };
