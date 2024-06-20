import { createLine, generateDisjointPair, getBoardIndex, getCoordinates, getIndex } from "./utils.js";



function createSnakesAndLadders(config){ 
    const count = config.snakes + config.ladders
    const pairs = generateDisjointPair(count)
    const snakes = pairs.slice(0,config.snakes)
    const ladders = pairs.slice(config.snakes,count);
    return {snakes,ladders}
}

export function addPathToBoard(gridItems,head,tail,className,lineColor){
    gridItems[head].setAttribute('data-goto',tail);
    gridItems[tail].classList.add(className)
    gridItems[head].classList.add(className)
    const tailPos = getCoordinates(tail)
    const headPos = getCoordinates(head)
    board.innerHTML += createLine(headPos.x,headPos.y,tailPos.x,tailPos.y,lineColor);
}

export function createBoard(board){
    const {snakes,ladders} = createSnakesAndLadders({snakes:4,ladders:4}); 
    const arr = new Array(100).fill(0);
    const gridItems = arr.map((item,index) => {
        const div = document.createElement('div')
        div.innerText = `${getBoardIndex(index)}`;
        return div;
    })
    snakes.forEach(([tail,head]) =>  addPathToBoard(gridItems,head,tail,"snake","red"))
    ladders.forEach(([head,tail]) => addPathToBoard(gridItems,head,tail,"ladder","green"))
    
    
    gridItems.forEach((item) => board.appendChild(item))
    
}