const STARTING = 1;
const ENDING = 2;
const EMPTY = 0;
const OBSTACLE = -1;
const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePathsIII = function (grid) {
  let startingI;
  let startingJ;
  const M = grid.length;
  let toFind = 0;
  let answer = 0;

  if (!M) {
    return;
  }

  const N = grid[0].length;

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] === OBSTACLE) {
        continue;
      }

      toFind++;

      if (grid[i][j] === STARTING) {
        startingI = i;
        startingJ = j;
      }
    }
  }

  dfs(startingI, startingJ, toFind);
  return answer;

  function dfs(i, j, numLeft) {
    numLeft--;

    if (grid[i][j] === ENDING) {
      if (numLeft === 0) {
        answer++;
      }

      return;
    }

    grid[i][j] = OBSTACLE;

    DIRECTIONS.forEach(([iDelta, jDelta]) => {
      const nextI = i + iDelta;
      const nextJ = j + jDelta;

      if (nextI < 0 || nextJ < 0 || nextI >= M || nextJ >= N || grid[nextI][nextJ] === OBSTACLE) {
        return;
      }

      dfs(nextI, nextJ, numLeft);
    });

    grid[i][j] = EMPTY;
  }
};

console.log(uniquePathsIII([
  [1, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 2, -1]])); //2
console.log(uniquePathsIII([[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 2]])); //4
console.log(uniquePathsIII([[0, 1], [2, 0]])); //0
