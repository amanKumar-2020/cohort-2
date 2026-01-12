import Car from "./Car.js";

let h1 = React.createElement("h1", null, "i am h1");
let h2 = React.createElement("h2", null, "i am h2");

let parent = React.createElement("div", null, [
  h1,
  h2,
  React.createElement(Car), // ✅ CORRECT
]);

let root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(parent);
