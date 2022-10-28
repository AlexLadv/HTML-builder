const fs = require('fs');
const path = require('path');

const wayCopyFolder = path.join(__dirname, 'files-copy');
const wayFolder = path.join(__dirname, 'files');

fs.mkdir(wayCopyFolder, { recursive: true }, error);
dirCleanUp(wayCopyFolder);
copyDir();

function copyDir() {
  fs.readdir(wayFolder, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(err);
    }

    files.forEach((file) => {
      let way = path.join(wayFolder, file.name);
      let copyWay = path.join(wayCopyFolder, file.name);

      fs.copyFile(way, copyWay, error);      
    });
  });

  console.log('New folder created and files copied');
}

function dirCleanUp(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(dir, file), error);
    }
  });
}

function error(err) {
  if (err) {
    console.error(err);
  }
}

