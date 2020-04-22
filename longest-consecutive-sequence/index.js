/**
 * @param {number[]} array
 * @return {number}
 */
var longestConsecutive = function (array) {
  if (!array.length) {
    return 0;
  }

  const set = new Set(array);
  let answer = 0;

  set.forEach(num => {
    if (!set.has(num - 1)) { // on a new streak
      let streak = 1;

      while (set.has(num + 1)) {
        num++;
        streak++;
      }

      answer = Math.max(answer, streak);
    }
  });

  return answer;
}

console.log(longestConsecutive([1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6])); // 8
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4
console.log(longestConsecutive([9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6])); // 7
console.log(longestConsecutive([2147483646, -2147483647, 0, 2, 2147483644, -2147483645, 2147483645]));