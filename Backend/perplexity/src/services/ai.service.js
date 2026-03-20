import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  HumanMessage,
  AIMessage,
  SystemMessage
} from "@langchain/core/messages";

const mistralAiModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const geminiAiModel = new ChatGoogleGenerativeAI({
  model: "gemini-flash-lite-latest",
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function generateAIResponse(input) {
  console.log("messages:", input);
  console.log("isArray:", Array.isArray(input));

  let messages;

  if (typeof input === "string") {
    // 🔥 convert string → array
    messages = [new HumanMessage(input)];
  } else {
    // already array
    messages = input;
  }
  const response = await geminiAiModel.invoke(messages);
  return response.content;
}

// export async function generateAIResponse(message) {
//   const response = await geminiAiModel.invoke(message);
//   return response.content;
// }

// export {geminiAiModel , mistralAiModel} ;

export async function generateChatTitle(message) {
  console.log("messages:", message);
  console.log("isArray:", Array.isArray(message));
  console.log("first:", message[0]);
  const response = await mistralAiModel.invoke([
    new SystemMessage(`
            You are a helpful assistant that generates concise and descriptive titles for chat conversations.
            
            User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.    
        `),
    new HumanMessage(`
            Generate a title for a chat conversation based on the following first message:
            "${message}"
            `),
  ]);

  return response.content;
}
