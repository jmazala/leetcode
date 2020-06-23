/**
 * @param {string} S
 * @return {string}
 */
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
const toGoatLatin = function (S) {
  if (!S) {
    return '';
  }

  const words = S.split(' ');

  for (let i = 0; i < words.length; i++) {
    words[i] = goatLatin(words[i], i + 1);
  }

  return words.join(' ');
};

function goatLatin(word, index) {
  word = word.split('');

  if (!VOWELS.has(word[0])) {
    // remove first letter and append it to the end
    word.push(word.shift());
  }

  word = word.concat(['m', 'a']);

  // add one letter 'a' to the end of each word per its word index in the sentence starting with 1
  for (let i = 0; i < index; i++) {
    word.push('a');
  }

  return word.join('');
}

console.log(toGoatLatin('')); // ''
console.log(toGoatLatin('I speak Goat Latin')); // "Imaa peaksmaaa oatGmaaaa atinLmaaaaa"
console.log(toGoatLatin('The quick brown fox jumped over the lazy dog')); // "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa"
