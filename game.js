import { getRandomInt } from "./utils";


export async function rollDice(event){
    const dice = document.getElementById("dice");
    dice.innerText = 'Rolling..'
    await new Promise((res) => setTimeout(res,500))
    const rolled = getRandomInt(6)+1;
    dice.innerText = rolled
}

export function movePlayer(player,rolled){

}