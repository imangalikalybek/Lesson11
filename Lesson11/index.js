const fs = require("fs");
const path = require("path");

const textFilePath = path.join(__dirname, "text.txt"); // file content 
const counFilePath = path.join(__dirname, "count.txt");
var text;
var count;

const readFileAsync = async (pathToFile) => {
    return new Promise((resolve, reject) => {
        fs.readFile(pathToFile, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } 
            console.log(data);
            resolve(data);
            if (pathToFile === textFilePath) {
                text = data.toString();
                count = text.split(" ").length;
            }
        })
    })
}

const writeFileAsync = async (pathToFile, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(pathToFile, data, (err, data) => {
            if (err) {
                reject(err);
            } 
            resolve(data);
        })
    })
}

const appendFileAsync = async (pathToFile, data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(pathToFile, data, (err, data) => {
            if (err) {
                reject(err);
            } 
            resolve(data);
        })
    })
}

const removeFileAsync = async (pathToFile) => {
    return new Promise((resolve, reject) => {
        fs.rm(pathToFile,(err, data) => {
            if (err) {
                reject(err);
            } 
            resolve(data);
        })
    })
}

readFileAsync(textFilePath)
    .then(() => writeFileAsync(counFilePath, count.toString()))
    .then(() => readFileAsync(counFilePath))
    .then(() => appendFileAsync(textFilePath, "file file file file content"))
    .then(() => readFileAsync(textFilePath))
    .then(() => writeFileAsync(counFilePath, count.toString()))
    .then(() => readFileAsync(counFilePath))
    .catch((err) => console.log(err))

// .then(() => removeFileAsync(textFilePath))








/*
fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    } 
    console.log(data);
})
*/


/* 
console.log(1);
console.log(2);

setTimeout(() => {
    console.log("+++")
}, 1000)

console.log(3);
console.log(4);
*/ 


