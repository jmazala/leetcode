/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */
var fourSumCount = function (A, B, C, D) {
  let answer = 0;
  const abHash = {};
  for (let a = 0; a < A.length; a++) {
    for (let b = 0; b < B.length; b++) {
      const halfSum = A[a] + B[b];
      abHash[halfSum] = abHash[halfSum] || 0;
      abHash[halfSum]++;
    }
  }

  const cdHash = {};
  for (let c = 0; c < C.length; c++) {
    for (let d = 0; d < D.length; d++) {
      const halfSum = C[c] + D[d];
      if (abHash[halfSum * -1]) {
        answer += abHash[halfSum * -1];
      }
    }
  }

  return answer;
};