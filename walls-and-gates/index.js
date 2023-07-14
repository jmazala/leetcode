// https://leetcode.com/problems/walls-and-gates/

const WALL = -1;
const GATE = 0;
const EMPTY = Infinity;
const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

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

  /*
  DFS from each gate filling in steps at each spot
  that isn't a gate, or a wall.  Also don't visit a spot again
  if it took less steps to get there from a different gate
  (rooms[i][j] < steps) satisfies all these requirements
  because of how we initialized the constants above
  This, most of the time, will use less memory than the BFS
  solution but it's less efficient because we visit the same
  empty spot multiple times, whereas BFS will find the shortest path
  to it upon arrival.
  */
  function dfs(i, j, steps) {
    if (
      i < 0 || i === m ||
      j < 0 || j === n ||
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

/*
BFS from each gate to find min number of steps required
to hit an EMPTY spot.  Depending on how the walls and gates are arranged,
this will likely use more memory (for the queue) than a DFS solution.
Every time a branch forks, we add another element to the queue.
For really big arrays this can grow to be quite large and we could run out of memory
faster than DFS would through recursion stack.
*/
const wallsAndGatesBFS = (rooms) => {
  const m = rooms.length;
  if (!m) {
    return;
  }

  const n = rooms[0].length;
  const queue = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (rooms[i][j] === GATE) {
        queue.push([i, j, 0]);
      }
    }
  }

  while (queue.length) {
    const [curI, curJ, curSteps] = queue.shift();

    DIRECTIONS.forEach(direction => {
      const nextI = curI + direction[0];
      const nextJ = curJ + direction[1];

      if (isEmpty(nextI, nextJ)) {
        queue.push([nextI, nextJ, curSteps + 1]);
        rooms[nextI][nextJ] = curSteps + 1;
      }
    });
  }

  return rooms;

  function isEmpty(i, j) {
    return i >= 0 && j >= 0 && i < m && j < n && rooms[i][j] === EMPTY;
  }
}

/*
[3, -1, 0, 1]
[2, 2, 1, -1]
[1, -1, 2, -1]
[0, -1, 3, 4]
*/
console.log(JSON.stringify(wallsAndGates([
  [EMPTY, WALL, GATE, EMPTY],
  [EMPTY, EMPTY, EMPTY, WALL],
  [EMPTY, WALL, EMPTY, WALL],
  [GATE, WALL, EMPTY, EMPTY]
])));