// //10 -> J
// //11 -> AA / K
// //12 -> AB / L
// //13 -> AC / M
// //14 -> AD / N
// //15 -> AE / O
// //16 -> AF / P
// //17 -> AG / Q
// //18 -> AH / R
// //19 -> AI / S
// //20 -> T
// //21 -> BA / U
// //22 -> BB / V
// //23 -> BC / W
// //24 -> BD / X
// //25 -> BE / Y
// //26 -> BF / Z
// //27 -> BG
// //... 99 -> II

// /**
//  * @param {string} s
//  * @return {number}
//  */
const numDecodings = function (s) {
  if (s[0] === '0') {
    return 0;
  }

  const dp = Array(s.length + 1).fill(0);
  dp[0] = 1; // number of ways to decode a string of length 0... only 1 way.
  // number of ways to decode a string of length 1... also only 1 way
  // this is because we checked for first char 0 above.  ruins decoding of any string length
  dp[1] = 1;

  for (let i = 2; i <= s.length; i++) {
    const oneDigit = parseInt(s.slice(i - 1, i), 10);
    const twoDigit = parseInt(s.slice(i - 2, i), 10);

    // do they have mappings?
    if (oneDigit >= 1) {
      dp[i] += dp[i - 1];
    }

    if (twoDigit >= 10 && twoDigit <= 26) {
      dp[i] += dp[i - 2];
    }
  }

  return dp[s.length];
};

// const DECODE = {
//   1: 'A',
//   2: 'B',
//   3: 'C',
//   4: 'D',
//   5: 'E',
//   6: 'F',
//   7: 'G',
//   8: 'H',
//   9: 'I',
//   10: 'J',
//   11: 'K',
//   12: 'L',
//   13: 'M',
//   14: 'N',
//   15: 'O',
//   16: 'P',
//   17: 'Q',
//   18: 'R',
//   19: 'S',
//   20: 'T',
//   21: 'U',
//   22: 'V',
//   23: 'W',
//   24: 'X',
//   25: 'Y',
//   26: 'Z'
// };

// const answer = new Set();

// var numDecodings = function (s) {
//   helper(s);
//   return answer.size;
// };

// const helper = (s) => {
//   if (!s) { //can't decode empty string
//     return;
//   }

//   if (s.length === 1) { //can only do a 1 digit string 1 way
//     if (s === '0') {
//       return;
//     }

//     return answer.add(DECODE[s]);
//   }

//   if (s.length === 2) {
//     if (parseInt(s) % 10 === 0) {
//       return answer.add(DECODE[s]);
//     }

//     if (s[0] === '0') {
//       return numDecodings(s[1]);
//     }

//     if (s[1] === '0') {
//       return numDecodings(s[0]);
//     }

//     answer.add(DECODE[s[0]] + DECODE[s[1]]);
//     answer.add(DECODE[s]);
//     return;
//   }

//   return helper(s[0]) + helper(s.slice(0, 2)) + helper(s.slice(1, 3)) + helper(s[2]) + helper(s.slice(3));
// }

// USING RECURSION
// var numDecodings = function (s) {
//   if (s.length === 1 && s[0] !== '0') {
//     return 1;
//   }

//   if (s.length === 2) {
//     if (s[0] === '0') {
//       return numDecodings(s[1]);
//     }

//     if (parseInt(s) >= 10 && parseInt(s) <= 26) {
//       //10 = 'A_' OR 'J'
//       return 2; //11 = 'AA' OR 'K'
//     }
//   }

//   if (s[0] === '0') {
//     return numDecodings(s.slice(1));
//   }

//   return 1 + numDecodings(s.slice(1));
// };

// //USING RECURSION
// var numDecodings = function (s) {
//   return helper(s);
// };

// const helper = data => {
//   if (!data) {
//     return 1;
//   }

//   if (data[0] === '0') {
//     return 0;
//   }

//   if (data.length === 1) {
//     return 1;
//   }

//   if (data.length === 2) {
//     if (parseInt(data) > 10 && parseInt(data) <= 26) {
//       return 2;
//     }

//     return 1;
//   }

//   return helper(data.slice(0, 2)) + helper(data.slice(2));
// };

// console.log(numDecodings('10'));
// console.log(numDecodings('100'));
// console.log(numDecodings('111'));
// console.log(numDecodings('12'));
// console.log(numDecodings('226'));
console.log(numDecodings('2685'));
// console.log(numDecodings('2263'));
// console.log(numDecodings('0111'));
