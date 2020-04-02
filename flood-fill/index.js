/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */

//DFS SOLUTION BECAUSE MAX DIMENSION IS 50
var floodFill = function (image, sr, sc, newColor) {
  const M = image.length;
  if (!M) {
    return image;
  }
  const DIRECTIONS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const originalColor = image[sr][sc];
  if (newColor === originalColor) {
    return image;
  }

  const N = image[0].length;
  helper(sr, sc, newColor)
  return image;

  function helper(i, j) {
    if (image[i][j] !== originalColor) {
      return;
    }

    image[i][j] = newColor;

    for (let direction = 0; direction < DIRECTIONS.length; direction++) {
      const newI = i + DIRECTIONS[direction][0];
      const newJ = j + DIRECTIONS[direction][1];

      if (newI < 0 || newJ < 0 || newI >= M || newJ >= N || image[newI][newJ] !== originalColor) {
        continue;
      }

      helper(newI, newJ);
    }
  }
};

console.log(floodFill([[0, 0, 0], [0, 1, 1]], 1, 1, 1));