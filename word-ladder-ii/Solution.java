import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;

// USING BFS ENTIRELY (should do BFS + DFS)
// BFS to find shortest path, then DFS to find all the other paths only looking
// until that length
class Solution {
  class QueueItem {
    String word;
    int steps;
    Set<String> visited;

    public QueueItem(String word, Set<String> visited) {
      this.word = word;
      this.visited = new LinkedHashSet<>(visited);
      this.visited.add(word);
    }
  }

  private Map<String, List<String>> preProcess(int length, List<String> wordList) {
    // Dictionary to hold combination of words that can be formed,
    // from any given word. By changing one letter at a time.
    // Key is the generic word
    // Value is a list of words which have the same intermediate generic word.
    Map<String, List<String>> dictionary = new HashMap<>();

    for (String word : wordList) { // O(N) for this loop
      for (int i = 0; i < length; i++) { // O(M) for this loop
        // O(M) operation bc immutable strings
        String newWord = word.substring(0, i) + '*' + word.substring(i + 1, length);

        List<String> transformations = dictionary.getOrDefault(newWord, new ArrayList<>());
        transformations.add(word);
        dictionary.put(newWord, transformations);
      }
    }

    return dictionary;
  }

  public List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {
    List<List<String>> answer = new ArrayList<>();
    int shortestSequenceLength = Integer.MAX_VALUE;
    int length = beginWord.length();
    Map<String, List<String>> dictionary = preProcess(length, wordList);

    // Queue for BFS
    Queue<QueueItem> queue = new LinkedList<>();
    Set<String> beginSet = new LinkedHashSet<>();
    queue.add(new QueueItem(beginWord, beginSet));

    while (!queue.isEmpty()) {
      QueueItem node = queue.remove();
      String word = node.word;
      Set<String> visited = node.visited;

      if (visited.size() == shortestSequenceLength) {
        continue; // no point in BFSing further
      }

      for (int i = 0; i < length; i++) {
        if (visited.size() == shortestSequenceLength) {
          break; // no point in BFSing further
        }

        String newWord = word.substring(0, i) + '*' + word.substring(i + 1, length);

        // Next states are all the words which share the same intermediate state.
        for (String adjacentWord : dictionary.getOrDefault(newWord, new ArrayList<>())) {
          if (visited.contains(adjacentWord)) {
            continue;
          }

          // If at any point if we find what we are looking for
          // i.e. the end word - we can return with the answer.
          if (adjacentWord.equals(endWord)) {
            visited.add(adjacentWord);

            int sequenceLength = visited.size();
            if (sequenceLength < shortestSequenceLength) {
              shortestSequenceLength = sequenceLength;
              answer = new ArrayList<>();
            }

            List<String> sequence = new ArrayList<>();
            sequence.addAll(visited);
            answer.add(sequence);
            break;
          } else {
            queue.add(new QueueItem(adjacentWord, visited));
          }
        }
      }
    }

    return answer;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    List<String> wordList1 = Arrays.asList(new String[] { "hot", "dot", "dog", "lot", "log", "cog" });

    // [[hit, hot, dot, dog, cog], [hit, hot, lot, log, cog]]
    System.out.println(s.findLadders("hit", "cog", wordList1));

    List<String> wordList2 = Arrays.asList(new String[] { "hot", "dot", "dog", "lot", "log" });
    // []
    System.out.println(s.findLadders("hit", "cog", wordList2));
  }
}