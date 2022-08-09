const fs = require('fs');
const util = require('util');


// Promisify the readFile function 
const readfile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };

// module.exports = () => {
//     const readFile = util.promisify(fs.readFile); 
//     const writeFile = util.promisify(fs.writeFile); 
//     const appendFile = util.promisify(fs.appendFile);
//     const readdir = util.promisify(fs.readdir);
//     if (err) {
//         console.error(err);
//     }
//     else if (!fs.existsSync('./data')) {
//         fs.mkdirSync('./data');
//     }
//     return { readFile, writeFile, appendFile, readdir, stat };
// }
