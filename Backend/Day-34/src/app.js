import "dotenv/config";
import express from "express";
import { ChatMistralAI } from "@langchain/mistralai";

const app = express();

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  temperature: 0,
  maxRetries: 2,
});

// await model.invoke("Hello,");
async function testAi() {
  model.invoke("What is love explain under 10 words?").then((response) => {
    console.log(response.text);
  });
}
testAi()
export default app;
