/**
 * @param {number} n
 * @return {string[]}
 */
const STROBOGRAMMATIC = {
  '0': '0',
  '1': '1',
  '6': '9',
  '8': '8',
  '9': '6',
};

// 0 => []
// 1 => [0, 1, 8]
// 2 => [11, 69, 88, 96]
// 3 => ["101","111","181","609","619","689","808","818","888","906","916","986"]
// 4 => ["1001","1111","1691","1881","1961","6009","6119","6699","6889","6969","8008","8118","8698","8888","8968","9006","9116","9696","9886","9966"]

// for each of findStrobogrammtic(n-1), wedge strobogrammatic(n-2) in between
// how to make findStrobogrammatic(n=3)
// 11 => 101, 111, 181
// 69 => 609, 619, 689
// 88 => 808, 818, 888
// 96 => 906, 916, 986

// how to make findStrobogrammatic(n=4)
// (n=2) foreach(i):  first = i[0], last = i[1].  (['00'].concat(n=2)).foreach(j)  push(first + j + last);
// 11 => 1(00)1, 1(11)1, 1(69)1, 1(88)1, 1(96)1
// 69 => 6(00)9, 6(11)9, 6(69)9, 6(88)9, 6(96)9
// 88 => 8(00)8, 8(11)8, 8(69)8, 8(88)8, 8(96)8
// 96 => 9(00)9, 9(11)6, 9(69)6, 9(88)6, 9(96)6

// USING BACKTRACKING
const findStrobogrammatic = function (n) {
  const answer = [];

  if (n === 0) {
    return answer;
  }

  // array placeholder of length n to generate
  // strobogrammatic strings in
  const arr = Array(n);
  helper(arr, 0, n - 1);
  return answer;

  function helper(chs, low, high) {
    // base case for backtracking
    if (low > high) {
      // only time a leading 0 is acceptable is when it's just '0'
      // if (chs[0] === '0' && chs.length > 1) {
      //   return;
      // }

      if (chs[0] !== '0' || chs.length === 1) {
        answer.push(chs.join(''));
      }

      return;
    }

    for (const [key, value] of Object.entries(STROBOGRAMMATIC)) {
      // in the middle of odd length string we can only stick a 0, 1, or 8
      if (low === high && key !== value) {
        continue;
      }

      // when we start off it's like 1xxx1, 6xxx9, 8xxxx8, 9xxxx6
      // all the 0 prefixed strings (expect '0') will get filtered out in the base case
      chs[low] = key;
      chs[high] = value;
      helper(chs, low + 1, high - 1);
    }
  }
};

// console.log(JSON.stringify(findStrobogrammatic(0))); // []
// console.log(JSON.stringify(findStrobogrammatic(1))); // ['0', '1', '8']
// console.log(JSON.stringify(findStrobogrammatic(2))); // ["11","69","88","96"]
console.log(JSON.stringify(findStrobogrammatic(3))); // ["101","111","181","609","619","689","808","818","888","906","916","986"]
console.log(JSON.stringify(findStrobogrammatic(4))); // ["1001","1111","1691","1881","1961","6009","6119","6699","6889","6969","8008","8118","8698","8888","8968","9006","9116","9696","9886","9966"]
// console.log(JSON.stringify(findStrobogrammatic(6))); // ["100001","101101","106901","108801","109601","110011","111111","116911","118811","119611","160091","161191","166991","168891","169691","180081","181181","186981","188881","189681","190061","191161","196961","198861","199661","600009","601109","606909","608809","609609","610019","611119","616919","618819","619619","660099","661199","666999","668899","669699","680089","681189","686989","688889","689689","690069","691169","696969","698869","699669","800008","801108","806908","808808","809608","810018","811118","816918","818818","819618","860098","861198","866998","868898","869698","880088","881188","886988","888888","889688","890068","891168","896968","898868","899668","900006","901106","906906","908806","909606","910016","911116","916916","918816","919616","960096","961196","966996","968896","969696","980086","981186","986986","988886","989686","990066","991166","996966","998866","999666"]
