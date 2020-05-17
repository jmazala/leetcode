/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */

//SLIDING WINDOW SOLUTION
var findAnagrams = function (s, p) {
  const answer = [];
  if (p.length === 0 || s.length === 0 || s.length < p.length) {
    return answer;
  }

  const hash = {};
  for (let i = 0; i < p.length; i++) {
    const c = p[i];
    hash[c] = hash[c] || 0;
    hash[c]++;
  }

  let left = 0;
  let right = 0;
  let charsLeft = p.length; //size of string we're looking for in s

  while (right < s.length) {
    const cRight = s[right];

    if (hash[cRight] > 0) {
      charsLeft--;
    }

    hash[cRight]--;
    right++;

    if (charsLeft === 0) {
      answer.push(left);
    }

    const slidingWindowSize = right - left;
    if (slidingWindowSize < p.length) {
      continue;
    }

    //window is at biggest size, need to start incrementing counts again
    const cLeft = s[left];
    if (hash[cLeft] >= 0) {
      charsLeft++;
    }

    hash[cLeft]++;
    left++;
  }

  return answer;
};

//RECURSIVE SOLUTION
// var findAnagrams = function (s, p) {
//   const answer = [];
//   if (p.length === 0 || s.length === 0) {
//     return answer;
//   }

//   const hash = {};
//   for (let i = 0; i < p.length; i++) {
//     const c = p[i];
//     hash[c] = hash[c] || 0;
//     hash[c]++;
//   }

//   for (let i = 0; i < s.length; i++) {
//     const nextI = findAnagram(i, i);
//     i = nextI;
//   }

//   return answer;

//   function findAnagram(currentIndex, startingIndex) {
//     if (currentIndex - startingIndex === p.length) {
//       answer.push(startingIndex);
//       return currentIndex;
//     }

//     const c = s[currentIndex];

//     if (hash[c] > 0) {
//       hash[c]--;
//       findAnagram(currentIndex + 1, startingIndex);
//       hash[c]++;
//     }

//     return currentIndex;
//   }
// };

console.log(findAnagrams('cbaebabacd', 'abc')); // [0, 6]
console.log(findAnagrams('baa', 'aa')); // [1]