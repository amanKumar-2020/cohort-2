// 12. Ask user for words until they type “stop”. Count how many times they typed “yes”
// Loop until "stop" is typed. Count "yes".

// let yesCount = 0;
// while (true) {
//   let input = prompt("Enter your word");
//   if (input === null) {
//     continue;
//   }
//   if (input === "yes") {
//     yesCount++;
//   }
//   if (input.toLowerCase() === "stop") {
//     break;
//   }
// }
// console.log(yesCount);

// --------------XXX------------------XXX------------------------------XXX---------------------

// 13. Print numbers divisible by 7 from 1 to 50
// Use modulo % and loop.

// for (let i = 1; i < 50; i++) {
//   if (i % 7 === 0) {
//     console.log(`${i} is divisible by 7`);
//   }
// }

// --------------XXX------------------XXX------------------------------XXX---------------------

// 14. Sum of all odd numbers from 1 to 30
// Add only odd numbers. Print final sum.
let oddNumberSum = 0;
for (let i = 0; i < 30; i++) {
  if (i % 2 !== 0) {
    oddNumberSum += i;
  }
}
console.log(`sum of all odd Number is ${oddNumberSum}`);
