import { Player } from "./player.js";
import {
  createLine,
  generateDisjointPair,
  getBoardIndex,
  getCoordinates,
  createMarker,
  getRandomInt,
  getIndex,
  clearElement,
} from "./utils.js";

const BOARD_CONFIG = "boardConfig";

export class SnakeAndLadder {
  config = {
    playerCount: 1,
    snakeCount: 4,
    ladderCount: 4,
  };
  currentPlayerIndex = 0;
  jumpMap = {};
  snakes = [];
  ladders = [];
  constructor({ playerCount, snakeCount, ladderCount }) {
    if (playerCount) this.config.playerCount = playerCount;
    if (snakeCount) this.config.snakeCount = snakeCount;
    if (ladderCount) this.config.ladderCount = ladderCount;
  }
  initGame() {
    this.board = document.getElementById("board");
    this.rollBtn = document.getElementById("rollBtn");
    this.message = document.getElementById("message");
    this.startBtn = document.getElementById("startBtn");
    this.resetBtn = document.getElementById("resetBtn");
    this.dice = document.getElementById("dice");
    this.players = this.createPlayers(this.config.playerCount);
    this.rollBtn.onclick = () => this.rollDice();
    this.resetBtn.onclick = () => this.resetGame();
    this.startBtn.onclick = () => this.startGame(); 
    this.currentPlayerIndex = 0
    const boardConfig = this.loadBoard();
    this.createBoard(boardConfig);
  }
  async changeToNextPlayer(){
    this.currentPlayerIndex = (this.currentPlayerIndex+1)%this.players.length
  }
  async rollDice() {
    this.dice.innerText = "Rolling..";
    await new Promise((res) => setTimeout(res, 500));
    const rolled = getRandomInt(6) + 1;
    this.dice.innerText = rolled;
    this.players[this.currentPlayerIndex].move(rolled, this.jumpMap);
   
    if (this.players[this.currentPlayerIndex].getPosition() == 100) {
      this.stopGame();
    }
    this.changeToNextPlayer()
  }
  createPlayers(count) {
    const players = new Array(count).fill(0).map((item, index) => {
      this.board.innerHTML += createMarker(index);
      return new Player(index);
    });
    return players;
  }
  createSnakesAndLadders(config) {
    const count = config.snakes + config.ladders;
    const pairs = generateDisjointPair(count);
    const snakes = pairs.slice(0, config.snakes);
    const ladders = pairs.slice(config.snakes, count);
    return { snakes, ladders };
  }
  addPathToBoard(gridItems, head, tail, className, lineColor) {
    this.jumpMap[getBoardIndex(head)] = getBoardIndex(tail);
    gridItems[head].setAttribute("data-goto", tail);
    gridItems[tail].classList.add(className);
    gridItems[head].classList.add(className);
    const tailPos = getCoordinates(tail);
    const headPos = getCoordinates(head);
    board.innerHTML += createLine(
      headPos.x,
      headPos.y,
      tailPos.x,
      tailPos.y,
      lineColor
    );
  }
  createBoard(boardConfig) {
    const { snakes, ladders } =
      boardConfig ||
      this.createSnakesAndLadders({
        snakes: this.config.snakeCount,
        ladders: this.config.ladderCount,
      });
    this.snakes = snakes;
    this.ladders = ladders;
    this.saveBoard({ snakes, ladders });
    const arr = new Array(100).fill(0);
    const gridItems = arr.map((item, index) => {
      const div = document.createElement("div");
      div.innerText = `${getBoardIndex(index)}`;
      return div;
    });
    snakes.forEach(([head, tail]) =>
      this.addPathToBoard(gridItems, head, tail, "snake", "red")
    );
    ladders.forEach(([tail, head]) =>
      this.addPathToBoard(gridItems, head, tail, "ladder", "green")
    );
    gridItems.forEach((item) => board.appendChild(item));
  }
  startGame() {
    this.rollBtn.disabled = false;
    this.resetBtn.disabled = false;
    this.startBtn.disabled = true;
  }
  stopGame() {
    this.message.innerText = `Player ${this.players[this.currentPlayerIndex].id + 1} Won!`;
    this.rollBtn.disabled = true;
  }
  resetGame() {
    this.message.innerText = "";
    this.currentPlayerIndex = 0;
    this.players = null;
    this.jumpMap = {};
    this.snakes = [];
    this.ladders = [];
    this.dice.innerText = "";
    clearElement(this.board);
    localStorage.removeItem(BOARD_CONFIG);
    this.initGame();
  }
  saveBoard(boardConfig) {
    localStorage.setItem(BOARD_CONFIG, JSON.stringify(boardConfig));
  }
  loadBoard() {
    const boardConfig = localStorage.getItem(BOARD_CONFIG);
    if (boardConfig) {
      return JSON.parse(boardConfig);
    } else {
      return null;
    }
  }
}
