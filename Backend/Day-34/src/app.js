import "dotenv/config";
import express from "express";
import { ChatMistralAI } from "@langchain/mistralai";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const app = express();

const model = new ChatMistralAI({
  model: "mistral-small-latest",
  temperature: 0,
  maxRetries: 2,
});

async function testAi(userInput) {
  model.invoke(userInput).then((response) => {
    console.log("[AI]" + response.text);
  });
}

const rl = readline.createInterface({ input, output });

while (true) {
  const prompt = await rl.question("$ ");

  if (prompt == "q") {
    rl.close();
    break;
  }

  testAi(prompt);
}

export default app;
