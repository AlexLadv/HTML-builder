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