class Solution {
  public List<List<Integer>> combinationSum2(int[] candidates, int target) {
      List<List<Integer>> result = new ArrayList<>();
      Arrays.sort(candidates);
      
      //recursive function to do all the combinations i.e. meat of this problem
      findCombinations(candidates, 0, target, new ArrayList<Integer>(), result);
      
      return result;
  }
  
  public void findCombinations(int[] candidates, int index, int target, List<Integer> current, List<List<Integer>> result) {
      //check condition we're looking for
      if (target == 0) {
          //base case to stop recursion
          result.add(new ArrayList<>(current));
          return;
      }
      
      if (target < 0) {
          return;
      }
      
      //simulate for every number take it or not take it
      for (int i = index; i < candidates.length; i++) {
          if (i == index || candidates[i] != candidates[i-1]) {
              current.add(candidates[i]);
              findCombinations(candidates, i+1, target - candidates[i], current, result);
              current.remove(current.size() - 1);
          }
      }
  }
}