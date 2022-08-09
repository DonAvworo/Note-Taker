const notes = require('express').Router();
const generateId = require('../helpers/generateId');
const { readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');


notes.get('/', (req,res) => {
    console.info(`${req.method} has been request received `);
    
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
  console.info(`${req.method} has been request received`);
  const { title,text } = req.body;
  if (title && text) {
    const noteText = {
    title,
    text,
    text_id: generateId(),
   };
    readAndAppend(noteText, './db/db.json');
  
    const response = {
    status: 'success',
    body: noteText,
    };
    
    res.json(response);
    } else {
      res.json('Error in posting text');
    }
  });
  
  notes.delete('/:text_id', (req, res) => {

    const delTextId = req.params.text_id;
    
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        
        const response = json.filter((notes) => notes.text_id !== delTextId);
  
        writeToFile('./db/db.json', response);
  
        res.json(`Item ${delTextId} has been deleted `);
      });
});


 
  module.exports = notes;

