let btn = document.querySelector("button")
let stat = document.querySelector(".status");

let percentage = document.querySelector(".percentage");
let count = 0 ;

btn.addEventListener("click",function () {
  let interval = setInterval(() => {
    count++
    stat.style.width = `${count}%`;
    percentage.innerHTML =`${count}%`
    
  }, 50);
  setTimeout(() => {
    clearInterval(interval);
  }, 5000);
  
},{once :true})