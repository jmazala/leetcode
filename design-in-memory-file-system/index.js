const SEPARATOR = '/';

const File = function (name) {
  this.name = name;
  this.contents = '';
  return this;
};

File.prototype.addContent = function (contents) {
  this.contents += contents;
};

File.prototype.getName = function () {
  return this.name;
};

const Folder = function (path) {
  this.path = path;
  this.fileMap = {};
  this.folderMap = {};
  return this;
};

Folder.prototype.makeSubdirectory = function (path) {
  let subFolderPath = [this.path, path].join(SEPARATOR);
  if (this.path === '/') {
    subFolderPath = this.path + path;
  }

  this.folderMap[path] = new Folder(subFolderPath);
};

Folder.prototype.hasSubFolder = function (path) {
  return path in this.folderMap;
};

Folder.prototype.getSubFolder = function (path) {
  return this.folderMap[path];
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

Folder.prototype.getFiles = function () {
  return Object.keys(this.fileMap);
};

Folder.prototype.getSubFolders = function () {
  return Object.keys(this.folderMap);
};

const FileSystem = function () {
  this.fileMap = {};
  this.folderMap = { '/': new Folder('/') };
  return this;
};

/**
 * @param {string} path
 * @return {string[]}
 */
FileSystem.prototype.ls = function (path) {
  let output = [];
  let folder;

  if (path === '/') {
    folder = this.getBaseDir();
    if (!folder) {
      return output;
    }

    output = output.concat(folder.getFiles());
    output = output.concat(folder.getSubFolders());
  } else {
    const subPaths = path.split(SEPARATOR);
    const finalSubPath = subPaths.pop();
    folder = this.getSubFolder(subPaths);
    if (folder.hasSubFolder(finalSubPath)) {
      folder = folder.getSubFolder(finalSubPath);
      output = output.concat(folder.getFiles());
      output = output.concat(folder.getSubFolders());
    } else {
      output = [folder.getFile(finalSubPath).getName()];
    }
  }

  return output.sort();
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
    return;
  }

  const subPaths = path.split(SEPARATOR);
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
console.log(JSON.stringify(fs.ls('/'))); // []
fs.mkdir('/a/b/c');
fs.addContentToFile('/a/b/c/d', 'hello');
console.log(fs.readContentFromFile('/a/b/c/d')); // hello
fs.addContentToFile('/a/b/c/d', ' world');
console.log(fs.readContentFromFile('/a/b/c/d')); // hello world
console.log(JSON.stringify(fs.ls('/a/b/c'))); // 'd'
console.log(JSON.stringify(fs.ls('/'))); // ['a']

const fs2 = new FileSystem();
console.log(JSON.stringify(fs2.ls('/'))); // []
fs2.mkdir('/a/b/c');
fs2.addContentToFile('/a/b/c/d', 'hello');
console.log(JSON.stringify(fs2.ls('/'))); // ["a"]
console.log(fs2.readContentFromFile('/a/b/c/d')); // hello

const fs3 = new FileSystem();
fs3.mkdir('/goowmfn');
console.log(JSON.stringify(fs3.ls('/goowmfn'))); // []
console.log(JSON.stringify(fs3.ls('/'))); // ["goowmfn"]
fs3.mkdir('/z');
console.log(JSON.stringify(fs3.ls('/'))); // ["goodwmfn", "z"]
console.log(JSON.stringify(fs3.ls('/'))); // ["goodwmfn", "z"]
fs3.addContentToFile('/goowmfn/c', 'shetopcy');
console.log(JSON.stringify(fs3.ls('/z'))); // []
console.log(JSON.stringify(fs3.ls('/goowmfn/c'))); // ["c"]
console.log(JSON.stringify(fs3.ls('/goowmfn'))); // ["c"]

const fs4 = new FileSystem();
console.log(JSON.stringify(fs4.ls('/')));
console.log(JSON.stringify(fs4.ls('/')));
console.log(JSON.stringify(fs4.ls('/')));
console.log(JSON.stringify(fs4.ls('/')));
console.log(JSON.stringify(fs4.ls('/')));
fs4.addContentToFile('bne', 'kvo');
console.log(fs4.readContentFromFile('/bne'));
console.log(fs4.readContentFromFile('/bne'));
console.log(JSON.stringify(fs4.ls('/')));
