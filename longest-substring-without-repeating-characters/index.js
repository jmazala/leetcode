/**
 * @param {string} s
 * @return {number}
 */

//optimized sliding window
var lengthOfLongestSubstring = function (s) {
  let answer = 0;
  let hash = {};

  for (let i = 0, j = 0; j < s.length; j++) {
    if (hash[s[j]] !== undefined) {
      i = Math.max(hash[s[j]], i);
    }

    answer = Math.max(answer, j - i + 1);
    hash[s[j]] = j + 1;
  }

  return answer;
};

//sliding window
// var lengthOfLongestSubstring = function(s) {
//     //seen a at 0, longest is 1
//     //seen b at 1, longest is 2
//     //seen c at 2, longest is 3
//     //a is at 3.  longest was 3.  go back to right after first a which is index 2

//     const set = new Set();
//     let answer = 0;
//     let i = 0;
//     let j = 0;

//     while (i < s.length && j < s.length) {
//         if (!set.has(s[j])) {
//             set.add(s[j]);
//             j++;
//             answer = Math.max(answer, j - i);
//         } else {
//             set.delete(s[i]);
//             i++;
//         }
//     }

//     return answer;
// };