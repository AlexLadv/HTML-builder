const fs = require('fs');
const path = require('path');

let fileName = path.join(__dirname + '\\text.txt');
let output = fs.createWriteStream(fileName, 'utf-8');

const process = require('process');

process.stdout.write('Hi, how are you studying at RSSchool?\n');

process.on('SIGINT', function () {
    process.exit();
});

process.stdin.on('data', function (print) {
    print === 'exit' ? process.exit() : output.write(print);
});

process.on('exit', function () {
    process.stdout.write('You are already leaving, well, bye!\n');
});