/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  //target is 26
  //0,4 = 15, > 15, eliminate row 0
  //1,4 = 19, > 26 eliminate row 1
  //2,4 = 22, > 26, eliminate row 2
  //3,4 24 > 26, eliminate row 3
  //4,4, 30 < 26, eliminate column 4
  //4,3, 26 = 26.  found it

  const M = matrix.length;
  if (!M) {
    return false;
  }

  const N = matrix[0].length;

  let i = 0;
  let j = N - 1;

  while (i >= 0 && i < M && j < N && j >= 0) {
    if (matrix[i][j] === target) {
      return true
    }

    //eliminate this column
    if (target > matrix[i][j]) {
      i += 1;
    } else {
      j -= 1;
    }
  }

  return false;
};