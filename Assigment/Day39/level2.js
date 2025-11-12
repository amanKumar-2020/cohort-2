// Level 2 – Functional Thinking & Logic Tasks(Intermediate)

// 1. Write a higher-order function `runTwice(fn)` that takes another function and executes it two times.

// function runTwice(fn) {
//   console.log("first line of hod function hai");
//   fn()
//   fn()
// }

// let paramFn = function(){
//   console.log("I am in second funtion");

// }
// runTwice(paramFn);

// -----------------------------XXXXXXX----------------------XXXXXX--------------------

// 2. Create one pure function that always returns thesame output for a given input, and one impurefunction using a global variable.

// function pureFn(a, b) {
//   return a + b;
// }
// let sum = pureFn(12, 3);

// let globalVariable = 3;

// function impureFn(num) {
//   let b = Math.floor(Math.random() * 10);
//   // globalVariable++;  //it up to you
//   return b + num;
// }

// let ran = impureFn(globalVariable);

// console.log(` it is pure funtion ${sum}`);
// console.log(` it is Impure funtion ${ran}`);

// -----------------------------XXXXXXX----------------------XXXXXX--------------------

// 3. Write a function that uses object destructuringinside parameters to extract and print `name` and`age`

const user1 = {
  name: "Aman",
  age: 69,
  weight: 101,
};

function displayUser({ name, age }) {
  // const { name, age } = user;  // destructuringinside inside the body
  console.log(`name of user is ${name}`);
  console.log(`name of age is ${age}`);
}

displayUser(user1);
