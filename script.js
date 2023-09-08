const gameInfo = document.querySelector(".status");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]
];
//LET'S CREATE A FUNCTION TO INITIALISE THE GAME
function gameInit(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
};
gameInit();

//swap the turn
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `CurrentPlayer - ${currentPlayer}`;
};

function checkGameOver(){
    let answer = "";
    winningPosition.forEach((position) => {
        if((gameGrid[position[0]]  !== "" || gameGrid[position[1]]  !== "" || gameGrid[position[2]]  !== "")  
            && ((gameGrid[position[0]]  === gameGrid[position[1]]) && (gameGrid[position[1]]  === gameGrid[position[2]]))){
                if(gameGrid[position[0]] === "X"){
                    answer = "X";
                }
                else{
                    answer = "0";
                }
                //disable pointer  if wee found winner
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                });
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //if game tied
    let count = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            count++;
        }
    });
    if(count === 9){
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }
};

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click",() => {
    handleClick(index);
    })
});

newGameBtn.addEventListener("click",gameInit);