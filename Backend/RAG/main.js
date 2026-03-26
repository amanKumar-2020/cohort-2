import "dotenv/config";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { Pinecone } from "@pinecone-database/pinecone";

const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
});

const pineconeClient = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

import { PDFExtract } from "pdf.js-extract";

const pdfExtract = new PDFExtract();

function extractPDF(filePath) {
  return new Promise((resolve, reject) => {
    pdfExtract.extract(filePath, {}, (err, data) => {
      if (err) return reject(err);

      const text = data.pages
        .map((page) => page.content.map((item) => item.str).join(" "))
        .join("\n\n");

      resolve(text);
    });
  });
}

extractPDF("story.pdf")
  .then((text) => {
    textSplitter(text);
  })
  .catch((err) => {
    console.error(err);
  });

const pineconeIndex = pineconeClient.index("cohort-2-rag");

async function textSplitter(rawText) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,
    chunkOverlap: 50,
  });
  const chunks = await splitter.splitText(rawText);

  const embeddingVectors = await Promise.all(
    chunks.map(async (chunk) => {
      const embedding = await embeddings.embedDocuments(chunk);
      return {
        text: chunk,
        embedding,
      };
    }),
  );

  await pineconeIndex.upsert({
    records: embeddingVectors.map((doc, i) => ({
      id: `doc-${i}`,
      values: doc.embedding,
      metadata: {
        text: doc.text,
      },
    })),
  });
}
