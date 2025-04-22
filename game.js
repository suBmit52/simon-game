let gameSeq = []; //to store sequence of game flashes 
let userSeq = []; //to match with gameseq

let btnColor = ['red','yellow','green','purple'];

let started = false;
let level = 0; // for each level upgradation ++
let h2 = document.querySelector("h2"); //just to change into level ++
let highScoreValue = localStorage.getItem("highScore") || 0; // Load high score from localStorage
let highScoreDisplay = document.querySelector("h3");

// Initialize high score display
highScoreDisplay.innerText = `Highest Score: ${highScoreValue}`;

document.addEventListener("keypress", function(){
    if(started == false){ //to start the game one time
        console.log("game started");
        started = true;
        levelUp(); // call to increase level no.

    };
 
});

function btnFlash(btn){ // to give a random/game flash and for user input as well
   btn.classList.add("flash"); //to add white background
    setTimeout(function(){
        btn.classList.remove("flash") //to remove white background after 1 sec
    },225);

};

function levelUp(){ // to increase level no. and flash the btns for every level up
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

       // Update the high score if the current level exceeds it
       if (level > highScoreValue) {
        highScoreValue = level;
        localStorage.setItem("highScore", highScoreValue); // Save the new high score in localStorage
        highScoreDisplay.innerText = `Highest Score: ${highScoreValue}`;
    }

    let randIdx = Math.floor(Math.random() *3);
    let randColor = btnColor[randIdx];
    console.log(randColor);
    let randBtn = document.querySelector(`.${randColor}`); //to select class of btn color
    console.log(randBtn);
    gameSeq.push(randColor); //to store all random flashes
    btnFlash(randBtn); // to call random and user btn flash
};

function check(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        };
    } else {
        h2.innerHTML = `Game Over! And Your Score was (<b>${level}</b>) <br> Press Any Key to Restart`
        document.querySelector("body").style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = 'white';
            alert(`wrong press!`);
        },215);
        reset();
    };
};

function btnPress(){
    // console.log(this);
    let userClicked = this;
    btnFlash(userClicked);
    let userColor = userClicked.getAttribute("id");
    console.log(userColor); //
    userSeq.push(userColor);

    check(userSeq.length-1);
};

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);

};

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerText = "Press Any Key to Start"; // Reset level display
};


