
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
  })
  .catch((err) => {
    console.error(err);
  });
