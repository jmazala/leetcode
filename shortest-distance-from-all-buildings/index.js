const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const EMPTY = 0;
const BUILDING = 1;
/**
 * @param {number[][]} grid
 * @return {number}
 */
const shortestDistance = function (grid) {
  const M = grid.length;
  if (M === 0) {
    return -1;
  }

  const N = grid[0].length;

  if (N === 0) {
    return -1;
  }

  const minStepsFromAllBuildings = Array(M)
    .fill()
    .map(() => Array(N).fill(0));

  const reachableBuildings = Array(M)
    .fill()
    .map(() => Array(N).fill(0));

  let numBuildings = 0;
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] === BUILDING) {
        numBuildings++;
        bfs(i, j);
      }
    }
  }

  let answer = Infinity;

  // the distance is just the number of BFS steps it takes to reach all houses
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] === EMPTY && reachableBuildings[i][j] === numBuildings) {
        answer = Math.min(answer, minStepsFromAllBuildings[i][j]);
      }
    }
  }

  return answer === Infinity ? -1 : answer;

  function bfs(i, j) {
    let steps = 0;
    const queue = [[i, j]];
    const visited = Array(M)
      .fill()
      .map(() => Array(N).fill(false));

    visited[i][j] = true;

    while (queue.length) {
      steps++;

      let numNodes = queue.length;
      while (numNodes) {
        const [curI, curJ] = queue.shift();
        numNodes--;

        for (const [iDelta, jDelta] of DIRECTIONS) {
          const nextI = curI + iDelta;
          const nextJ = curJ + jDelta;

          if (
            nextI < 0 ||
            nextI >= M ||
            nextJ < 0 ||
            nextJ >= N ||
            visited[nextI][nextJ] ||
            grid[nextI][nextJ] !== EMPTY
          ) {
            continue;
          }

          queue.push([nextI, nextJ]);
          visited[nextI][nextJ] = true;
          reachableBuildings[nextI][nextJ]++;
          minStepsFromAllBuildings[nextI][nextJ] += steps;
        }
      }
    }
  }
};

console.log(
  shortestDistance([
    [1, 0, 2, 0, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
  ])
); // 7
