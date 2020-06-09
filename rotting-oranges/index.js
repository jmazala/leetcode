const FRESH = 1;
const ROTTEN = 2;
const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

/**
 * @param {number[][]} grid
 * @return {number}
 */
// using BFS
const orangesRotting = function (grid) {
  const M = grid.length;
  if (M === 0) {
    return -1;
  }

  const N = grid[0].length;
  if (N === 0) {
    return -1;
  }

  let freshOranges = 0;
  const queue = [];

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] === FRESH) {
        freshOranges++;
      } else if (grid[i][j] === ROTTEN) {
        queue.push([i, j]);
      }
    }
  }

  if (freshOranges === 0) {
    return 0;
  }

  let steps = 0;

  while (queue.length) {
    steps++;
    let numNodes = queue.length;

    while (numNodes) {
      const [row, col] = queue.shift();
      numNodes--;

      for (const [iDelta, jDelta] of DIRECTIONS) {
        const nextI = row + iDelta;
        const nextJ = col + jDelta;

        if (nextI < 0 || nextJ < 0 || nextI >= M || nextJ >= N) {
          continue;
        }

        if (grid[nextI][nextJ] === FRESH) {
          grid[nextI][nextJ] = ROTTEN;
          queue.push([nextI, nextJ]);
          freshOranges--;

          if (freshOranges === 0) {
            return steps;
          }
        }
      }
    }
  }

  return -1;
};

console.log(
  orangesRotting([
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
  ])
); // 4

console.log(
  orangesRotting([
    [2, 1, 1],
    [0, 1, 1],
    [1, 0, 1],
  ])
); // -1

console.log(orangesRotting([[0, 2]])); // 0
