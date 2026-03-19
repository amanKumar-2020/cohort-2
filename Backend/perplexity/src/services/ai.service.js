import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";

const mistralAiModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,

});


const geminiAiModel = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

// export {geminiAiModel , mistralAiModel} ;

export async function generateAIResponse(message) {
 const response = await  mistralAiModel.invoke([
  new HumanMessage(message)
 ])
 return response.text ;
}


// export async function generateAIResponse(message) {
//   const response = await geminiAiModel.invoke(message);
//   return response.content;
// }