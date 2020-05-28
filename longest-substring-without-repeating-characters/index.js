/**
 * @param {string} s
 * @return {number}
 */

//optimized sliding window
var lengthOfLongestSubstring = function (s) {
  let answer = 0;
  const hash = {};
  let slow = 0;
  let fast = 0;

  while (fast < s.length) {
    const c = s[fast];

    if (c in hash) {
      slow = Math.max(hash[c], slow);
    }

    answer = Math.max(answer, fast - slow + 1);
    hash[c] = fast + 1;
    fast++;
  }

  return answer;
};

//sliding window
// var lengthOfLongestSubstring = function (s) {
//   const set = new Set();
//   let answer = 0;
//   let slow = 0;
//   let fast = 0;

//   while (fast < s.length) {
//     const c = s[fast];
//     if (!set.has(c)) {
//       set.add(c);
//       fast++;
//       answer = Math.max(answer, fast - slow);
//     } else {
//       const toRemove = s[slow];
//       set.delete(toRemove);
//       slow++;
//     }
//   }

//   return answer;
// };