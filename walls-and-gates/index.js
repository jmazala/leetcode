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
        dfs(i, j, new Set(), 0);
      }
    }
  }

  return rooms;

  function dfs(i, j, seen, steps) {
    if (seen.has(getKey(i, j)) || rooms[i][j] === WALL) {
      return;
    }

    seen.add(getKey(i, j));
    rooms[i][j] = Math.min(rooms[i][j], steps);

    DIRECTIONS.forEach(direction => {
      const nextI = i + direction[0];
      const nextJ = j + direction[1];

      if (
        nextI < 0 || nextI >= m ||
        nextJ < 0 || nextJ >= n ||
        rooms[nextI][nextJ] === WALL ||
        seen.has(getKey(nextI, nextJ)) ||
        rooms[nextI][nextJ] <= (steps + 1)
      ) {
        return;
      }

      dfs(nextI, nextJ, seen, steps + 1);
    });
  }
};

console.log(wallsAndGates([
  [EMPTY, WALL, GATE, EMPTY],
  [EMPTY, EMPTY, EMPTY, WALL],
  [EMPTY, WALL, EMPTY, WALL],
  [GATE, WALL, EMPTY, EMPTY]
]));