/**
 * Given a 2D binary matrix filled with 0's and 1's,
 * find the largest square containing only 1's and return its area.
 * @param {character[][]} matrix
 * @return {number}
 */
//with dp array
var maximalSquare = function(matrix) {
  const M = matrix.length;
  if (!M) {
    return 0;
  }

  const N = matrix[0].length;

  //dp(i,j) represents the side length of the maximum square
  //whose bottom right corner is the cell with index (i,j) in the original matrix.
  const dp = Array(M + 1).fill().map(i => Array(N + 1).fill(0));
  let answer = 0;
  
  for (let i = 1; i <= M; i++) {
    for (let j = 1; j <= N; j++) {
      if (matrix[i-1][j-1] === '0') { //not part of a square
        continue;
      }
      
      //check up, left, diagonal up and left
      dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;
      answer = Math.max(dp[i][j], answer);
    }
  }

  return answer * answer;
};

//brute force
// var maximalSquare = function (matrix) {
//   const M = matrix.length;
//   if (M === 0) {
//     return 0;
//   }

//   const N = matrix[0].length;
//   let answer = 0;

//   for (let i = 0; i < M; i++) {
//     for (let j = 0; j < N; j++) {
//       if (matrix[i][j] !== '1') {
//         continue;
//       }

//       let distance = 0;
//       let loop = true;

//       while (loop) {
//         distance++;
//         //go diagonal right && down n units
//         const tempI = i + distance;
//         const tempJ = j + distance;

//         if (tempI >= M || tempJ >= N) {
//           break;
//         }

//         for (let k = 0; k <= distance; k++) {
//           if (matrix[tempI - k][tempJ] !== '1' || //check up
//             matrix[tempI][tempJ - k] !== '1') { //check left
//             loop = false;
//             break;
//           }
//         }
//       }

//       answer = Math.max(answer, distance);
//     }
//   }

//   return answer * answer;
// };

console.log(maximalSquare([])); //0

matrix = [
  ['1', '0', '1', '0', '0'],
  ['1', '0', '1', '1', '1'],
  ['1', '1', '1', '1', '1'],
  ['1', '0', '0', '1', '0']]
  ;

console.log(maximalSquare(matrix)); // 4

matrix2 = [
  ['0', '1', '1', '0', '0', '1', '0', '1', '0', '1'],
  ['0', '0', '1', '0', '1', '0', '1', '0', '1', '0'],
  ['1', '0', '0', '0', '0', '1', '0', '1', '1', '0'],
  ['0', '1', '1', '1', '1', '1', '1', '0', '1', '0'],
  ['0', '0', '1', '1', '1', '1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0', '1', '1', '1', '1', '0'],
  ['0', '0', '0', '1', '1', '0', '0', '0', '1', '0'],
  ['1', '1', '0', '1', '1', '0', '0', '1', '1', '1'],
  ['0', '1', '0', '1', '1', '0', '1', '0', '1', '1']];
console.log(maximalSquare(matrix2)); // 4

matrix3 = [
  ['0', '1', '1', '0', '0', '1', '0', '1', '0', '1'],
  ['0', '0', '1', '0', '1', '0', '1', '0', '1', '0'],
  ['1', '0', '0', '0', '0', '1', '0', '1', '1', '0'],
  ['0', '1', '1', '1', '1', '1', '1', '0', '1', '0'],
  ['0', '0', '1', '1', '1', '1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0', '1', '1', '1', '1', '0'],
  ['0', '0', '0', '1', '1', '0', '0', '1', '1', '1'],
  ['1', '1', '0', '1', '1', '0', '0', '1', '1', '1'],
  ['0', '1', '0', '1', '1', '0', '1', '1', '1', '1']];
console.log(maximalSquare(matrix3)); // 9

matrix4 = [
  ['0', '1', '1', '0', '0', '1', '0', '1', '0', '1'],
  ['0', '0', '1', '0', '1', '0', '1', '0', '1', '0'],
  ['1', '0', '0', '0', '0', '1', '0', '1', '1', '0'],
  ['0', '1', '1', '1', '1', '1', '1', '0', '1', '0'],
  ['0', '0', '1', '1', '1', '1', '1', '1', '1', '0'],
  ['1', '1', '1', '1', '0', '1', '1', '1', '1', '0'],
  ['1', '1', '1', '1', '1', '0', '0', '1', '1', '1'],
  ['1', '1', '1', '1', '1', '0', '0', '1', '1', '1'],
  ['1', '1', '1', '1', '1', '0', '1', '1', '1', '1']];
console.log(maximalSquare(matrix4)); // 16