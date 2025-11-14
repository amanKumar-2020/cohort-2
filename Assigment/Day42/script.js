let count = document.querySelector(".count");
let inc = document.querySelector(".increase");
let dec = document.querySelector(".decrease");
let reset = document.querySelector(".reset");
let cnt = 0;

inc.addEventListener("click", function () {
  cnt++;
  count.innerHTML = cnt;
});
dec.addEventListener("click", function () {
  cnt--;
  count.innerHTML = cnt;
});
reset.addEventListener("click", function () {
  cnt = 0;
  count.innerHTML = cnt;
});
