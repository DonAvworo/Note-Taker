// file path for dependencies
const fs = require("fs");                               // file system module
const generateUniqueId = require("generateId");         // require the generateId module and store it in a variable called generateUniqueId
const editNote = (updatedNotesArray) => {
  fs.writeFile("./db/db.json", JSON.stringify(updatedNotesArray), (err) => { // Write the updated notes array to the db.json file.
    if (err) throw err;
  });
};

// export the function that takes in the app object
module.exports = (app) => { 
  app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => { // Read the db.json file and return all saved notes as JSON.
      if (err) throw err;                                // If there is an error, throw it.    
      res.json(JSON.parse(data));                        // return the data as JSON
    });
  });
 
  app.post("/api/notes", (req, res) => {                  // Create a new note
    const newNote = req.body;                             // get the new note from the request body
    fs.readFile("./db/db.json", "utf8", (err, data) => {  // Read the db.json file and return all saved notes as JSON.
      if (err) throw err;                                 // If there is an error, throw it.
      const notesArr = JSON.parse(data);                  // Parse the data into an array.
      newNote.id = generateUniqueId({ length: 5});      // Generate a unique id for the new note using the generateId module and store it in the newNote object with the key of id  and length of 5.
      notesArr.push(newNote);                             // Push the new note into the notes array.  This will add the new note to the end of the array.

      editNote(notesArr);                                   // edit the notes array and write it to the db.json file
      console.log(                                        // log the new note to the console
        `New Note Added! Title: ${JSON.stringify( 
          newNote.title
        )}, Text: ${JSON.stringify(newNote.text)}, ID: ${newNote.id}`
      );

      res.send(notesArr);
    });
  });

  app.delete("/api/notes/:id", (req, res) => { //
    const deleteId = req.params.id;                     // get the id from the request params object and store it in a variable called deleteId
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;                               // if there is an error, throw it
      let notesArr = JSON.parse(data);                  // parse the data and store it in a variable called notesArr
      for (let i = 0; i < notesArr.length; i++) {       // loop through the notesArr array
        if (notesArr[i].id === deleteId) {              // if the id of the current note matches the id of the note to be deleted
          notesArr.splice(i, 1);                        // remove the note from the array at the current index position (i) and 1 item (1) from the array (i.e. the note)
        }                                               // splice is a method that removes items from an array
      }
      editNote(notesArr);                               // edit the notes array and write it to the db.json file
      console.log(`Note Deleted! Note ID: ${deleteId}`);
      res.send(notesArr);                               // return the updated notes array
    });
  });

  
  //edit the note with the id of the note to be updated
  app.put("/api/notes/:id", (req, res) => {               // Update a note with a given id 
    const editId = req.params.id;                         // get the id from the request params object and store it in a variable called editId

    fs.readFile("./db/db.json", "utf8", (err, data) => {  // Read the db.json file and return all saved notes as JSON.
      if (err) throw err;                                 // If there is an error, throw it.
      let notesArr = JSON.parse(data);                    // parse the data and store it in a variable called notesArr
      let selectedNote = notesArr.find((note) => note.id === editId);

      // check if found
      if (selectedNote) {
        let updatedNote = {
          title: req.body.title,                           // set value of `title` get from req
          text: req.body.text,                             // set value of `text` get from req
          id: selectedNote.id,
        };
        //  find index at which the item is stored in the array
        let targetIndex = notesArr.indexOf(selectedNote);

        //  replace object data with `updatedNote` object
        notesArr.splice(targetIndex, 1, updatedNote);

        res.sendStatus(204);
        editNote(notesArr);
        res.json(notesArr);
      } else {
        res.sendStatus(404);
      }
    });
  });
};