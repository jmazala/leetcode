/**
 * @param {string} s
 * @return {string[]}
 */
//using a set.  still O(n).  Better on memory.
var findRepeatedDnaSequences = function (s) {
  const set = new Set();
  const answer = new Set();

  for (let i = 0; i <= s.length - 10; i++) {
    const sub = s.substring(i, i + 10);
    if (set.has(sub)) {
      answer.add(sub);
    } else {
      set.add(sub);
    }
  }

  return Array.from(answer);
};

//using a map
// var findRepeatedDnaSequences = function (s) {
//   const map = new Map();

//   for (let i = 0; i <= s.length - 10; i++) {
//     const sub = s.substring(i, i + 10);
//     if (!map.has(sub)) {
//       map.set(sub, 0);
//     }
//     map.set(sub, map.get(sub) + 1);
//   }

//   const answer = [];
//   map.forEach((val, key) => {
//     if (val > 1) {
//       answer.push(key);
//     }
//   });

//   return answer;
// };

console.log(findRepeatedDnaSequences('AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT'));