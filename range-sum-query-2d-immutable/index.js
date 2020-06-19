// BETTER CACHING OF CUMULATIVE ROW SUM
/**
 * @param {number[][]} matrix
 */
// we could pre-compute a cumulative region sum with respect to the origin at (0, 0)(0,0).
// TIME COMPLEXITY: O(m*n) to precompute sums
// SPACE COMPLEXITY:  O(m*n) to hold dp array
const NumMatrix = function (matrix) {
  if (!matrix.length || !matrix[0].length) {
    return this;
  }

  this.dp = Array(matrix.length + 1)
    .fill()
    .map(() => Array(matrix[0].length + 1).fill(0));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      this.dp[i + 1][j + 1] =
        // sum everything above it, everything left of it, without double counting up & left
        this.dp[i + 1][j] + this.dp[i][j + 1] + matrix[i][j] - this.dp[i][j];
    }
  }

  return this;
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
// TIME COMPLEXITY: O(1) for array lookups
// SPACE COMPLEXITY:  O(1) for answer var
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  let answer = 0;
  // add sum to the bottom right corner
  answer += this.dp[row2 + 1][col2 + 1];

  // subtract sum above
  answer -= this.dp[row1][col2 + 1];

  // subtract sum to the left
  answer -= this.dp[row2 + 1][col1];

  // add back up and to the left that was double subtracted
  answer += this.dp[row1][col1];

  return answer;
};

// BY CACHING CUMULATIVE ROW SUM
/**
 * @param {number[][]} matrix
 */
// TIME COMPLEXITY:  O(m*n) to precompute
// SPACE COMPLEXITY:  O(m*n) to hold dp array
// const NumMatrix = function (matrix) {
//   if (!matrix.length || !matrix[0].length) {
//     return this;
//   }

//   this.dp = Array(matrix.length)
//     .fill()
//     .map(() => Array(matrix[0].length + 1).fill(0));

//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = 0; j <= matrix[0].length; j++) {
//       this.dp[i][j + 1] = this.dp[i][j] + matrix[i][j];
//     }
//   }

//   return this;
// };

// /**
//  * @param {number} row1
//  * @param {number} col1
//  * @param {number} row2
//  * @param {number} col2
//  * @return {number}
//  */

// TIME COMPLEXITY:  O(m) to compute sums
// SPACE COMPLEXITY:  O(1) for answer var
// NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
//   let answer = 0;

//   // add cumulative sum for all rows up to col2
//   // sumtract cumulate sum for all rows up to col1
//   for (let i = row1; i <= row2; i++) {
//     answer += this.dp[i][col2 + 1] - this.dp[i][col1];
//   }

//   return answer;
// };

// BY CACHING ROWS
// TIME COMPLEXITY:  O(m*n) to precompute
// SPACE COMPLEXITY:  O(m*n) for dp array
// const NumMatrix = function (matrix) {
//   this.m = matrix.length;
//   if (this.m === 0) {
//     return this;
//   }

//   this.n = matrix[0].length;

//   if (this.n === 0) {
//     return this;
//   }

//   this.matrix = matrix;

//   this.dpI = Array(this.m).fill(0);
//   this.dpJ = Array(this.n).fill(0);

//   for (let i = 0; i < this.m; i++) {
//     for (let j = 0; j < this.n; j++) {
//       this.dpI[i] += matrix[i][j];
//       this.dpJ[j] += matrix[i][j];
//     }
//   }

//   return this;
// };

// /**
//  * @param {number} row1
//  * @param {number} col1
//  * @param {number} row2
//  * @param {number} col2
//  * @return {number}
//  */
// TIME COMPLEXITY:  O(m+n) to loop through dp sums
// SPACE COMPLEXITY:  O(1) for answer var
// NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
//   let answer = 0;
//   if (!this.matrix) {
//     return answer;
//   }

//   for (let i = row1; i <= row2; i++) {
//     answer += this.dpI[i];
//   }

//   for (let j = 0; j < col1; j++) {
//     answer -= this.dpJ[j];
//   }

//   for (let j = col2 + 1; j < this.n; j++) {
//     answer -= this.dpJ[j];
//   }

//   // top left
//   for (let i = 0; i < row1; i++) {
//     for (let j = 0; j < col1; j++) {
//       answer += this.matrix[i][j];
//     }
//   }

//   // bottom left
//   for (let i = row2 + 1; i < this.m; i++) {
//     for (let j = 0; j < col1; j++) {
//       answer += this.matrix[i][j];
//     }
//   }

//   // top right
//   for (let i = 0; i < row1; i++) {
//     for (let j = col2 + 1; j < this.n; j++) {
//       answer += this.matrix[i][j];
//     }
//   }

//   // bottom right
//   for (let i = row2 + 1; i < this.m; i++) {
//     for (let j = col2 + 1; j < this.n; j++) {
//       answer += this.matrix[i][j];
//     }
//   }

//   return answer;
// };

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
