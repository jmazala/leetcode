const OFFSET = '0'.charCodeAt(0);

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return '0';
  }

  if (num1 === '1') {
    return num2;
  }

  if (num2 === '1') {
    return num1;
  }

  num1 = convertToNumber(num1);
  let answer = 0;
  let tens = 0;

  //12 * 25 = (12 * 5) + (12 * 20)
  while (num2 > 0) {
    const digit = num2 % 10;
    num2 = Math.floor(num2 / 10);
    answer += num1 * digit * Math.pow(10, tens++);
  }

  return convertToString(answer);
};

//since we can't use parseInt?
function convertToNumber(n) {
  let answer = 0;
  let tens = 0;

  for (let i = n.length - 1; i >= 0; i--) {
    const digit = n.charCodeAt(i) - OFFSET;
    answer += digit * Math.pow(10, tens++);
  }

  return answer;
}

//since we can't use toString?
function convertToString(n) {
  let answer = [];

  while (n > 0) {
    answer.unshift(n % 10);
    n = Math.floor(n / 10);
  }

  return answer.join('');
}

console.log(multiply('2', '3')); //6
console.log(multiply('123', '456')); //56088
console.log(multiply('123456789', '987654321')); //"121932631112635269"