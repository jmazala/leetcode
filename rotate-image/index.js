/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
const rotate = function (matrix) {
  const N = matrix.length;
  if (!N) {
    return;
  }

  // [0,0] <=> [0,0]
  // [0,1] <=> [1,0]
  // [0,2] <=> [2,0]
  // [1,1] <=> [1,1]
  // [1,2] <=> [2,1]
  // [2,2] <=> [2,2]

  // transpose
  for (let i = 0; i < N; i++) {
    for (let j = i; j < N; j++) {
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  // [ 1, 4, 7 ],
  // [ 2, 5, 8 ],
  // [ 3, 6, 9 ]

  console.log(matrix);

  // then flip horizontally
  // [0,0] <=> [0, 2]
  // [0, 1] <=> [0, 1]
  // [1, 0]

  for (let i = 0; i < N; i++) {
    // every row
    for (let j = 0; j < N / 2; j++) {
      // half the columns
      const temp = matrix[i][j];
      matrix[i][j] = matrix[i][N - 1 - j];
      matrix[i][N - 1 - j] = temp;
    }
  }

  return matrix;
};

console.log(
  rotate([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
); //
