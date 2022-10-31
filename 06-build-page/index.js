const fs = require('fs').promises;
const path = require('path');

const wayProject = path.join(__dirname, 'project-dist');
const folderName = 'assets';
const wayAssets = path.join(__dirname, folderName);
const wayStyles = path.join(__dirname, 'styles');

async function createPage() {
  await generateComponents();
}

async function generateComponents() {
  const currentHtml = await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  const components = await readComponents();
  const updatedHtml = components.reduce((acc, comp) => acc.replace(comp.tag, comp.template), currentHtml);

  await fs.mkdir(wayProject, { recursive: true });
  await fs.writeFile(path.join(wayProject, 'index.html'), updatedHtml);
  await mergeStyles(wayStyles, wayProject);
  await copyFolder(wayAssets, path.join(__dirname, 'project-dist', folderName));
}

async function readComponents() {
  const compWay = path.join(__dirname, 'components'); 
  const compFiles = await fs.readdir(compWay);
  const compPromises = compFiles.map((fileName) => fs.readFile(path.join(compWay, fileName), 'utf-8'));
  const compTemplates = await Promise.all(compPromises);
  const components = compFiles.map((fileName, i) => ({tag: getCompTag(fileName), template: compTemplates[i]}));

  return components;
}

async function mergeStyles(wayStyles, wayProject) {
  const files = await fs.readdir(wayStyles);
  const cssFiles = files.filter((fileName) => path.extname(fileName) === '.css');
  const cssFilesPromises = cssFiles.map((fileName) => fs.readFile(path.join(wayStyles, fileName), 'utf8'));
  const cssFilesData = await Promise.all(cssFilesPromises);
  const content = cssFilesData.join('\n');

  return fs.writeFile(path.join(wayProject, 'style.css'), content);
}

async function copyFolder(folderPath, copyPath) {
  await fs.mkdir(copyPath, { recursive: true });

  const contentInfoList = await fs.readdir(folderPath, { withFileTypes: true });

  const operationsPromises = contentInfoList.map((info) => {
    const sourcePath = path.join(folderPath, info.name);
    const targetPath = path.join(copyPath, info.name);

    return info.isDirectory() ? copyFolder(sourcePath, targetPath) : fs.copyFile(sourcePath, targetPath);
  });
  
  return Promise.all(operationsPromises);
}

function getCompTag(fileName) {
  return `{{${fileName.replace('.html', '')}}}`;
}

createPage();
console.log('Wow, сreated new project with all styles!')