require('dotenv').config(); // Load environment variables from .env file
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function generateContent(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
}

const prompt = "Write a story about a magic backpack.";
generateContent(prompt);
