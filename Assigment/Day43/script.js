let fullName = document.querySelector(".full-name");
let Captain = document.querySelector(".Captain");
let trophy = document.querySelector(".trophy");
let color = document.querySelector(".pill");
let btn = document.querySelector(".btn");
let shortName = document.querySelector(".shortName");
let article = document.querySelector("article");
let logo = document.querySelector(".logo img");
console.log(logo.innerHTML);

console.log(logo.getAttribute("src"));

const iplTeams = [
  {
    team: "MI",
    fullName: "Mumbai Indians",
    captain: "Hardik Pandya",
    trophies: 5,
    primary: "Blue",
    img: "https://i.pinimg.com/736x/37/cd/d5/37cdd544a025e42fec5202a3d5b095c8.jpg",
  },
  {
    team: "CSK",
    fullName: "Chennai Super Kings",
    captain: "Ruturaj Gaikwad",
    trophies: 5,
    primary: "Yellow",
    img: "https://i.pinimg.com/736x/85/52/f8/8552f811e95b998d9505c43a9828c6d6.jpg",
  },
  {
    team: "KKR",
    fullName: "Kolkata Knight Riders",
    captain: "Shreyas Iyer",
    trophies: 3,
    primary: "Purple",
    img: "https://img.etimg.com/thumb/width-1200,height-1200,imgsize-414529,resizemode-75,msid-77546743/news/sports/mpl-becomes-principal-sponsor-for-knight-riders-franchises-in-ipl-cpl.jpg",
  },
  {
    team: "SRH",
    fullName: "Sunrisers Hyderabad",
    captain: "Pat Cummins",
    trophies: 1,
    primary: "Orange",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsxsWuk8ejkkoDU0DVKlnJCXpaSIQk-5JdCQ&s",
  },
  {
    team: "RR",
    fullName: "Rajasthan Royals",
    captain: "Sanju Samson",
    trophies: 1,
    primary: "Pink",
    img: "https://static.toiimg.com/thumb/msid-77990255,width-1280,height-720,imgsize-66937,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
  },
  {
    team: "RCB",
    fullName: "Royal Challengers Bengaluru",
    captain: "Faf du Plessis",
    trophies: 0,
    primary: "crimson",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMY3XMNLpjJQgtBCFR1XpPvM_GLan-QX2avQ&s",
  },
  {
    team: "DC",
    fullName: "Delhi Capitals",
    captain: "Rishabh Pant",
    trophies: 0,
    primary: "Blue",
    img: "https://media.crictracker.com/media/attachments/2022/02/Delhi-Capitals-logo-1.jpg",
  },
  {
    team: "PBKS",
    fullName: "Punjab Kings",
    captain: "Shikhar Dhawan",
    trophies: 0,
    primary: "rgb(202, 85, 22)",
    img: "https://upload.wikimedia.org/wikipedia/en/d/d4/Punjab_Kings_Logo.svg",
  },
  {
    team: "GT",
    fullName: "Gujarat Titans",
    captain: "Shubman Gill",
    trophies: 1,
    primary: "darkblue",
    img: "https://imgk.timesnownews.com/story/Gujarat_Titans_logo.png",
  },
  {
    team: "LSG",
    fullName: "Lucknow Super Giants",
    captain: "KL Rahul",
    trophies: 0,
    primary: "rgb(255, 165, 0)",
    img: "https://unlistedzone.com/storage/knowledge-logo/361/expect_lucknow_ipl_team_to_command_rs_10000_crore_valuation_in_5_years_rpsg_groups_sanjiv_goenka-logo-1700550221.jpg",
  },
];

console.log(iplTeams.length);

btn.addEventListener("click", function () {
  let random = iplTeams[Math.floor(Math.random() * iplTeams.length)];
  console.log(random.team);

  fullName.innerText = random.fullName;
  shortName.innerText = random.team;
  Captain.innerText = random.captain;
  trophy.innerText = random.trophies;
  // color.innerText = random.primary;
  article.style.backgroundColor = random.primary;
  logo.setAttribute("src", random.img);
});
