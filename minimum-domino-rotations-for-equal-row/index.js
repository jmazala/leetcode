/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var minDominoRotations = function (A, B) {
  const steps = Math.min(
    match(A[0], A, B),
    match(B[0], A, B),
    match(A[0], B, A),
    match(B[0], B, A)
  );

  return (steps === (A.length + 1)) ? -1 : steps;
};

const match = (desired, A, B) => {
  let steps = 0;
  for (let i = 0; i < A.length; i++) {
    if (A[i] === desired) {
      continue;
    }

    if (B[i] !== desired) {
      return A.length + 1;
    }

    steps++;
  }

  return steps;
}

console.log(minDominoRotations([1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]));
console.log(minDominoRotations([2, 1, 2, 4, 2, 2], [5, 2, 6, 2, 3, 2]));
console.log(minDominoRotations([3, 5, 1, 2, 3], [3, 6, 3, 3, 4]));
console.log(minDominoRotations([1, 2, 1, 2, 1, 2, 3], [2, 1, 2, 1, 2, 1, 2]));