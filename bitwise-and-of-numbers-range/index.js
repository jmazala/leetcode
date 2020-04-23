/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var rangeBitwiseAnd = function (m, n) {
  if (m === n) {
    return m;
  }

  if (m === 0) {
    return 0;
  }

  //convert m and n to binary string (should be bits but eh),
  stringM = m.toString(2);
  stringN = n.toString(2);

  if (stringM.length !== stringN.length) {
    return 0;
  }

  let answer = '';
  let i = 0;
  while (stringM[i] === stringN[i]) {
    answer += stringM[i];
    i++;
  }

  return parseInt(_.padEnd(answer, stringM.length, '0'), 2);
};