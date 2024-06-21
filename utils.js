export function getRandomInt(max, exclude) {
  let rand = Math.floor(Math.random() * max);
  while (exclude && exclude.includes(rand)) {
    rand = Math.floor(Math.random() * max);
  }
  return rand;
}
export function generateDisjointPair(count) {
  const excludedGrids = [1, 2, 3, 99, 98, 100].map(getIndex);
  const rcount = count * 2;
  const points = [];
  for (let i = 0; i < rcount; i++) {
    points.push(getRandomInt(100, [...points, ...excludedGrids]));
  }
  points.sort();
  const pairs = [];
  const l = points.length;
  for (let i = 0; i < l / 2; i++) {
    pairs.push([points[i], points[l / 2 + i]]);
  }
  return pairs;
}

export function createLine(x1, y1, x2, y2, color) {
  return `<svg class="line" width="600" height="600"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2"/></svg>`;
}

export function createMarker(idx) {
  return `<svg id="${idx}" class="player" height="50" width="50"><circle r="25" cx="25" cy="25" fill="${generateColor()}"/></svg>`;
}

export function generateColor(){
  const r = getRandomInt(255)
  const g = getRandomInt(255)
  const b = getRandomInt(255)
  return `rgb(${r},${g},${b})`
}

export function getBoardIndex(idx) {
  let boardIndex = 100 - idx;
  const row = Math.ceil(boardIndex / 10);
  if (row % 2 != 0) {
    boardIndex = row * 10 - boardIndex + 1 + (row - 1) * 10;
  }
  return boardIndex;
}

export function getIndex(boardIndex) {
  let index = 100 - boardIndex;
  const row = Math.floor(index / 10);
  if (row % 2 != 0) {
    index = (row + 1) * 10 - (index - row * 10 + 1);
  }
  return index;
}

export function getCoordinates(idx) {
  const row = Math.floor(idx / 10);
  const col = idx % 10;
  return { x: col * 60 + 30, y: row * 60 + 30 };
}

export function clearElement(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
}
