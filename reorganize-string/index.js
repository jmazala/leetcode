/**
 * @param {string} S
 * @return {string}
 */
const reorganizeString = S => {
  if (!S.length) {
    return '';
  }

  if (S.length == 1 ||
    (S.length == 2 && S[0] !== S[1])
  ) {
    return S;
  }

  const charCounts = {};

  for (let i = 0; i < S.length; i++) {
    charCounts[S[i]] = charCounts[S[i]] || 0;
    charCounts[S[i]]++;
  }

  let index = 0;
  let answer = '';
  /*
  * this is a greedy problem.
  * just grab the most frequent char first
  * unless it's the last character added to answer
  * otherwies grab 2nd most
  * repeat
  */

  console.log(charCounts);
  while (answer.length < S.length) {
    const sortedChars = getSortedChars();
    if (sortedChars.length == 1 && sortedChars[0] == answer[answer.length - 1]) {
      return '';
    }

    const c1 = sortedChars[0];
    const c2 = sortedChars[1];

    if (!c2) {
      answer += c1;
    } else {
      if (answer[answer.length - 1] === c1) {
        answer += `${c2}${c1}`;
      } else {
        answer += `${c1}${c2}`;
      }
    }

    [c1, c2].forEach(c => {
      if (!c) {
        return;
      }
      charCounts[c]--;
      if (!charCounts[c]) {
        delete charCounts[c];
      }
    });
  }

  return answer;

  function getSortedChars() {
    return Object.keys(charCounts).sort((a, b) => {
      return charCounts[b] - charCounts[a];
    });
  }
};

console.log(reorganizeString('aab'));
console.log(reorganizeString('aaab'));