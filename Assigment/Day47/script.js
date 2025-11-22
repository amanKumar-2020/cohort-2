let music = new Audio("./piano-keys-mp3/key01.mp3");

let key = [];
for (let i = 1; i <= 24; i++) {
  let num = String(i).padStart(2, "0");
  let audioFiles = `./piano-keys-mp3/key${num}.mp3`;
  key.push(audioFiles);
}

const capitalAlphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

document.addEventListener("keydown", function (event) {
  for (let i = 0; i < 24; i++) {
    if (event.key.toUpperCase() === capitalAlphabet[i]) {
      let num = String(i + 1).padStart(2, "0");
      let keyel = document.querySelector(`.key${num}`);
      if(keyel==null) continue;
      keyel.style.transform = "translateY(10px)";

      setTimeout(() => {
        keyel.style.transform = "translateY(0px)";
      }, 300);

      console.log("You pressed G!");
      music.currentTime = 0;
      let track = new Audio(key[i]);
      track.play();
      break;
    }
  }
});
