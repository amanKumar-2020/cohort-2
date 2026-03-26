import "dotenv/config"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";

const embeddings = new MistralAIEmbeddings({
  model: "mistral-embed",
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
    console.log(text);
    textSplitter(text);
  })
  .catch((err) => {
    console.error(err);
  });

async function textSplitter(rawText) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,
    chunkOverlap: 50,
  });
  const chunks = await splitter.splitText(rawText);
  console.log(chunks);
  const embeddingVectors = await embeddings.embedDocuments(chunks);
  console.log(embeddingVectors);
}




