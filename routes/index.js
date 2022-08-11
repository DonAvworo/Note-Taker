const express = require('express');
const notes = require('../routes/notes');
const app = express();
app.use('/notes', notes);
module.exports = app;

