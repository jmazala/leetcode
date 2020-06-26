class Solution:
    # @param {string} num1
    # @param {string} num2
    # @return {string}
    def multiply(self, num1, num2):
        try:
            return "%d" % (int(num1) * int(num2))
        except Exception, e:
            return None
