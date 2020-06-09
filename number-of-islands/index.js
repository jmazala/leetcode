const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const LAND = '1';
const WATER = '0';

/**
 * @param {character[][]} grid
 * @return {number}
 */
// BFS SOLUTION
// const numIslands = function (grid) {
//   const NUM_ROWS = grid.length;
//   if (NUM_ROWS === 0) {
//     return 0;
//   }

//   const NUM_COLUMNS = grid[0].length;

//   if (NUM_COLUMNS === 0) {
//     return 0;
//   }

//   let answer = 0;

//   for (let i = 0; i < NUM_ROWS; i++) {
//     for (let j = 0; j < NUM_COLUMNS; j++) {
//       if (grid[i][j] === LAND) {
//         grid[i][j] = WATER;
//         bfs(i, j);
//         answer++;
//       }
//     }
//   }

//   return answer;

//   function bfs(row, column) {
//     const queue = [[row, column]];

//     while (queue.length) {
//       const [currentRow, currentColumn] = queue.shift();

//       // eslint-disable-next-line no-restricted-syntax
//       for (const direction of DIRECTIONS) {
//         const nextRow = currentRow + direction[0];
//         const nextColumn = currentColumn + direction[1];

//         if (
//           nextRow < 0 ||
//           nextColumn < 0 ||
//           nextRow >= NUM_ROWS ||
//           nextColumn >= NUM_COLUMNS ||
//           grid[nextRow][nextColumn] !== LAND
//         ) {
//           continue;
//         }

//         grid[nextRow][nextColumn] = WATER;
//         queue.push([nextRow, nextColumn]);
//       }
//     }
//   }
// };

// DFS SOLUTION
const numIslands = function (grid) {
  const NUM_ROWS = grid.length;
  if (NUM_ROWS === 0) {
    return 0;
  }

  const NUM_COLUMNS = grid[0].length;

  if (NUM_COLUMNS === 0) {
    return 0;
  }

  let answer = 0;

  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLUMNS; j++) {
      if (grid[i][j] === LAND) {
        grid[i][j] = WATER;
        dfs(i, j);
        answer++;
      }
    }
  }

  return answer;

  function dfs(row, column) {
    // eslint-disable-next-line no-restricted-syntax
    for (const direction of DIRECTIONS) {
      const nextRow = row + direction[0];
      const nextColumn = column + direction[1];

      if (
        nextRow < 0 ||
        nextColumn < 0 ||
        nextRow >= NUM_ROWS ||
        nextColumn >= NUM_COLUMNS ||
        grid[nextRow][nextColumn] !== LAND
      ) {
        continue;
      }

      grid[nextRow][nextColumn] = WATER;
      dfs(nextRow, nextColumn);
    }
  }
};

console.log(
  numIslands([
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
  ])
); // 1

console.log(
  numIslands([
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
  ])
); // 3
