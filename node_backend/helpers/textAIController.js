const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeFileData(extractedText) {
  const analysisPrompt = `Analyze the following text:

  ${extractedText}

  **Here are some specific aspects to consider in your analysis:**

  * Summarize the key points.
  * Identify the main topic or theme.
  * Analyze the sentiment of the text (positive, negative, neutral) and suggest for improvements in a single line.

  **Please include some of the following in your response:**

  * A bulleted list of key findings. (restrict the bullet points for the top two)
  * A concise summary of the text.
  `;
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    const text = await response.text();

    return text;
  } catch (error) {
    console.error("Google Generative AI request failed:", error);
    throw error;
  }
}

async function askAboutFile(extractedText, userMessage) {
  const analysisPrompt = `Please review the following text:

  ${extractedText}

  Next, I'll ask questions, and you should respond in 1 or 2 lines.
  If a question isn't relevant to the text provided, decline it and in any way don't mention about text provided.
  
  The question I have for you is: ${userMessage}`;
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    const text = await response.text();

    return text;
  } catch (error) {
    console.error("Google Generative AI request failed:", error);
    throw error;
  }
}

module.exports = { analyzeFileData, askAboutFile };
