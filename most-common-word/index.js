/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function (paragraph, banned) {
  const hash = {};
  const match = paragraph.match(/(\w+)/g);
  let answer = '';
  let maxCount = -1;
  if (match) {
    match.forEach(word => {
      word = word.toLowerCase();
      if (banned.indexOf(word) === -1) {
        hash[word] = hash[word] || 0;
        hash[word]++;

        if (hash[word] > maxCount) {
          maxCount = hash[word];
          answer = word;
        }
      }
    });
  }

  return answer;
};