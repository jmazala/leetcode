const EMPTY = 0;
const FRESH = 1;
const ROTTEN = 2;
let NUM_ROWS;
let NUM_COLUMNS;

//no cell has a fresh orange
const noFreshOranges = function (grid) {
  return !grid.some(row => {
    return row.some(value => value === FRESH);
  });
  // for (let row = 0; row < NUM_ROWS; row++) {
  //     for (let column = 0; column < NUM_COLUMNS; column++) {
  //         if (grid[row][column] === FRESH) {
  //             return false;
  //         }
  //     }
  // }
  // return true;
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
//kind of intuitive solution
// const orangesRotting = function(grid) {
//     NUM_ROWS = grid.length;
//     NUM_COLUMNS = grid[0].length;
//     return helper(grid, 0);
// };

// const helper = function (grid, minutes) {
//     if (noFreshOranges(grid, minutes)) {
//         return minutes;
//     }

//     const toChange = [];
//     for (let row = 0; row < NUM_ROWS; row++) {
//         for (let column = 0; column < NUM_COLUMNS; column ++) {
//             if (grid[row][column] === ROTTEN) {
//                 //up
//                 if (row !== 0) {
//                     if (grid[row - 1][column] === FRESH) {
//                         toChange.push([row - 1, column]);
//                     }
//                 }

//                 //down
//                 if (row !== NUM_ROWS - 1) {
//                     if (grid[row + 1][column] === FRESH) {
//                         toChange.push([row + 1, column]);
//                     }  
//                 }

//                 //left
//                 if (column !== 0) {
//                     if (grid[row][column - 1] === FRESH) {
//                         toChange.push([row, column - 1]);
//                     }
//                 }

//                 //right
//                 if (column !== NUM_COLUMNS - 1) {
//                     if (grid[row][column + 1] === FRESH) {
//                         toChange.push([row, column + 1]);
//                     }    
//                 }   
//             }
//         }
//     }

//     //this is inefficient because there's probably a way to detect an impossible board without having to iterate through it.
//     if (!toChange.length) {
//         return -1;
//     }

//     toChange.forEach(([row, column]) => {
//         grid[row][column] = ROTTEN;
//     })

//     return helper(grid, minutes + 1);
// };

/**
 * @param {number[][]} grid
 * @return {number}
 */
//using BFS
const orangesRotting = function (grid) {
  NUM_ROWS = grid.length;
  NUM_COLUMNS = grid[0].length;
  DIRECTIONS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  const queue = [];
  let firstPass = true;
  let minutes = 0;
  let freshCount = 0;

  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLUMNS; col++) {
      if (grid[row][col] === ROTTEN) {
        queue.push([row, col]);
      } else if (grid[row][col] === FRESH) {
        freshCount++;
      }
    }
  }

  while (queue.length) {
    let numNodes = queue.length;

    while (numNodes) {
      const [row, col] = queue.shift();
      numNodes--;

      DIRECTIONS.forEach(direction => {
        const [rowMod, colMod] = direction;
        const newRow = row + rowMod;
        const newCol = col + colMod;

        if (newRow < 0 || newCol < 0 || newRow >= NUM_ROWS || newCol >= NUM_COLUMNS) {
          return;
        }

        if (grid[newRow][newCol] == FRESH) {
          grid[newRow][newCol] = ROTTEN;
          queue.push([newRow, newCol]);
          freshCount--;
        }
      });
    }

    if (firstPass) {
      firstPass = false;
    } else {
      minutes++;
    }
  }

  return freshCount === 0 ? minutes : -1;
}