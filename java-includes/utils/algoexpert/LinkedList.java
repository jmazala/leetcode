package utils.algoexpert;

public class LinkedList {
  public LinkedList next;
  public int value;

  public LinkedList(int value) {
    this.value = value;
  }

  public int length() {
    LinkedList temp = this;
    int length = 0;
    while (temp != null) {
      length++;
      temp = temp.next;
    }

    return length;
  }

  public LinkedList lastNode() {
    LinkedList temp = this;
    while (temp.next != null) {
      temp = temp.next;
    }

    return temp;
  }

  /**
   * makes a string human readable from the linked list.
   * 
   * @return String
   */
  public String toString() {
    StringBuilder builder = new StringBuilder();
    LinkedList temp = this;

    while (temp != null) {
      builder.append(temp.value);
      temp = temp.next;
      if (temp != null) {
        builder.append(" -> ");
      }
    }

    return builder.toString();
  }
}
