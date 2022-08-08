//create variables for the Path2D objects
const express = require('express');
const app = express();
const api = require('./api');
const port = process.env.PORT || 3001;

app.use(express.json()); // use the express json middleware to parse the body of the request
app.use(express.urlencoded({ extended: true })); // use the express urlencoded middleware to parse the body of the request
app.use(express.static('public')); // use the express static middleware to serve the public folder

// get the notes from the api endpoint which is in the notes.js file
app.get('/api/notes', (req, res) => {
  api.getNotes().then((notes) => { // get the notes from the api endpoint which is in the notes.js file
    res.send(notes); // send the notes to the client
  }).catch((err) => { // if there is an error,...
    res.status(500).send(err); //...send the error to the client
  }).finally(() => {  // finally,...
    res.end();  // ...end the response
})
});

// get the notes from the db using the api fetch call