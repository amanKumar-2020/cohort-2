
let tag = document.querySelector(".tag");
let upper = document.querySelector(".tag-upper");
let lower = document.querySelector(".tag-lower");

let upperText = upper.innerText;
let lowerText = lower.innerText;
const alpha = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";


function animating(doc,text){
  doc.addEventListener("mouseenter", () => {
    if (doc.dataset.animating === "true") return;
    doc.dataset.animating = "true";
    let iteration = 0;
    const step = 0.3;
    const fps = 40;

    const interval = setInterval(() => {
      const str = text
        .split("")
        .map((char, idx) => {
          if (iteration > idx) {
            return text[idx];
          }
          return alpha.split("")[Math.floor(Math.random() * alpha.length)];
        })
        .join("");
      doc.innerText = str;
      iteration += step;

      if (iteration >= text.length) {
        clearInterval(interval);
        iteration = 0;
        doc.innerText = text;
        doc.dataset.animating = "false";
      }
    }, fps);
  });

}

animating(upper,upperText)
animating(lower,lowerText)