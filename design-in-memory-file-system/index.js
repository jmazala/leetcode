const SEPARATOR = '/';

const File = function (name) {
  this.name = name;
  this.contents = '';
  return this;
};

File.prototype.addContent = function (contents) {
  this.contents += contents;
};

const Folder = function (path) {
  this.path = path;
  this.fileMap = {};
  this.subFolders = {};
  return this;
};

Folder.prototype.makeSubdirectory = function (path) {
  let subFolderPath = [this.path, path].join(SEPARATOR);
  if (this.path === '/') {
    subFolderPath = this.path + path;
  }

  this.subFolders[path] = new Folder(subFolderPath);
};

Folder.prototype.hasSubFolder = function (path) {
  return path in this.subFolders;
};

Folder.prototype.getSubFolder = function (path) {
  return this.subFolders[path];
};

Folder.prototype.hasFile = function (fileName) {
  return fileName in this.fileMap;
};

Folder.prototype.createFile = function (fileName) {
  this.fileMap[fileName] = new File(fileName);
};

Folder.prototype.getFile = function (fileName) {
  return this.fileMap[fileName];
};

const FileSystem = function () {
  this.fileMap = {};
  this.folderMap = {};
  return this;
};

/**
 * @param {string} path
 * @return {string[]}
 */
FileSystem.prototype.ls = function (path) {};

FileSystem.prototype.createBaseDir = function () {
  this.folderMap['/'] = this.folderMap['/'] || new Folder('/');
};

FileSystem.prototype.getBaseDir = function () {
  return this.folderMap['/'];
};

/**
 * @param {string} path
 * @return {void}
 */
FileSystem.prototype.mkdir = function (path) {
  if (path === '/') {
    this.createBaseDir();
    return;
  }

  const subPaths = path.split(SEPARATOR);
  if (!this.getBaseDir()) {
    this.createBaseDir();
  }

  let folder = this.getBaseDir();

  for (let i = 1; i < subPaths.length; i++) {
    const subFolder = subPaths[i];
    if (!folder.hasSubFolder(subFolder)) {
      folder.makeSubdirectory(subFolder);
    }

    folder = folder.getSubFolder(subFolder);
  }
};

/**
 * @param {string} filePath
 * @param {string} content
 * @return {void}
 */
FileSystem.prototype.addContentToFile = function (filePath, content) {
  const subPaths = filePath.split(SEPARATOR);
  const fileName = subPaths.pop();
  const folder = this.getSubFolder(subPaths);
  if (!folder.hasFile(fileName)) {
    folder.createFile(fileName);
  }

  const file = folder.getFile(fileName);
  file.addContent(content);
};

/**
 * @param {string} filePath
 * @return {string}
 */
FileSystem.prototype.readContentFromFile = function (filePath) {
  const subPaths = filePath.split(SEPARATOR);
  const fileName = subPaths.pop();
  const folder = this.getSubFolder(subPaths);
  const file = folder.getFile(fileName);
  return file.contents;
};

FileSystem.prototype.getSubFolder = function (subPaths) {
  let folder = this.getBaseDir();
  // TODO:  if !folder, throw error or something

  for (let i = 1; i < subPaths.length; i++) {
    const subFolder = subPaths[i];
    folder = folder.getSubFolder(subFolder);
    // TODO:  if !folder, throw error or something
  }

  return folder;
};

/**
 * Your FileSystem object will be instantiated and called as such:
 * var obj = new FileSystem()
 * var param_1 = obj.ls(path)
 * obj.mkdir(path)
 * obj.addContentToFile(filePath,content)
 * var param_4 = obj.readContentFromFile(filePath)
 */

const fs = new FileSystem();
fs.mkdir('/');
fs.mkdir('/a/b/c');
fs.addContentToFile('/a/b/c/d', 'hello');
console.log(fs.readContentFromFile('/a/b/c/d')); // hello
fs.addContentToFile('/a/b/c/d', ' world');
console.log(fs.readContentFromFile('/a/b/c/d')); // hello world
