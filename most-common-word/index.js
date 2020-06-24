/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
const mostCommonWord = function (paragraph, banned) {
  const hash = {};
  const match = paragraph.match(/(\w+)/g);
  banned = new Set(banned);

  let answer = '';
  let maxCount = -1;

  if (match) {
    for (let word of match) {
      word = word.toLowerCase();
      if (banned.has(word)) {
        continue;
      }

      hash[word] = hash[word] || 0;
      hash[word]++;

      if (hash[word] > maxCount) {
        maxCount = hash[word];
        answer = word;
      }
    }
  }

  return answer;
};

console.log(
  mostCommonWord('Bob hit a ball, the hit BALL flew far after it was hit.', [
    'hit',
  ])
); // ball
