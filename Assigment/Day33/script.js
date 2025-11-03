// 7. Ask user’s age and check if eligible to vote
// If age >= 18 → “Eligible”, else → “Not eligible”

let age;
while (true) {
  age = prompt("Enter your age");

  if (age === null) {
    console.log("you cancle it..");
  } else if (age.trim() === "") {
    console.log("Age is blant ");
  } else if (isNaN(Number(age.trim()))) {
    console.log("Age must be in Number");
  } else if (age < 0 || age > 120) {
    console.log(" Age must be between 0 and 120.");
  } else {
    age = Number(age.trim());
    console.log(`your age is ${age}`);
    break;
  }
}

if (age >= 18) {
  console.log("Eligible");
} else {
  console.log("Not Eligible");
}
