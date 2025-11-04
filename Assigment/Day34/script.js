// 12. Ask user for words until they type “stop”. Count how many times they typed “yes”
// Loop until "stop" is typed. Count "yes".
let yesCount = 0;

while (true) {
  let input = prompt("Enter your word");
  if (input === null) {
    continue;
  }
  if (input === "yes") {
    yesCount++;
  }
  if (input.toLowerCase() === "stop") {
    break;
  }
}
console.log(yesCount);
