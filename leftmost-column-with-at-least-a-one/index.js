const { BinaryMatrix } = require('../js-includes');

/**
 * // This is the BinaryMatrix's API interface.
 * // You should not implement it, or speculate about its implementation
 * function BinaryMatrix() {
 *     @param {integer} x, y
 *     @return {integer}
 *     this.get = function(x, y) {
 *         ...
 *     };
 *
 *     @return {[integer, integer]}
 *     this.dimensions = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {BinaryMatrix} binaryMatrix
 * @return {number}
 */
//USE A POINTER
var leftMostColumnWithOne = function (binaryMatrix) {
  const dimensions = binaryMatrix.dimensions();
  const M = dimensions[0];
  const N = dimensions[1];

  let foundOne = false;
  let p = [0, N - 1];

  while (p[1] >= 0 && p[0] < M) {
    //move down
    if (binaryMatrix.get(p[0], p[1]) === 0) {
      p[0]++;
    } else { //move left
      p[1]--;
      foundOne = true;
    }
  }

  return foundOne ? p[1] + 1 : -1;
};
//BINARY SEARCH EACH ROW
// var leftMostColumnWithOne = function (binaryMatrix) {
//   const dimensions = binaryMatrix.dimensions();
//   const M = dimensions[0];
//   const N = dimensions[1];

//   let minIndex = Infinity;

//   for (let row = 0; row < M; row++) {
//     minIndex = Math.min(minIndex, searchRow(row));
//   }

//   return minIndex === Infinity ? -1 : minIndex;

//   function searchRow(row) {
//     let low = 0;
//     let high = N - 1;
//     let val = binaryMatrix.get(row, high);

//     if (val === 0) {
//       return Infinity;
//     }

//     const rowCopy = Array(N);
//     rowCopy[high] = val;

//     while (low < high) {
//       const mid = Math.floor((high + low) / 2);
//       if (rowCopy[mid] === undefined) {
//         rowCopy[mid] = binaryMatrix.get(row, mid);
//       }
//       val = rowCopy[mid];
//       if (val === 0) {
//         low = mid + 1;
//       } else if (val === 1) {
//         high = mid;
//       }
//     }

//     return low;
//   }
// };

const bm0 = new BinaryMatrix([
  [0, 0],
  [0, 0]
]);

const bm1 = new BinaryMatrix([
  [0],
  [1]
]);

const bm2 = new BinaryMatrix([
  [0, 0],
  [0, 1],
  // [1, 1],
]);

const bm3 = new BinaryMatrix([
  [0, 0, 0],
  [0, 0, 1],
  // [0, 1, 1],
  // [1, 1, 1],
]);

const bm4 = new BinaryMatrix([
  [0, 0, 0, 0],
  [0, 0, 0, 1],
  // [0, 0, 1, 1],
  // [0, 1, 1, 1],
  // [1, 1, 1, 1]
]);

const bm5 = new BinaryMatrix([
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1],
  // [0, 0, 0, 1, 1],
  // [0, 0, 1, 1, 1],
  // [0, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1]
]);

console.log(leftMostColumnWithOne(bm0));
console.log(leftMostColumnWithOne(bm1));
console.log(leftMostColumnWithOne(bm2));
console.log(leftMostColumnWithOne(bm3));
console.log(leftMostColumnWithOne(bm4));
console.log(leftMostColumnWithOne(bm5));