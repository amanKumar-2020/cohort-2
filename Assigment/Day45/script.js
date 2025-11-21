let btn = document.querySelector("button")
let stat = document.querySelector(".status");
console.log(stat);

let percentage = document.querySelector(".percentage");
let count = 0 ;

btn.addEventListener("click",function () {
  let interval = setInterval(() => {
    count++
    console.log(count);
    stat.style.width = `${count}%`;
    percentage.innerHTML =`${count}%`
    
  }, 50);
  setTimeout(() => {
    clearInterval(interval);
  }, 5000);
  
},{once :true})