//if n = 1, max k is 1
//if n = 2, max k is 1
//if n = 3, max k is 2
//if n = 4, max k is 2
//if n = 5, max k is 2

//if k = 1, max n is 9 (9), min n is 1 (1)
//if k = 2, max n is 17 (9+8), min n is 3 (1+2)
//if k = 3, max n is 24 (9+8+7), min n is 6 (1+2+3)

const _ = require('lodash');

/*
* Find all possible combinations of k numbers that add up to a number n
* given that only numbers from 1 to 9 can be used
* each combination should be a unique set of numbers.

/**
* @param {number} k
* @param {number} n
* @return {number[][]}
*/
//USING ALL COMBINATIONS, WITH A LITTLE SMARTS
var combinationSum3 = function (k, n) {
  if (k === 1) {
    return [[n]];
  }
  const maxHash = {};
  const minHash = {};

  const answer = [];
  recur(_.range(1, Math.min(10, n + 1)), [], 0, 0, k);
  return answer;

  function recur(array, used, i, currentSum, k) {
    if (currentSum + maxWithNumDigitsLeft(k) < n) {
      return;
    }

    if (currentSum + minWithNumDigitsLeft(k) > n) {
      return;
    }

    if (k === 0) {
      if (currentSum === n) {
        answer.push(used);
      }

      return;
    }

    for (let j = i; j < array.length; j++) {
      if ((currentSum + array[j]) > n) {
        return;
      }
      
      recur(array, used.concat(array[j]), j + 1, currentSum + array[j], k - 1);
    }
  }

  function maxWithNumDigitsLeft(num) {
    if (maxHash[num]) {
      return maxHash[num];
    }

    let max = 0;
    for (let i = 0; i < num; i++) {
      max += (9 - i);
    }

    maxHash[num] = max;
    return max;
  }

  function minWithNumDigitsLeft(num) {
    if (minHash[num]) {
      return minHash[num];
    }

    let min = 0;
    for (let i = 1; i <= num; i++) {
      min += i;
    }

    minHash[num] = min;
    return min;
  }
}

/**
* @param {number} k
* @param {number} n
* @return {number[][]}
*/
//USING ALL PERMUTATIONS.  THIS IS BAD
// var combinationSum3 = function (k, n) {
//   if (k === 1) {
//     return [[n]];
//   }

//   let maxN = 0;
//   let minN = 0;
//   for (let i = 1; i <= k; i++) {
//     maxN += (10 - i);
//     minN += i;
//   }

//   if (n > maxN || n < minN) {
//     return [];
//   }

//   const answer = new Set();
//   //we don't need numbers greater than n
//   helper([], _.range(1, Math.min(10, n + 1)), 0);
//   return Array.from(answer).map(i => i.split(',').map(j => +j));

//   function helper(used, remaining, currentSum, index) {
//     //too many numbers, or sum is too high
//     if (currentSum > n || used.length > k) {
//       return;
//     }

//     if (currentSum === n) {
//       //k numbers that add up to n
//       if (used.length === k) {
//         answer.add(used.sort((a, b) => a - b).join(','));
//       }

//       return;
//     }

//     if (used.length === (k - 1)) {
//       if (remaining.indexOf(n - currentSum) > -1) {
//         answer.add(used.concat(n - currentSum).sort((a, b) => a - b).join(','));
//       }

//       return;
//     }

//     for (let i = 0; i < remaining.length; i++) {
//       //simulate taking number
//       helper(used.concat(remaining[i]), remaining.slice(0, i).concat(remaining.slice(i + 1)), currentSum + remaining[i]);
//     }
//   }
// };

console.log(combinationSum3(3, 7)); // [[1,2,4]]
console.log(combinationSum3(3, 9)); // [[1,2,6], [1,3,5], [2,3,4]]
console.log(combinationSum3(6, 35)); // [[1,4,6,7,8,9],[2,3,6,7,8,9],[2,4,5,7,8,9],[3,4,5,6,8,9]]