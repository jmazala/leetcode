const END_OF_DAY = stringToTime('23:59');

function stringToTime(string) {
  const [hours, minutes] = string.split(':');
  return parseInt(hours) * 60 + parseInt(minutes);
};

const timeToString = time => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}:${minutes}`;
};

//METHOD ONE;  ALL POSSIBLE TIMES AND CHECK IF IT'S VALID GIVEN OUR DIGITS
const nextClosestTime = time => {
  const startTime = stringToTime(time);
  const digits = new Set([time[0], time[1], time[3], time[4]]);
  for (let i = startTime + 1; i < END_OF_DAY; i++) {
    const cur = timeToString(i);
    if (digits.has(cur[0]) && digits.has(cur[1]) && digits.has(cur[3]) && digits.has(cur[4])) {
      return cur;
    }
  }

  for (let i = 0; i < startTime; i++) {
    const cur = timeToString(i);
    if (digits.has(cur[0]) && digits.has(cur[1]) && digits.has(cur[3]) && digits.has(cur[4])) {
      return cur;
    }
  }
}

//METHOD TWO:  ALL POSSIBLE COMBOS OF OUR DIGITS AND CHECK IF IT'S A VALID TIME
// const nextClosestTime = time => {  
//   //generate all permutations and disregard invalid times
//   const digits = Array.from(new Set([time[0], time[1], time[3], time[4]]));
//   const combos = [];
//   getPermutations(4, '');
//   const startTime = stringToTime(time);
//   let minDifference = Number.MAX_SAFE_INTEGER;
//   let answer;
  
//   combos.forEach(combo => {
//     const nextTime = stringToTime(combo.slice(0, 2) + ':' + combo.slice(2));
//     if (nextTime === startTime) {
//       return;
//     }
    
//     let curDifference;
//     if (nextTime < startTime) {
//       curDifference = (END_OF_DAY - startTime) + nextTime;
//     } else {
//       curDifference = nextTime - startTime;
//     }
//     if (curDifference < minDifference) {
//       minDifference = curDifference;
//       answer = nextTime;
//     }
//   });

//   return timeToString(answer);

//   function getPermutations(length, prefix = '') {
//     if (length === 0) {
//       if (isValidHours(prefix.slice(0, 2)) && isValidMinutes(prefix.slice(2))) {
//         combos.push(prefix);
//       }

//       return;
//     }

//     for (let i = 0; i < digits.length; i++) {
//       newPrefix = prefix + digits[i];
//       getPermutations(length - 1, newPrefix);
//     }
//   };
// };

const isValidMinutes = s => {
  return parseInt(s) >= 0 && parseInt(s) <= 59;
};

const isValidHours = s => {
  return parseInt(s) >= 0 && parseInt(s) <= 23;
};

console.log(nextClosestTime('19:34'));
console.log(nextClosestTime('23:59'));