let boxes = document.querySelectorAll(".box");
let newGame = document.querySelector("#newGame");
let playAgain = document.querySelector("#playAgain");
let winner = document.querySelector(".winner");
let msg = document.getElementById("msg");
let btn = document.querySelector(".btn");
let turnX = true;
let selectBox = document.querySelector(".select-box");
let selectBtnX = selectBox.querySelector(".options .playerX");
let selectBtnO = selectBox.querySelector(".options .playerO");
let container = document.querySelector(".container");
let players = document.querySelector(".players");
let turnXSpan = document.querySelector(".Xturn");
let turnOSpan = document.querySelector(".Oturn");
let gan = document.querySelector(".gan");
let slct = document.querySelector(".slct");
let winningAlgo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

selectBtnX.addEventListener("click", () => {
  turnX = true;
  startGame();
});

selectBtnO.addEventListener("click", () => {
  turnX = false;
  startGame();
});

const startGame = () => {
  slct.classList.add("hide");
  gan.classList.remove("hide");
  updateTurnDisplay();
};

const updateTurnDisplay = () => {
  if (turnX) {
    turnXSpan.classList.add("turn-active");
    turnOSpan.classList.remove("turn-active");
  } else {
    turnXSpan.classList.remove("turn-active");
    turnOSpan.classList.add("turn-active");
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "X";
    } else {
      box.innerText = "O";
    }
    box.disabled = true;
    checkWinner();
    turnX = !turnX;
    updateTurnDisplay();
  });
});

const resetGame = () => {
  turnX = true;
  enableBoxes();
  winner.classList.add("hide");
  newGame.setAttribute("style", "display:none");
  btn.setAttribute("style", "justify-content: center");
  updateTurnDisplay();
};

const newgame = () => {
  turnX = true;
  enableBoxes();
  winner.classList.add("hide");
  newGame.setAttribute("style", "display:none");
  btn.setAttribute("style", "justify-content: center");
  updateTurnDisplay();
  slct.classList.remove("hide");
  gan.classList.add("hide");
};

let showWinner = (win) => {
  msg.innerHTML = `Congratulations! ${win} wins!`;
  winner.classList.remove("hide");
  disableBoxes();
  newGame.setAttribute("style", "display:block");
  btn.setAttribute("style", "justify-content: space-between");
};

let draw = () => {
  msg.innerHTML = `It's a Draw!`;
  winner.classList.remove("hide");
  disableBoxes();
  newGame.setAttribute("style", "display:block");
  btn.setAttribute("style", "justify-content: space-between");
};

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerHTML = "";
  });
};

const checkWinner = () => {
  // Check for a winner first
  for (let pattern of winningAlgo) {
    let val1 = boxes[pattern[0]].innerHTML;
    let val2 = boxes[pattern[1]].innerHTML;
    let val3 = boxes[pattern[2]].innerHTML;

    if (val1 != "" && val2 != "" && val3 != "") {
      if (val1 === val2 && val2 === val3) {
        showWinner(val1);
        return;
      }
    }
  }

  // Check for a draw
  let isDraw = true;
  boxes.forEach((box, index) => {
    console.log(`Box ${index}: ${box.innerHTML}`);
    if (box.innerHTML === "") {
      isDraw = false;
    }
  });

  if (isDraw) {
    draw();
  }
};

playAgain.addEventListener("click", resetGame);
newGame.addEventListener("click", newgame);
