/**
 * @param {number} num
 * @return {string}
 */

const HASH = {
  0: 'Zero',
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  5: 'Five',
  6: 'Six',
  7: 'Seven',
  8: 'Eight',
  9: 'Nine',
  10: 'Ten',
  11: 'Eleven',
  12: 'Twelve',
  13: 'Thirteen',
  14: 'Fourteen',
  15: 'Fifteen',
  16: 'Sixteen',
  17: 'Seventeen',
  18: 'Eighteen',
  19: 'Nineteen',
  20: 'Twenty',
  30: 'Thirty',
  40: 'Forty',
  50: 'Fifty',
  80: 'Eighty'
};

var numberToWords = function (num) {
  //single digit is straight forward
  if (num in HASH) {
    return HASH[num];
  }

  //double digits has edge cases
  if (num < 100) {
    if (num % 10 === 0) {
      return [HASH[num / 10], 'ty'].join('');
    }

    const tens = Math.floor(num / 10) * 10;
    const remainder = num % 10;
    const result = [numberToWords(tens)];
    if (remainder > 0) {
      result.push(numberToWords(remainder));
    }

    return result.join(' ');
  }

  //triple digits is first digit + hundred + the 2 digit number
  if (num < 1000) {
    const hundreds = Math.floor(num / 100);
    const remainder = num % 100;
    const result = [HASH[hundreds], 'Hundred'];
    if (remainder > 0) {
      result.push(numberToWords(remainder));
    }
    return result.join(' ');
  }

  //four to six digits is first (up to) 3 digits + thousands + the 3 digit number
  if (num < 1000000) {
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;

    const result = [numberToWords(thousands), 'Thousand'];
    if (remainder > 0) {
      result.push(numberToWords(remainder));
    }

    return result.join(' ');
  }

  if (num < 1000000000) {
    const millions = Math.floor(num / 1000000);
    const remainder = num % 1000000;

    const result = [numberToWords(millions), 'Million'];
    if (remainder > 0) {
      result.push(numberToWords(remainder))
    }

    return result.join(' ');
  }

  if (num < 1000000000000) {
    const billions = Math.floor(num / 1000000000);
    const remainder = num % 1000000000;

    const result = [numberToWords(billions), 'Billion'];
    if (remainder > 0) {
      result.push(numberToWords(remainder))
    }

    return result.join(' ');
  }
};

console.log(numberToWords(0));
console.log(numberToWords(10));
console.log(numberToWords(22));
console.log(numberToWords(456));
console.log(numberToWords(1293));
console.log(numberToWords(10343));
console.log(numberToWords(20012));
console.log(numberToWords(30360));
console.log(numberToWords(345865));
console.log(numberToWords(340865));
console.log(numberToWords(600000));
console.log(numberToWords(7000000));
console.log(numberToWords(7258941));
console.log(numberToWords(7200589410));