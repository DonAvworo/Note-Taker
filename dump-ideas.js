// TODO DUMP 1
function saveNote (note) { 
    return fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
  }




// TODO DUMP 2
// get the notes from the api endpoint which is in the notes.js file
app.get('/api/notes', (req, res) => { 
  api.getNotes().then((notes) => { 
    res.send(notes);              // send the notes to the client
  }).catch((err) => {             // if there is an error,...
    res.status(500).send(err);    //...send the error to the client
  }).finally(() => {              // finally,...
    res.end();                    // ...end the response
})
});

// get the notes from the db using the api fetch call
app.get('/api/notes', (req, res) => { 
  api.getNotes().then((notes) => {        // get the notes from the api endpoint which is in the notes.js file
    res.send(notes);                      // send the notes to the client
  }).catch((err) => {                     // if there is an error,...
    res.status(500).send(err);            //...send the error to the client
  }).finally(() => {                      // finally,...
    res.end();                            // ...end the response
})
});

/* save the (user input) note to the db by sending a POST request 
to the api endpoint by converting the note to a json string 
(using JSON.stringify)*/
app.post('/api/notes', (req, res) => {  
  api.saveNote(req.body).then((note) => {
    res.send(note);
  }).catch((err) => {
    res.status(500).send(err);
  }).finally(() => {
    res.end();
})
});

/* delete the existing notes stored in api endpoint using the DELETE method */
app.delete('/api/notes/:id', (req, res) => {
  api.deleteNote(req.params.id).then(() => { // delete the existing notes 
    res.end();    
  }).catch((err) => {                    // if there is an error,...
    res.status(500).send(err);           //...send the error to the client
  }).finally(() => {                     // finally,...
    res.end();                           // ...end the response
})
});

// render the active notes to the textarea using the activeNote object
app.get('/api/notes', (req, res) => {
  api.renderActiveNote();
  res.end();
});