public class ListNode {
  Integer val;
  ListNode next;

  public ListNode() {
  }

  public ListNode(int x) {
    val = x;
  }

  /**
   * makes a string human readable from the linked list.
   * 
   * @return String
   */
  public String toString() {
    StringBuilder builder = new StringBuilder();
    ListNode temp = this;

    while (temp != null) {
      builder.append(temp.val);
      temp = temp.next;
      if (temp != null) {
        builder.append(" -> ");
      }
    }

    return builder.toString();
  }
}