/**
 * @param {number[]} A
 * @return {number}
 */
var maxSubarraySumCircular = function (A) {
  if (!A.length) {
    return 0;
  }

  if (A.length === 1) {
    return A[0];
  }

  if (A.length === 2) {
    return Math.max(A[0], A[1], A[0] + A[1]);
  }

  let answer = -Infinity;

  for (let i = 0; i < A.length; i++) {
    const subArray = makeSubarray(i);
    answer = Math.max(answer, maxSubarraySum(subArray));
  }

  return answer;

  function makeSubarray(firstIndex) {
    return A.slice(firstIndex, A.length).concat(A.slice(0, firstIndex));
  }
};

function maxSubarraySum(array) {
  let answer = -Infinity;
  const dp = Array(array.length);
  dp[0] = array[0];
  for (let i = 1; i < array.length; i++) {
    dp[i] = Math.max(dp[i - 1] + array[i], array[i]);
  }

  return dp[dp.length - 1];
}

console.log(maxSubarraySumCircular([1, -2, 3, -2])); //3
console.log(maxSubarraySumCircular([5, -3, 5])); //10
console.log(maxSubarraySumCircular([3, -1, 2, -1])); //4
console.log(maxSubarraySumCircular([3, -2, 2, -3])); //3
console.log(maxSubarraySumCircular([-2, -3, -1])); //-1