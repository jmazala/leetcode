/**
 * @param {character[][]} grid
 * @return {number}
 */
//BFS SOLUTION
// var numIslands = function(grid) {
//     if (!grid.length || !grid[0].length) {
//         return 0;
//     }

//     const NUM_ROWS = grid.length;
//     const NUM_COLUMNS = grid[0].length;
//     let numIslands = 0;
//     const seen = {};

//     for (let i = 0; i < NUM_ROWS; i++) {
//         for (let j = 0; j < NUM_COLUMNS; j++) {
//             if (seen[`${i},${j}`]) {
//                 continue;
//             }

//             if (grid[i][j] === '1') {
//                 bfs(i, j);
//                 numIslands++;
//             }
//         }
//     }

//     return numIslands;

//     function bfs(row, column) {
//         const queue = [[row, column]];

//         while (queue.length) {
//             let numNodes = queue.length;

//             while (numNodes) {
//                 const [row, column] = queue.shift();
//                 seen[`${row},${column}`] = true;
//                 numNodes--;

//                 //up
//                 if (
//                     (row > 0) &&
//                     (grid[row-1][column] === '1') &&
//                     (!seen[`${row-1},${column}`])
//                 ) {
//                     queue.push([row-1, column]);
//                     seen[`${row-1},${column}`] = true;
//                 }
//                 //down
//                 if (
//                     (row < NUM_ROWS - 1) &&
//                     (grid[row+1][column] === '1') &&
//                     (!seen[`${row+1},${column}`])
//                 ) {
//                     queue.push([row+1, column]);
//                     seen[`${row+1},${column}`] = true;
//                 }
//                 //left
//                 if (
//                     (column > 0) &&
//                     (grid[row][column-1] === '1') &&
//                     (!seen[`${row},${column-1}`])
//                 ) {
//                     queue.push([row, column-1]);
//                     seen[`${row},${column-1}`] = true;
//                 }
//                 //right
//                 if (
//                     (column < NUM_COLUMNS - 1) &&
//                     (grid[row][column+1] === '1') &&
//                     (!seen[`${row},${column+1}`])
//                 ) {
//                     queue.push([row, column+1]);
//                     seen[`${row},${column+1}`] = true;
//                 }
//             }
//         }
//     }
// };

//DFS SOLUTION
var numIslands = function (grid) {
  if (!grid.length || !grid[0].length) {
    return 0;
  }

  const NUM_ROWS = grid.length;
  const NUM_COLUMNS = grid[0].length;
  let numIslands = 0;
  const seen = {};

  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLUMNS; j++) {
      if (seen[`${i},${j}`]) {
        continue;
      }

      if (grid[i][j] === '1') {
        // console.log(`dfs(${i},${j})`);
        dfs(i, j);
        numIslands++;
      }
    }
  }

  return numIslands;

  function dfs(row, column) {
    seen[`${row},${column}`] = true;

    //up
    if (
      (row > 0) &&
      (grid[row - 1][column] === '1') &&
      (!seen[`${row - 1},${column}`])
    ) {
      dfs(row - 1, column);
      // seen[`${row-1},${column}`] = true;
    }
    //down
    if (
      (row < NUM_ROWS - 1) &&
      (grid[row + 1][column] === '1') &&
      (!seen[`${row + 1},${column}`])
    ) {
      dfs(row + 1, column);
      // seen[`${row+1},${column}`] = true;
    }
    //left
    if (
      (column > 0) &&
      (grid[row][column - 1] === '1') &&
      (!seen[`${row},${column - 1}`])
    ) {
      dfs(row, column - 1);
      // seen[`${row},${column-1}`] = true;
    }
    //right
    if (
      (column < NUM_COLUMNS - 1) &&
      (grid[row][column + 1] === '1') &&
      (!seen[`${row},${column + 1}`])
    ) {
      dfs(row, column + 1);
      // seen[`${row},${column+1}`] = true;
    }
  }
};