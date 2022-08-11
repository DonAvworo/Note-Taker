const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('uuid'); // Generate a unique id for each note object 

// GET Route for retrieving all the notes
notes.get('/', (req,res) => {
    console.log(`${req.method} request received `); 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(`${req.method} request received`);
    let{ text, title } = req.body;
    if (title && text) {
        let note = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(note, './db/db.json');

        let response = {
            status: 'success',
            body: note,
        };

        res.json(response);
    } else {
        res.json('Error')
    }
    //}
});

notes.delete('/:id', (req, res) => {
    console.log(`${req.method} request received`);
    let { id } = req.params;
    let notes = readFromFile('./db/db.json');
    let newNotes = notes.filter((note) => note.id !== id);
    writeToFile(newNotes, './db/db.json');
    res.json('Note deleted');
});

module.exports = notes;