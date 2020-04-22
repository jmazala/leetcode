function subarraySum(nums, k) {
  let currentSum = 0;
  const hash = { 0: 1 }; //seen sum of 0 one time so far.  0 elements chosen
  let answer = 0;

  for (let i = 0; i < nums.length; i++) {
    currentSum += nums[i];
    answer += hash[currentSum - k] || 0;
    hash[currentSum] = hash[currentSum] || 0;
    hash[currentSum]++;
  }

  return answer;
}