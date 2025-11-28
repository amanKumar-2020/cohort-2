let p = document.querySelector("p");
let text = p.innerText;
const alpha = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

let interval = null;

p.addEventListener("mouseenter", () => {
  if (interval) clearInterval(interval);

  let iteration = 0; 
  const step = 0.3; 
  const fps = 40; 
  interval = setInterval(() => {
    const str = text
      .split("")
      .map((char, idx) =>
        idx < iteration
          ? text[idx]
          : alpha[Math.floor(Math.random() * alpha.length)]
      )
      .join("");

    p.innerText = str;

    iteration += step;

    if (iteration >= text.length) {
      clearInterval(interval); 
      interval = null;
    }
  }, fps);
});
