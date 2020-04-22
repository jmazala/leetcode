/**
 * @param {number[]} array
 * @return {number}
 */
var longestConsecutive = function (array) {
  if (!array.length) {
    return [];
  }

  const set = new Set(array);
  array = Array.from(set).sort((a, b) => a - b);
  let min = array[0];
  const max = array[array.length - 1];

  let answer = [min, min];
  let i = array.shift();
  while (array.length) {
    if (set.has(i) && set.has(i + 1)) {
      i++;
      array.shift();
      continue;
    }

    if ((i - min) > (answer[1] - answer[0])) {
      answer = [min, i];
    }

    i = array.shift();
    min = i;
  }

  if ((i - min) > (answer[1] - answer[0])) {
    answer = [min, i];
  }

  return answer[1] - answer[0] + 1;
}

console.log(longestConsecutive([1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6])); // 8
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // 4
console.log(longestConsecutive([9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6])); // 7
console.log(longestConsecutive([2147483646, -2147483647, 0, 2, 2147483644, -2147483645, 2147483645]));