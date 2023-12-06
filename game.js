//Iteration 1: Declare variables required for this game
let gameBody = document.getElementById("game-body");
let $lives = document.getElementById("lives");
let seconds = document.getElementById("timer").textContent;
let zombieId = 0;
const img = [
  "zombie-1.png",
  "zombie-2.png",
  "zombie-4.png",
  "zombie-5.png",
  "zombie-6.png",
];

// add shotgun sound
const expAudio = new Audio("./assets/shotgun.wav");
expAudio.volume=0.2;
gameBody.onclick = () =>{
  expAudio.pause();
  expAudio.currentTime = 0;
  expAudio.play();
};

//add bgm
const backgroundSound = new Audio("./assets/bgm.mp3");
backgroundSound.play();
backgroundSound.loop = true;

// add lives
const maxlives = 4;
var lives = 4;

//make zombie
function makeZombie() {
  randomImage = img[getRandomInt(0, img.length)];
  gameBody.innerHTML += `<img src="./assets/${randomImage}" class="zombie-image" id="zombie${zombieId}">`;
  let zombie = document.getElementById("zombie" + zombieId);
  zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`;
  zombie.style.animationDuration = `${getRandomInt(2, 6)}s`;
  zombie.onclick = () => {
    zombieDestruct(zombie);
  };
}


//check if player missed a zombie

function checkCollision(zombie){
  if(zombie.getBoundingClientRect().top <= 0){
    lives--;
    return true;
  }
  return false;
}

// function to destroy zombie

function zombieDestruct(zombie){
  zombie.style.display = "none";
  zombieId++;
  makeZombie();
}

//create timer

var timer = setInterval(function(){
  seconds--;
  document.getElementById("timer").textContent = seconds;
  let zombie = document.getElementById("zombie"+zombieId);
  if(checkCollision(zombie)==true){
    zombieDestruct(zombie);
    if(lives==0){
      clearInterval(timer);
      location.href = "./game-over.html";
    }
  }
  if(seconds==0){
    clearInterval(timer);
    location.href = "./game-over.html";
  }
},1000);

// start game by calling first zombie

makeZombie(zombieId);

//helper function 
function getRandomInt(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random()* (max-min)) + min;
}