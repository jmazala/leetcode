/**
 * @param {number[]} arr
 * @return {number}
 */
var countElements = function (arr) {
  const set = new Set();
  const answer = [];

  arr.forEach(num => {
    set.add(num);
  });

  arr.forEach(num => {
    if (set.has(num + 1)) {
      answer.push(num);
    }
  });

  return answer.length;
};

console.log(countElements([1, 2, 3])); //2
console.log(countElements([1, 1, 3, 3, 5, 5, 7, 7])); //0
console.log(countElements([1, 3, 2, 3, 5, 0]));//3
console.log(countElements([1, 1, 2, 2])); //2
console.log(countElements([1, 1, 2])); //2