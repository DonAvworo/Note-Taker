const path = require("path");


module.exports = (app) => {
  app.get("/notes", (req, res) => { // get the notes page
    res.sendFile(path.join(__dirname, "../public/notes.html")); // send the notes.html file
  })}; 

  app.get("*", (req, res) => { // get the index page if the route is not found
  
    res.sendFile(path.join(__dirname, "../public/index.html")); // send the index.html file
});

