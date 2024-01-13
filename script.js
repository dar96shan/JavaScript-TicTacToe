let boxes = document.querySelectorAll(".box");

let reset = document.querySelector("#reset")

let newGameBtn = document.querySelector("#new-game");

let msgContainer = document.querySelector(".msg-container");

let msg = document.querySelector("#msg")

// Player X and Player O
let turnO = true;
let count  =  0; // to Track draw

const winningPattern = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

//Reset Game:
const resetGame = ()=>{
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");

    boxes.forEach((box) =>{
        box.style.backgroundColor="";
    })
    
}

boxes.forEach((box) =>{
    box.addEventListener("click",() =>{
       // console.log("Box was clicked!!")
        if(turnO){ //PlayerO turn
            box.innerText = "O";
            box.style.backgroundColor = "#CCD5AE";
            turnO = false;
        }else{//PlayerX turn
            box.innerText = "X";
            box.style.backgroundColor = "#D4A373";
            turnO = true;
        }
        box.disabled = true;
        count++;

       let isWinner = checkWinner();

       if( count === 9 && !isWinner){
        gameDraw();
       }
    });
});

const gameDraw =()=>{
    msg.innerText = `Game is draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulation , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = ()=>{

    for(let pattern of winningPattern){
       // console.log("Winning Pattern:",pattern[0],pattern[1],pattern[2]);
        //console.log("Boxes with index:",boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);
        let pos1Val = boxes[pattern[0]].innerText;
       // console.log(pos1Val);
        let pos2Val = boxes[pattern[1]].innerText;
       // console.log(pos2Val);
        let pos3Val = boxes[pattern[2]].innerText;
        //console.log(pos3Val);

        if(pos1Val != "" && pos2Val != "" && pos3Val != "" ){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner", pos1Val);
                showWinner(pos1Val);
            }
        }
    }
};


reset.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);