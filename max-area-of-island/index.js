/**
 * @param {number[][]} grid
 * @return {number}
 */

const LAND = 1;
const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

var maxAreaOfIsland = function (grid) {
  const M = grid.length;
  if (!M) {
    return 0;
  }

  const N = grid[0].length;
  let maxArea = 0;

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] == LAND) {
        maxArea = Math.max(maxArea, helper(i, j));
      }
    }
  }

  return maxArea;

  function helper(i, j) {
    const queue = [[i, j]];

    let area = 0;
    while (queue.length) {
      const [curI, curJ] = queue.shift();
      if (grid[curI][curJ] !== LAND) {
        continue;
      }
      
      area++;
      grid[curI][curJ] = -1;

      DIRECTIONS.forEach(direction => {
        const nextI = curI + direction[0];
        const nextJ = curJ + direction[1];
        if (nextI < 0 || nextJ < 0 || nextI >= M || nextJ >= N) {
          return;
        }

        if (grid[nextI][nextJ] === LAND) {
          queue.push([nextI, nextJ]);
        }
      });
    }

    return area;
  }
};