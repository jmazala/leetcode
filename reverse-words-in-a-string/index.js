/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  s = s.replace(/\s+/g, ' ').trim();
  const array = s.split('');

  //reverse entire thing
  reverseArray(array, 0, array.length - 1);
  let i = 0;
  let start = i;
  while (i < array.length) {
    //go through and reverse word by word
    while (array[i] !== ' ' && i < array.length) {
      i++;
    }

    reverseArray(array, start, i - 1);
    i++;
    start = i;
  }

  return array.join('');
};

function reverseArray(array, start, end) {
  // return array.slice(0, start).concat(array.slice(start, end + 1).reverse()).concat(array.slice(end + 1));
  while (start < end) {
    const temp = array[start];
    array[start] = array[end];
    array[end] = temp;
    start++;
    end--;
  }

  return;
}

console.log(reverseWords('the sky is blue'));
console.log(reverseWords('  hello world!  '));
console.log(reverseWords('a good   example'));
console.log(reverseWords('   one.   +two three?   ~four   !five- '));