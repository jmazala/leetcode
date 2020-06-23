/**
 * @param {number[]} light
 * @return {number}
 */
const numTimesAllBlue = function (light) {
  let answer = 0;
  let rightMostLightOn = 0;
  let bulbsTurnedOn = 0;

  for (const bulb of light) {
    bulbsTurnedOn++;
    rightMostLightOn = Math.max(rightMostLightOn, bulb);
    if (rightMostLightOn === bulbsTurnedOn) {
      answer++;
    }
  }

  return answer;
};

console.log(numTimesAllBlue([4, 1, 2, 3])); // 1
console.log(numTimesAllBlue([3, 2, 4, 1, 5])); // 2
console.log(numTimesAllBlue([2, 1, 3, 5, 4])); // 3
console.log(numTimesAllBlue([2, 1, 4, 3, 6, 5])); // 3
console.log(numTimesAllBlue([1, 2, 3, 4, 5, 6])); // 6
