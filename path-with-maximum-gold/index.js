const DIRECTIONS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
/**
 * @param {number[][]} grid
 * @return {number}
 */

var getMaximumGold = function (grid) {
  const M = grid.length;
  if (!M) {
    return 0;
  }

  const N = grid[0].length;

  //You can start and stop collecting gold from any position in the grid that has some gold.
  const startingPoints = [];
  let answer = 0;
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] > 0) {
        dfs(i, j, 0);
      }
    }
  }

  return answer;

  function dfs(i, j, gold) {
    if (i < 0 || j < 0 || i >= M || j >= N || grid[i][j] === 0) {
      answer = Math.max(answer, gold);
      return;
    }

    const currentGold = grid[i][j];
    grid[i][j] = 0;

    DIRECTIONS.forEach(([iDelta, jDelta]) => {
      dfs(i + iDelta, j + jDelta, gold + currentGold);
    });

    grid[i][j] = currentGold;
  }
};

console.log(getMaximumGold([
  [0, 6, 0],
  [5, 8, 7],
  [0, 9, 0]])); //24

console.log(getMaximumGold([
  [1, 0, 7, 0, 0, 0],
  [2, 0, 6, 0, 1, 0],
  [3, 5, 6, 7, 4, 2],
  [4, 3, 1, 0, 2, 0],
  [3, 0, 5, 0, 20, 0]])); //60

