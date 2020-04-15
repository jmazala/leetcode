const _ = require('lodash');
/**
 * @param {number} num
 * @return {string[]}
 */

 //JUST DOING ALL CALCULATIONS
var readBinaryWatch = function (num) {
  const minutesToOnes = {};
  const answer = [];
  for (let hour = 0; hour < 12; hour++) {
    const hourOnes = hour.toString(2).split('').filter(i => i === '1').length;
    
    if (hourOnes > num) {
      continue;
    }

    const onesLeft = num - hourOnes;
    
    for (let minute = 0; minute < 60; minute++) {
      if (minutesToOnes[minute] === undefined) {
        minutesToOnes[minute] = minute.toString(2).split('').filter(i => i === '1').length;
      }

      const minuteOnes = minutesToOnes[minute];
      if (minuteOnes === onesLeft) {
        answer.push(`${hour}:${_.padStart(minute, 2, '0')}`);
      }
    }
  }

  return answer;
};

 //WITH PERMUTATIONS
// var readBinaryWatch = function (num) {
//   const answer = [];
//   let hours = [];
//   let minutes = [];

//   for (let i = 0; i <= num; i++) {
//     const onesInHours = i;
//     const onesInMinutes = num - i;
//     permuteHours('0000', 0, i);
//     permuteMinutes('000000', 0, onesInMinutes);

//     hours.forEach(hour => {
//       if (hour >= 12) {
//         return;
//       }

//       minutes.forEach(minute => {
//         if (minute >= 60) {
//           return;
//         }

//         minute = _.padStart(minute, 2, '0')
//         answer.push(`${hour}:${minute}`);
//       });
//     });

//     hours = [];
//     minutes = [];
//   }

//   return answer;

//   function permuteHours(s, index, onesLeft) {
//     if (onesLeft === 0) {
//       hours.push(parseInt(s, 2));
//       return;
//     }

//     if (index === s.length) {
//       return;
//     }

//     //take this char as a 1
//     permuteHours(s.slice(0, index) + '1' + s.slice(index + 1), index + 1, onesLeft - 1);
//     //or don't
//     permuteHours(s, index + 1, onesLeft);
//   }

//   function permuteMinutes(s, index, onesLeft) {
//     if (onesLeft > 6) {
//       console.log('something went wrong');
//       return;
//     }

//     if (onesLeft === 0) {
//       minutes.push(parseInt(s, 2));
//       return;
//     }

//     if (index === s.length) {
//       return;
//     }

//     //take this char as a 1
//     permuteMinutes(s.slice(0, index) + '1' + s.slice(index + 1), index + 1, onesLeft - 1);
//     //or don't
//     permuteMinutes(s, index + 1, onesLeft);
//   }
// };

console.log(readBinaryWatch(1)); //["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]
// console.log(readBinaryWatch(2)); //["0:03","0:05","0:06","0:09","0:10","0:12","0:17","0:18","0:20","0:24","0:33","0:34","0:36","0:40","0:48","1:01","1:02","1:04","1:08","1:16","1:32","2:01","2:02","2:04","2:08","2:16","2:32","3:00","4:01","4:02","4:04","4:08","4:16","4:32","5:00","6:00","8:01","8:02","8:04","8:08","8:16","8:32","9:00","10:00"]