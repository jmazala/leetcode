# https://leetcode.com/problems/design-file-system/

SEPARATOR = "/"


class Path:
    def __init__(self, value):
        self.value = value
        self.paths = {}


class FileSystem:
    def __init__(self):
        self.paths = {"": Path(None)}

    def createPath(self, path: str, value: int) -> bool:
        parts = path.split(SEPARATOR)
        lastPart = parts.pop()
        curPath = self

        for part in parts:
            if part not in curPath.paths:
                return False

            curPath = curPath.paths[part]

        if lastPart in curPath.paths:
            return False

        curPath.paths[lastPart] = Path(value)
        return True

    def get(self, path: str) -> int:
        parts = path.split(SEPARATOR)
        lastPart = parts.pop()
        curPath = self

        for part in parts:
            if part not in curPath.paths:
                return -1

            curPath = curPath.paths[part]

        return curPath.paths[lastPart].value if lastPart in curPath.paths else -1


f = FileSystem()
print(f.createPath("/leet", 1))  # True
print(f.createPath("/leet/code", 2))  # True
print(f.get("/leet/code"))  # 2
print(f.createPath("/c/d", 1))  # False
print(f.get("c"))  # -1
