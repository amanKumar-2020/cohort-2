// Level 2 – Functional Thinking & Logic Tasks(Intermediate)

// 1. Write a higher-order function `runTwice(fn)` that takes another function and executes it two times.
function runTwice(fn) {
  console.log("first line of hod function hai");
  fn()
  fn()
}

let paramFn = function(){
  console.log("I am in second funtion");
  
}
runTwice(paramFn);