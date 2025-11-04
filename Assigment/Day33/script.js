// 7. Ask user’s age and check if eligible to vote
// If age >= 18 → “Eligible”, else → “Not eligible”

// let age;
// while (true) {
//   age = prompt("Enter your age");

//   if (age === null) {
//     console.log("you cancle it..");
//   } else if (age.trim() === "") {
//     console.log("Age is blant ");
//   } else if (isNaN(Number(age.trim()))) {
//     console.log("Age must be in Number");
//   } else if (age < 0 || age > 120) {
//     console.log(" Age must be between 0 and 120.");
//   } else {
//     age = Number(age.trim());
//     console.log(`your age is ${age}`);
//     break;
//   }
// }

// if (age >= 18) {
//   console.log("Eligible");
// } else {
//   console.log("Not Eligible");
// }

// 9. Count how many numbers between 1 and 15 are greater than 8
// Loop and count conditionally.

// let count = 0;
// for (let i = 1; i <= 15; i++) {
//   if (i > 8) {
//     count++;
//   }
// }
// console.log(count);

// 11. Allow only 3 attempts to enter correct password
// If user gets it right early, stop. If not → “Account locked”

// let password = "Aman";
// let userPassword;
// let login = false;

// for (let i = 1; i < 4; i++) {
//   userPassword = prompt("Enter your password");
//   if (password === userPassword) {
//     console.log("You login ");
//     login = true;
//     break;
//   } else {
//     console.log("Try Again");
//   }
// }

// if (login === false) {
//   console.log("account locked");
// }
