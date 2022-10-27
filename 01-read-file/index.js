const fs = require('fs');
const path = require('path');

let fileName = path.join(__dirname + '\\text.txt');
let reader = fs.createReadStream(fileName, 'utf-8');
let data = '';

reader.on('data', function (chunk) {
    console.log(chunk += data);
});