import { SnakeAndLadder } from "./snakeladder.js";

async function main() {
  const snakeAndLadder = new SnakeAndLadder({
    playerCount: 1,
    snakeCount: 4,
    ladderCount: 4,
  });
  snakeAndLadder.initGame();
}

main();
