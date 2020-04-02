class Solution {
  public int totalFruit(int[] tree) {
    if (tree == null || tree.length == 0) {
      return 0;
    }

    int max = 1;

    // map type of fruit to where it occurred in the area
    HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
    // this seems like dynamic programming starting from the rightmost tree tho

    int i = 0; // slow pointer
    int j = 0; // fast pointer

    while (j < tree.length) {
      // don't have 2 fruit types in baskets yet. just keep going.
      if (map.size() <= 2) {
        // try to take current fruit
        map.put(tree[j], j++); //most recent instance of that fruit goes in the map
      } else {
        // now hit third type of fruit
        int min = tree.length - 1;
        for (int value : map.values()) {
          min = Math.min(min, value); //re start at last instance of earliest fruit
        }

        i = min + 1; //start after that tree
        map.remove(tree[min]); //forget about soonest fruit
      }

      //we pick 1 fruit per space, so subtracting indices is enough
      max = Math.max(max, j - i);
    }

    return max;
  }
}