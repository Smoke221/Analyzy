const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function chatWithAI(extractedText, userMessage) {
  // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: extractedText,
          },
        ],
      },
      {
        role: "model",
        parts: [{ text: "Ask me about the file, you want to know." }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  while (true) {
    if (userMessage === "quit") {
      break;
    }
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const text = response.text();
    return text;
  }
}

module.exports = { chatWithAI };
