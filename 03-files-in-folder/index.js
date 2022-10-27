const fs = require('fs');
const path = require('path');

const way = path.join(__dirname, '/secret-folder');

fs.readdir(way, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => result(file));
});

function result(fileDir) {
  fs.stat(path.join(way, `/${fileDir.name}`), (err, stats) => {
    if (err) throw err;
    if (fileDir.isFile()) {
      const type = path.extname(fileDir.name);
      const name = path.basename(fileDir.name, type);
      const weight = (stats.size / 1024).toFixed(2);

      console.log(`${name} - ${type.replace('.','')} - ${weight} kb`);
    }
  });
}

// const {stat} = require('fs');
// const {readdir} = require('fs/promises');
// const path = require('path');

// let filename = __dirname + '\\secret-folder';
// let way = path.join(filename);

// readdir(way, { withFileTypes: true }).then(data => data.forEach(files => {

//     let currentWay = path.join(way, files.name);

//     if (files.isFile()) {
//         stat(currentWay, (err, stats) => {
//             if (stats) {

//                 let nameFile = files.name.split('.')[0];
//                 let extFile = path.extname(currentWay).slice(1);
//                 let sizeFile = (stats.size / 1024).toFixed(3);

//                 return console.log(`${nameFile} - ${extFile} - ${sizeFile}kb`);
//             } else {
//                 return console.log(err.message);
//             }
//         });
//     }

// }));