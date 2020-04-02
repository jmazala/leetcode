/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  const answer = Array(n).fill().map(i => Array(n).fill(-1));

  let r1 = 0;
  let r2 = n - 1;
  let c1 = 0;
  let c2 = n - 1;

  let currentNum = 1;

  while (r1 <= r2 && c1 <= c2) {
    spiralCoords(r1, c1, r2, c2).forEach(([i, j]) => {
      answer[i][j] = currentNum;
      currentNum++;
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
    console.log(`loop 1 pushing ${i1},${j}`);
    coords.push([i1, j]);
  }

  //right column going down, except upper right
  for (let i = i1 + 1; i <= i2; i++) {
    console.log(`loop 2 pushing ${i},${j2}`);
    coords.push([i, j2]);
  }

  if (i1 < i2 && j1 < j2) {
    //bottom row going left, except bottom right and bottom left
    for (let j = j2 - 1; j > j1; j--) {
      console.log(`loop 3 pushing ${i2},${j}`);
      coords.push([i2, j]);
    }
    //left column going up, except bottom left and top left
    for (let i = i2; i > i1; i--) {
      console.log(`loop 4 pushing ${i},${j1}`);
      coords.push([i, j1]);
    }
  }

  return coords;
};

console.log(generateMatrix(5));