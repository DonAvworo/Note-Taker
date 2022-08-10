const fs = require('fs');
const util = require('util');

// module.exports = () => {                            // export the function that takes in the app object and returns a function
//   const readFile = util.promisify(fs.readFile);     // promisify the readFile method and store it in a variable called readFile
//   const writeFile = util.promisify(fs.writeFile);   // promisify the writeFile method and store it in a variable called writeFile
//   const appendFile = util.promisify(fs.appendFile); // promisify the appendFile method and store it in a variable called appendFile
//   const readdir = util.promisify(fs.readdir);       // promisify the readdir method and store it in a variable called readdir
//   if (err) {                                        // if there is an error
//       console.error(err);                           // log the error to the console
//   }
//   else if (!fs.existsSync('./data')) {              // if the data folder doesn't exist
//       fs.mkdirSync('./data');                       // create the data folder
//   }
//   return { readFile, writeFile, appendFile, readdir, stat }; // return the readFile, writeFile, appendFile, readdir, and stat variables
// };


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


