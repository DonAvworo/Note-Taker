
const path = require("path") // path is a built-in node module that allows us to join paths together 
module.exports = (app) => { // export the function that takes in the app object and returns a function
  app.get("/notes", (req, res) => { // setup the /notes get route
    res.sendFile(path.join(__dirname, "../public/notes.html")); // send the notes.html file to the client
  });
  app.get("*", (req, res) => { // setup the * get route
    res.sendFile(path.join(__dirname, "../public/index.html")); // send the index.html file to the client
  });
};


