//https://leetcode.com/problems/count-square-submatrices-with-all-ones/
/**
 * @param {number[][]} matrix
 * @return {number}
 */

//DP SOLUTION
var countSquares = function(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  
  if (m === 0) {
    return 0;
  }
  
  let answer = 0;
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        continue;
      }
      
      if (i === 0 || j === 0) {
        answer++;
        continue;
      }
      
      matrix[i][j] += Math.min(matrix[i][j-1], matrix[i-1][j-1], matrix[i-1][j]);
      
      answer += matrix[i][j]; 
    }
  }
  
  return answer;
}
//SLOW SOLUTION, CHECK FOR EVERY SIZE SQUARE AT EVERY INDEX
// var countSquares = function(matrix) {
//   const rows = matrix.length;
//   const columns = matrix[0].length;
//   const square = Math.min(rows, columns);
//   let total = 0;

//   for (let i = 0; i < rows; i++) {
//     for (let j = 0; j < columns; j++) {
//       for (let size = 1; size <= square; size++) {
//         // if (size === 2) console.log(`checking for square size ${size} at ${i},${j}`);
//         total += checkSquare(i, j, size);    
//       }
//     }
//   }

//   return total;


//   function checkSquare(i, j, size) {
//     if (size === 1 && matrix[i][j] === 1) {
//       // console.log(`found square size 1 at ${i},${j}`);
//       return 1;
//     }
  
  
//     let isSquare = false;
//     for (let addRows = 0; addRows < size; addRows++) {
//       if ((i + addRows) > (rows -1)) {
//         return 0;
//       }
    
//       for (let addCols = 0; addCols < size; addCols++) {
//         if ((j + addCols) > (columns -1)) {
//           return 0;
//         }
      
//         if (matrix[i+addRows][j+addCols] === 0) {
//           return 0;
//         }
//       }
//     }
  
//     // if (size === 2) console.log(`found square size ${size} at ${i},${j}`);
//     return 1;
//   }
// };

// // console.log(countSquares([[0,1,1,1],[1,1,1,1],[0,1,1,1]]));