// when user clicks on button create h1, put random quote in it (from array), give them random position, rotation, scale, color(optional) and append them to parent

let btn = document.createElement("button");
btn.innerText = "Click";
btn.classList.add("btn");

let main = document.querySelector("main");

main.append(btn);

let quotes = [
  "Dream big, start small.",
  "Progress, not perfection.",
  "Believe you can.",
  "Trust the journey.",
  "Create your own luck.",
  "Stay hungry, stay foolish.",
  "Work hard, stay humble.",
  "You are unstoppable.",
  "Small steps, big results.",
  "Your future starts now.",
  "Turn pain into power.",
  "Fail, learn, rise again.",
  "Think less, do more.",
  "Do it for yourself.",
  "Wake up with purpose.",
  "Focus, work, win.",
  "Work in silence, shine loud.",
  "Consistency beats talent.",
  "Make yourself proud.",
  "Never stop improving.",
];


btn.addEventListener("click", function () {
  let h2 = document.createElement("h2");

  let len = Math.floor(Math.random() * quotes.length);
  h2.innerHTML = quotes[len];

  let randomLeft = Math.floor(Math.random() * 100);
  let randomRight = Math.floor(Math.random() * 100);
  h2.style.position = "absolute";
  h2.style.left = randomLeft + "%";
  h2.style.top = randomRight + "%";

  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  h2.style.color=`rgb(${r},${g},${b})`
   
  let rotate =Math.floor(Math.random()*360)
  h2.style.transform=`rotate(${rotate}deg)`

  btn.style.scale=0.95
  setTimeout(() => {
      btn.style.scale = 1;
  }, 150);
  main.appendChild(h2);
});
