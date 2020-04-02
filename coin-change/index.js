//https://leetcode.com/problems/coin-change/solution/
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
   coins.sort((a,b) => a-b);

   const dp = Array(amount + 1).fill(amount + 1); //fewest number of coins to make i in this array.  start with a static impossible number
   //it can never take amount + 1 coins to make up i because even if we have a penny can't do it
   dp[0] = 0;
   
   for (let i = 1; i <= amount; i++) {
     for (let j = 0; j < coins.length; j++) {
       if (coins[j] <= i) {
         dp[i] = Math.min(dp[i], 1 + dp[i-coins[j]]);
       } else {
         break; //sorted it.  no point going through bigger coins
       }
     }
   }

   return dp[amount] === amount + 1 ? -1 : dp[amount];
};

//smaller sub problems.  0 cents.  1 cent.  2 cents.  etc

// console.log(coinChange([1,2,5], 11));
// console.log(coinChange([2], 3));
console.log(coinChange([186,419,83,408], 6249));
console.log(coinChange([186,419,83,408], 82));

//RUNTIME
//n is amount
//m is number of coins
//O(m log m) to sort coins
//O(n+1) space for the dp array
//O(n) * O(m) to fill it up = O(n)
//constant time to retrieve answer