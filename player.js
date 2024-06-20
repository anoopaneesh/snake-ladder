import { getCoordinates, getIndex } from "./utils.js";
export class Player {
  constructor(id) {
    this.position = 1;
    this.id = id;
    this.render();
  }
  move(rolled,jumpMap) {
    const nextPosition = this.position + rolled
    if (jumpMap[nextPosition] || nextPosition <= 100) {
      this.position = jumpMap[nextPosition] || nextPosition;
      this.render();
    }
  }
  getPosition() {
    return this.position;
  }
  render() {
    const { x, y } = getCoordinates(getIndex(this.position));
    const marker = document.getElementById(this.id);
    marker.style.top = y;
    marker.style.left = x;
  }
}
