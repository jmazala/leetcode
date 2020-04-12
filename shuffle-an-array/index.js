const _ = require('lodash');

/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
  this.nums = nums;
  this.original = Array.from(nums);
  return this;
};

/**
* Resets the array to its original configuration and return it.
* @return {number[]}
*/
Solution.prototype.reset = function () {
  this.nums = Array.from(this.original);
  return this.nums;
};

/**
* Returns a random shuffling of the array.
* @return {number[]}
*/
Solution.prototype.shuffle = function () {
  //Write down the numbers from 1 through N.
  const answer = [];
  let numRemaining = this.nums.length;
  //Repeat from step 2 until all the numbers have been struck out.
  while (numRemaining > 0) {
    //Pick a random number k between one and the number of unstruck numbers remaining (inclusive).
    let k = _.random(1, numRemaining);
    let i = 0;
    //Counting from the low end, strike out the kth number not yet struck out, and write it down at the end of a separate list.
    while (k > 0) {
      if (this.nums[i] !== null) {
        k--;
      }
      i++;
    }

    answer.unshift(this.nums[i - 1]);
    this.nums[i - 1] = null;
    numRemaining--;
  }

  //The sequence of numbers written down in step 3 is now a random permutation of the original numbers.
  this.nums = Array.from(answer);
  return this.nums;
};

/**
* Your Solution object will be instantiated and called as such:
* var obj = new Solution(nums)
* var param_1 = obj.reset()
* var param_2 = obj.shuffle()
*/
const s = new Solution([1, 2, 3]);
s.shuffle();
console.log(s.nums);
console.log(s.reset());
console.log(s.nums);