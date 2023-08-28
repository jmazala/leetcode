# https://leetcode.com/problems/design-in-memory-file-system/description/

from typing import List

SEPARATOR = "/"


class File:
    def __init__(self, name: str, contents: str):
        self.name = name
        self.contents = contents

    def addContent(self, content: str):
        self.contents += content


class Folder:
    def __init__(self, path: str):
        self.path = path
        self.files = {}
        self.folders = {}

    def makeSubDir(self, path: str):
        subFolderPath = (
            SEPARATOR.join([self.path, path])
            if self.path != SEPARATOR
            else self.path + path
        )
        self.folders[path] = Folder(subFolderPath)

    def getSubDir(self, path):
        return self.folders[path]

    def addFile(self, name, contents):
        self.files[name] = File(name, contents)


class FileSystem:
    def __init__(self):
        self.files = {}
        self.folders = {"": Folder(SEPARATOR)}
        return

    def ls(self, path: str) -> List[str]:
        curFolder = self
        parts = path.split(SEPARATOR)
        lastPart = parts.pop()

        for part in parts:
            curFolder = curFolder.folders[part]

        if lastPart in curFolder.files:
            return [lastPart]

        if lastPart in curFolder.folders:
            curFolder = curFolder.folders[lastPart]
            return sorted(list(curFolder.files.keys()) + list(curFolder.folders.keys()))

        if lastPart == "":
            return sorted(list(curFolder.files.keys()) + list(curFolder.folders.keys()))

        return []

    def mkdir(self, path: str) -> None:
        if path == SEPARATOR:
            return

        curFolder = self
        parts = path.split(SEPARATOR)
        for part in parts:
            if part not in curFolder.folders:
                curFolder.makeSubDir(part)

            curFolder = curFolder.folders[part]

    def addContentToFile(self, filePath: str, content: str) -> None:
        curFolder = self
        parts = filePath.split(SEPARATOR)
        fileName = parts.pop()

        for part in parts:
            curFolder = curFolder.folders[part]

        if fileName not in curFolder.files:
            curFolder.addFile(fileName, content)
        else:
            curFolder.files[fileName].addContent(content)

    def readContentFromFile(self, filePath: str) -> str:
        curFolder = self
        parts = filePath.split(SEPARATOR)
        fileName = parts.pop()

        for part in parts:
            curFolder = curFolder.folders[part]

        return curFolder.files[fileName].contents


# obj = FileSystem()
# print(obj.ls("/"))  # []
# obj.mkdir("/a/b/c")  # null
# obj.addContentToFile("/a/b/c/d", "hello")  # null
# print(obj.ls("/"))  # ["a"]
# print(obj.readContentFromFile("/a/b/c/d"))  # hello
# print(obj.ls("/"))  # ["a"]
# print(obj.ls("/a/b/c"))  # ["d"]
# obj.mkdir("/a/b/c/f")
# obj.mkdir("/a/b/c/e")
# print(obj.ls("/a/b/c"))  # ["d", "e", "f"]
# print(obj.ls("/a/b/c/g"))  # []

obj2 = FileSystem()
obj2.mkdir("/m")
print(obj2.ls("/m"))  # []
obj2.mkdir("/w")
print(obj2.ls("/"))  # ['m', 'w']
print(obj2.ls("/w"))  # []
print(obj2.ls("/"))  # ['m', 'w']
obj2.addContentToFile("/dycete", "emer")
print(obj2.ls("/w"))  # []
print(obj2.ls("/"))  # ['dycete', 'm', 'w']
print(obj2.ls("/dycete"))  # ['dycete']
print(obj2.ls("/w"))  # []
