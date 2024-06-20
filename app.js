import { createBoard } from "./board.js";
import { rollDice } from "./game.js";

async function main(){
    const currentPlayer = {
        id:1,
        position:0,
    }
    const board = document.getElementById("board");
    const rollDiceBtn = document.getElementById("rollBtn")
    rollDiceBtn.onclick = rollDice
    createBoard(board)
    
}


main();