const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generativeModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
});

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
  Imagine you're tasked with analyzing a document for a comprehensive understanding. Below is the text you'll be analyzing. Your goal is to provide a thorough analysis covering various aspects. Here's what we need:

  Summarization: Summarize the main points and arguments presented in the document.
  
  Topic Identification: Identify the primary topic or theme of the document. What is it mainly about?
  
  Sentiment Analysis: Analyze the overall sentiment conveyed in the document (positive, negative, neutral). Offer insights on the tone and any emotional nuances.
  
  Key Findings: List the most significant findings or insights extracted from the document. Focus on the top two discoveries.
  
  Recommendations: Based on the document's content, suggest any recommendations or actions that should be considered.
  
  Critical Analysis: Provide a critical assessment of the document, highlighting its strengths, weaknesses, and areas for improvement.
  
  Language and Style Evaluation: Evaluate the language and writing style employed in the document. Comment on clarity, coherence, and effectiveness in conveying the message.
  
  Audience Analysis: Consider the intended audience of the document. How well does it cater to their needs and expectations?
  
  Conclusion: Conclude with a final evaluation of the document, emphasizing its significance and potential impact.
  
  Your analysis should be concise, fitting into 5 lines, covering all aspects effectively. Note:- Only 5 lines of the result should be provided.
  
  Let's dive in:
  
  ${extractedText}
  `;
}

function generateReviewPrompt(extractedText, userMessage) {
  return `
  Take a moment to carefully review the text provided below. Get ready to answer some questions! Respond concisely, in 1 or 2 lines. If a question isn't applicable, feel free to skip it.
  Now, let's begin:
    ${extractedText}
    Here's your first question: ${userMessage}
  `;
}

module.exports = { analyzeFileData, askAboutFile };
