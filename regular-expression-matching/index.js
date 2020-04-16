function isMatch(string, regex) {
  if (regex === '.*') {
    return true;
  }
  if (!regex) {
    return !string;
  }

  const firstMatch = string.length > 0 && (regex[0] === string[0] || regex[0] === '.');

  if (regex.length >= 2 && regex[1] === '*') {
    return (isMatch(string, regex.slice(2))) || //disregard it entirely
      (firstMatch && isMatch(string.slice(1), regex));
  }

  return firstMatch && isMatch(string.slice(1), regex.slice(1));
}

console.log(isMatch('aa', 'a')); //false
console.log(isMatch('aab', 'c*a*b')); // true
console.log(isMatch('ab', '.*')); // true
console.log(isMatch('aa', 'a*b*c*')); //true
console.log(isMatch('mississippi', 'mis*is*p*.')); //false
console.log(isMatch('ab', '.*c')); // false
console.log(isMatch('aaa', 'a*a')); //true