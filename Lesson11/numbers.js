const fs = require("fs");
const path = require("path");

const numFilePath = path.join(__dirname, "numbers.txt"); // file content 
const processedNumFilePath = path.join(__dirname, "processed_numbers.txt");
var text;
var numArr;
var count;
var max = -2000000;
var sum = 0;

const readFileAsync = async (pathToFile) => {
    return new Promise((resolve, reject) => {
        fs.readFile(pathToFile, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } 
            console.log(data);
            resolve(data);
            if (pathToFile === numFilePath) {
                text = data.toString();
                count = text.split(" ").length;

                text = text.split(",").join(".");
                numArr = text.split(" ");
                numArr.forEach(element => {
                    if (Number(element) > max) {
                        max = Number(element);
                    }
                    sum += Number(element);
                });
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

readFileAsync(numFilePath)
    .then(() => writeFileAsync(processedNumFilePath, count.toString()))
    .then(() => readFileAsync(processedNumFilePath))
    .then(() => writeFileAsync(numFilePath, text))
    .then(() => appendFileAsync(processedNumFilePath, "\nMaximum number is: " + max.toString()))
    .then(() => appendFileAsync(processedNumFilePath, "\nAverage: " + (sum/count).toString()))
    .then(() => {
        for (let i = 0; i < text.split(" ").length; i++) {
            appendFileAsync(processedNumFilePath, "\n" + (i + 1) + ") " + text.split(" ")[i])
        }
    })


/*
readFileAsync(textFilePath)
    .then(() => writeFileAsync(counFilePath, count.toString()))
    .then(() => readFileAsync(counFilePath))
    .then(() => appendFileAsync(textFilePath, "file file file file content"))
    .then(() => readFileAsync(textFilePath))
    .then(() => writeFileAsync(counFilePath, count.toString()))
    .then(() => readFileAsync(counFilePath))
    .catch((err) => console.log(err))
*/
// .then(() => removeFileAsync(textFilePath))
    