const WALL = -1;
const GATE = 0;
const EMPTY = Math.pow(2, 31) - 1;
const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function getKey(i, j) {
  return [i, j].join(',');
}

const wallsAndGates = rooms => {
  const m = rooms.length;
  if (!m) {
    return;
  }

  const n = rooms[0].length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      if (rooms[i][j] === GATE) {
        dfs(i, j, 0);
      }
    }
  }

  return rooms;

  function dfs(i, j, steps) {
    if (
      i < 0 || i >= m ||
      j < 0 || j >= n ||
      rooms[i][j] === WALL ||
      rooms[i][j] < steps
    ) {
      return;
    }

    rooms[i][j] = steps;

    DIRECTIONS.forEach(direction => {
      dfs(i + direction[0], j + direction[1], steps + 1);
    });
  }
};

console.log(wallsAndGates([
  [EMPTY, WALL, GATE, EMPTY],
  [EMPTY, EMPTY, EMPTY, WALL],
  [EMPTY, WALL, EMPTY, WALL],
  [GATE, WALL, EMPTY, EMPTY]
]));