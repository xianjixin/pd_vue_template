const fs = require("fs");
const path = require("path")

exports.getFileNameByPath = (dirPath)=> {
    const fsArray = fs.readdirSync(dirPath);
    const fileNames = [];
    for (let index = 0; index < fsArray.length; index++) {
        const fileState = fs.statSync(`${dirPath}/${fsArray[index]}`);
        if(fileState.isFile()) {
            fileNames.push(path.basename(fsArray[index], path.extname(fsArray[index])))
        }
    }
    return fileNames;
}
