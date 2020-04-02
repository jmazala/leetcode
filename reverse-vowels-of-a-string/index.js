/**
 * @param {string} s
 * @return {string}
 */
//USING A STACK
// var reverseVowels = function (s) {
//   //put them on a stack
//   const array = Array.from(s);
//   const stack = [];
//   for (let i = 0; i < array.length; i++) {
//     if (['a', 'e', 'i', 'o', 'u'].indexOf(array[i].toLowerCase()) > -1) {
//       stack.push(array[i]);
//       delete array[i];
//     }
//   }

//   for (let i = 0; i < array.length; i++) {
//     if (!array[i]) {
//       array[i] = stack.pop();
//     }
//   }

//   return array.join('');
// };

//using 2 pointers
var reverseVowels = function (s) {
  //put them on a stack
  const VOWELS = ['a', 'e', 'i', 'o', 'u'];
  const array = Array.from(s);
  const stack = [];
  let i = 0;
  let j = array.length - 1;
  while (i < j) {
    const iIsVowel = VOWELS.indexOf(array[i].toLowerCase()) > -1;
    const jIsVowel = VOWELS.indexOf(array[j].toLowerCase()) > -1;
    if (iIsVowel && jIsVowel) {
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      i++;
      j--;
    } else if (iIsVowel) {
      j--;
    } else {
      i++;
    }
  }

  return array.join('');
};



console.log(reverseVowels("hello"));