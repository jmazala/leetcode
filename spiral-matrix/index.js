/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const M = matrix.length;
  if (!M) {
    return [];
  }

  const N = matrix[0].length;
  const answer = [];

  let r1 = 0;
  let r2 = M - 1;
  let c1 = 0;
  let c2 = N - 1;

  while (r1 <= r2 && c1 <= c2) {
    spiralCoords(r1, c1, r2, c2).forEach(([i, j]) => {
      answer.push(matrix[i][j]);
    });

    r1++;
    c1++;
    r2--;
    c2--;
  }

  return answer;
};

const spiralCoords = (i1, j1, i2, j2) => {
  const coords = [];
  //top row going right, all-inclusive
  for (let j = j1; j <= j2; j++) {
    coords.push([i1, j]);
  }

  //right column going down, except upper right
  for (let i = i1 + 1; i <= i2; i++) {
    coords.push([i, j2]);
  }

  //bottom row going left, except bottom right
  for (let j = j2 - 1; j >= j1; j--) {
    coords.push([i2, j]);
  }

  //left column going up, except bottom left and top left
  for (let i = i2 - 1; i > i1; i--) {
    coords.push([i, j1]);
  }

  return coords;
};

console.log(spiralOrder([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
]));

console.log(spiralOrder([
  [1, 2, 3, 4],
  [10, 11, 12, 5],
  [9, 8, 7, 6]]));