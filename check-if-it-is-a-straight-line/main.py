class Solution:
    def checkStraightLine(self, coordinates: List[List[int]]) -> bool:
        if (len(coordinates) < 2):
            return False

        if (len(coordinates) == 2):
            return True

        # calculate the slope of the line dY/dX
        dX = coordinates[1][0] - coordinates[0][0]

        """
        a vertical line is a valid test case
        but results in divide by 0
        deal with that case here
        """
        if (dX == 0):
            x = coordinates[0][0]
            for i in range(1, len(coordinates)):
                if coordinates[i][0] != x:
                    return False

            return True

        # horizontal line doesn't divide by 0 so no custom case
        dY = coordinates[1][1] - coordinates[0][1]
        slope = dY / dX

        for i in range(2, len(coordinates)):
            dY = coordinates[i][1] - coordinates[i-1][1]
            dX = coordinates[i][0] - coordinates[i-1][0]

            if (dX == 0 or (dY / dX) != slope):
                return False

        return True