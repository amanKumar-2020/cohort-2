import { ChatGoogle } from "@langchain/google";
import { ChatGroq } from "@langchain/groq";
import { ChatMistralAI } from "@langchain/mistralai";

export const geminiModel = new ChatGoogle({
  model: "gemini-flash-latest",
  apiKey: process.env.GOOGLE_API_KEY,
});

export const mistralAIModel = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export const groqModel = new ChatGroq({
  model: "llama-3.1-8b-instant",
  apiKey: process.env.GROQ_API_KEY,
});


// export const geminiModel = new ChatMistralAI({
//   model: "mistral-medium-latest",
//   apiKey: process.env.MISTRAL_API_KEY,
// });