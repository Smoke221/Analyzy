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
  Imagine you're tasked with analyzing a document for a comprehensive understanding. Below is the text you'll be analyzing. Your goal is to provide a well-structured analysis report, formatted for easy readability. Here's what we need:

Analysis Report

    Summary:
        Summarize the main points and arguments presented in the document. (Paragraph)
    Key Findings:
        List the most significant findings or insights extracted from the document. Focus on the top two discoveries. (List items)
    Recommendations:
        Based on the document's content, suggest any recommendations or actions that should be considered. (List items)
    (Continue with other sections like Topic Identification, Sentiment Analysis, etc., following the same format)
    Critical Analysis:
        Provide a critical assessment of the document, highlighting its strengths, weaknesses, and areas for improvement.
    Language and Style Evaluation: 
        Evaluate the language and writing style employed in the document. Comment on clarity, coherence, and effectiveness in conveying the message. 
    Audience Analysis: 
        Consider the intended audience of the document. How well does it cater to their needs and expectations?
    Conclusion: 
        Conclude with a final evaluation of the document, emphasizing its significance and potential impact.

**Please present the analysis report in a concise and informative manner, using clear and concise language. Limit the report to 5 lines. Provide in such a way that it should be used like a html, dont include html at the start.**

Let's dive in:

${extractedText}


Below is the example of the output-
  <h5>Summary</h5>
    <p>The document outlines the candidate's qualifications, experiences, and skills.</p>
  <h5>Key Findings</h5>
    <ul>
      <li>Extensive project management experience.</li>
      <li>Demonstrated strong leadership and communication skills.</li>
    </ul>
  <h5>Recommendations</h5>
    <ul>
      <li>Consider the candidate for project management roles.</li>
      <li>Assess communication skills during the interview process.</li>
    </ul>
  <h5>Critical Analysis</h5>
    <p>The document provides a comprehensive overview but lacks specificity in certain areas.</p>
  <h5>Language and Style Evaluation</h5>
    <p>The language is clear and coherent, effectively communicating the candidate's qualifications.</p>
  <h5>Audience Analysis</h5>
    <p>The document caters well to hiring managers or recruiters, offering relevant information for their decision-making process.</p>
  <h5>Conclusion</h5>
    <p>Overall, the document effectively presents the candidate's profile, highlighting strengths and areas for consideration.</p>

please provide like this
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
