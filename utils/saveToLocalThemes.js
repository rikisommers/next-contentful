// saveToLocalThemes.js
// Usage: node utils/saveToLocalThemes.js <themeKey> <themeDataJsonFile>
// Example: node utils/saveToLocalThemes.js dark ./themeData.json

const fs = require('fs');
const path = require('path');

const themeFilePath = path.join(__dirname, 'theme.js');

function updateThemeInFile(themeKey, newThemeData) {
  let fileContent = fs.readFileSync(themeFilePath, 'utf8');

  // Find the themes object
  const themesStart = fileContent.indexOf('export const themes = {');
  if (themesStart === -1) {
    console.error('Could not find themes object in theme.js');
    process.exit(1);
  }

  // Use regex to find the theme block
  const themeRegex = new RegExp(`${themeKey}: {([\s\S]*?)}(,|\n)`, 'm');
  const match = fileContent.match(themeRegex);
  if (!match) {
    console.error(`Theme key '${themeKey}' not found in theme.js`);
    process.exit(1);
  }

  // Build new theme block
  const newThemeBlock = `${themeKey}: ${JSON.stringify({ name: themeKey, data: newThemeData }, null, 2)},`;

  // Replace old theme block
  fileContent = fileContent.replace(themeRegex, newThemeBlock + '\n');

  fs.writeFileSync(themeFilePath, fileContent, 'utf8');
  console.log(`Theme '${themeKey}' updated successfully in theme.js`);
}

// CLI usage
if (require.main === module) {
  const [,, themeKey, themeDataFile] = process.argv;
  if (!themeKey || !themeDataFile) {
    console.error('Usage: node utils/saveToLocalThemes.js <themeKey> <themeDataJsonFile>');
    process.exit(1);
  }
  const themeData = JSON.parse(fs.readFileSync(themeDataFile, 'utf8'));
  updateThemeInFile(themeKey, themeData);
}

module.exports = { updateThemeInFile }; 