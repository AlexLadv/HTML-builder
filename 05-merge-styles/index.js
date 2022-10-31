const fs = require('fs').promises;
const path = require('path');
const wayCurrentStyles = path.join(__dirname, 'styles');
const wayProject = path.join(__dirname, 'project-dist');

async function bundleStyles() {
  await mergeStyles();
}

async function mergeStyles() {
  const files = await fs.readdir(wayCurrentStyles);

  const cssFiles = files.filter((fileName) => path.extname(fileName) === '.css');

  const cssFilesData = cssFiles.map((fileName) => fs.readFile(path.join(wayCurrentStyles, fileName), 'utf8'));

  const cssFilesDataPromises = await Promise.all(cssFilesData);
  
  const content = cssFilesDataPromises.join('\n');

  return fs.writeFile(path.join(wayProject, 'bundle.css'), content);
}

bundleStyles();
console.log('Wow, сreated bundle.css with all styles!')