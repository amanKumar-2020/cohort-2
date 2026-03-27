import "dotenv/config";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings, MistralAI } from "@langchain/mistralai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PDFExtract } from "pdf.js-extract";

function getPositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

const DEFAULTS = {
  pineconeIndexName: process.env.PINECONE_INDEX_NAME || "cohort-2-rag",
  embeddingModel: process.env.MISTRAL_EMBEDDING_MODEL || "mistral-embed",
  llmModel: process.env.MISTRAL_CHAT_MODEL || "mistral-small-latest",
  chunkSize: getPositiveInteger(process.env.CHUNK_SIZE, 400),
  chunkOverlap: getPositiveInteger(process.env.CHUNK_OVERLAP, 50),
  topK: getPositiveInteger(process.env.TOP_K, 2),
  fallbackQuestion:
    process.env.DEFAULT_QUESTION || "how was aarav internship?",
};

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function createClients() {
  const pineconeApiKey = getRequiredEnv("PINECONE_API_KEY");
  getRequiredEnv("MISTRAL_API_KEY");

  const embeddings = new MistralAIEmbeddings({
    model: DEFAULTS.embeddingModel,
  });

  const llm = new MistralAI({
    model: DEFAULTS.llmModel,
    temperature: 0,
    maxRetries: 2,
  });

  const pineconeClient = new Pinecone({
    apiKey: pineconeApiKey,
  });

  const pineconeIndex = pineconeClient.index(DEFAULTS.pineconeIndexName);
  const pdfExtract = new PDFExtract();

  return { embeddings, llm, pineconeIndex, pdfExtract };
}

function extractPdfText(pdfExtract, filePath) {
  return new Promise((resolve, reject) => {
    pdfExtract.extract(filePath, {}, (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      const text = (data.pages || [])
        .map((page) => (page.content || []).map((item) => item.str).join(" "))
        .join("\n\n")
        .trim();

      if (!text) {
        reject(new Error(`No text found in PDF: ${filePath}`));
        return;
      }

      resolve(text);
    });
  });
}

async function chunkAndEmbed(rawText, embeddings) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: DEFAULTS.chunkSize,
    chunkOverlap: DEFAULTS.chunkOverlap,
  });

  const chunks = await splitter.splitText(rawText);
  if (chunks.length === 0) {
    return [];
  }

  const records = await Promise.all(
    chunks.map(async (text, index) => {
      const values = await embeddings.embedQuery(text);
      return {
        id: `doc-${Date.now()}-${index}`,
        values,
        metadata: {
          text,
          chunkNumber: index,
          createdAt: new Date().toISOString(),
        },
      };
    }),
  );

  return records;
}

async function ingestPdf(filePath, clients) {
  const rawText = await extractPdfText(clients.pdfExtract, filePath);
  const records = await chunkAndEmbed(rawText, clients.embeddings);

  if (records.length === 0) {
    throw new Error("No chunks were generated from the document.");
  }

  await clients.pineconeIndex.upsert({ records });
  console.log(
    `Ingestion complete. Upserted ${records.length} chunks from ${filePath}.`,
  );
}

async function queryContext(question, clients) {
  const queryVector = await clients.embeddings.embedQuery(question);
  const result = await clients.pineconeIndex.query({
    vector: queryVector,
    topK: DEFAULTS.topK,
    includeMetadata: true,
  });

  const contextParts = (result.matches || [])
    .map((match) => match.metadata?.text)
    .filter((text) => typeof text === "string" && text.trim().length > 0);

  return contextParts;
}

function buildPrompt(contextText, question) {
  return `
You are a helpful assistant.
Answer ONLY from the given context.
If the answer is not in the context, say "I don't know".

Context:
${contextText}

Question:
${question}
`;
}

async function answerQuestion(question, clients) {
  const contextParts = await queryContext(question, clients);
  if (contextParts.length === 0) {
    console.log("I don't know");
    return;
  }

  const prompt = buildPrompt(contextParts.join("\n\n"), question);
  const response = await clients.llm.invoke(prompt);

  const output =
    typeof response?.content === "string" ? response.content : String(response);
  console.log(output);
}

function printHelp() {
  console.log(`
Usage:
  node main.js ask "<question>"
  node main.js ingest <pdf-file-path>

Defaults:
  If no command is passed, the app runs "ask" with a fallback question.
`);
}

async function main() {
  const clients = createClients();
  const [command, ...rest] = process.argv.slice(2);

  if (!command) {
    await answerQuestion(DEFAULTS.fallbackQuestion, clients);
    return;
  }

  if (command === "ask") {
    const question = rest.join(" ").trim() || DEFAULTS.fallbackQuestion;
    await answerQuestion(question, clients);
    return;
  }

  if (command === "ingest") {
    const filePath = rest[0];
    if (!filePath) {
      throw new Error(
        "Please provide a PDF file path. Example: node main.js ingest story.pdf",
      );
    }

    await ingestPdf(filePath, clients);
    return;
  }

  if (command === "help" || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

main().catch((error) => {
  console.error("Application error:", error.message || error);
  process.exitCode = 1;
});
