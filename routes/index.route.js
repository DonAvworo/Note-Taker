
const express = require('express');// import nodejs module (express) that allows us to create a server
const noteTakerRoute = require('./notes.route'); // require the notes route file
const app = express(); // create an instance of express
app.use('/notes', noteTakerRoute); // use the notes route file
module.exports = app; // export the app object
