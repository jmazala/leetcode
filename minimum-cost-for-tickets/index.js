/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function (days, costs) {
  const DURATIONS = [1, 7, 30];

  if (days.length === 0) {
    return 0;
  }

  if (days.length === 1) {
    return costs[0];
  }

  const memo = Array(days.length);
  return helper(0);

  function helper(i) {
    //base case
    if (i >= days.length) {
      return 0;
    }

    if (memo[i]) {
      return memo[i];
    }

    const currentDay = days[i];
    let cost = Infinity;
    let j = i + 1;
    for (let k = 0; k < 3; k++) {
      const ticketLength = DURATIONS[k];
      const ticketCost = costs[k];
      const maxDay = currentDay + ticketLength;

      while (j < days.length) {
        const nextDay = days[j];
        if (nextDay < maxDay) {
          j++;
        } else {
          break;
        }
      }

      cost = Math.min(cost, helper(j) + ticketCost);
    }

    memo[i] = cost;
    return cost;
  }
};

console.log(mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15]));