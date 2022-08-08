// create routes to json file

// create hadlers for icons/buttons 

let noteTitle = document.getElementById
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {  // if the user is on the notes page
  noteTitle = document.querySelector('.note-title'); // get the note title
  noteText = document.querySelector('.note-textarea'); // get the note text
  saveNoteBtn = document.querySelector('.save-note'); // get the save note button
  newNoteBtn = document.querySelector('.new-note'); // get the new note button
  noteList = document.querySelectorAll('.list-container .list-group'); // get the note list
}

// this is a function that shows an element (can use the visibility = 'visible'  or  display = 'block' )
// Show an element 
const show = (elem) => {  //
  elem.style.display = 'inline';  // show the element
}; 

// this function will show the elemennt (can use the visibility = 'hidden')
// Hide an element
const hide = (elem) => { 
  elem.style.display = 'none'; // hide the element
};

/* activeNote is used to keep track of the note in the textarea so that it can
be rendered in the textarea when the user clicks a note in the list*/
let activeNote = {};

// get the notes from the db using the api fetch call 
const getNotes = () => 
  fetch('/api/notes', { // fetch the notes from the api endpoint which is in the notes.js file
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

/*save the (user input) note to the db by sending a POST request to the 
api endpoint by converting the note to a json string (using JSON.stringify) 
a method of converting a JavaScript object to a JSON string*/ 
const saveNote = (note) => //TODO: SEE DUMP 1 in dump-notes.js
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

// delete the existing notes stored in api endpoint using the DELETE method 
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

// this will render the active notes to the textarea using the activeNote object 
const renderActiveNote = () => { 
  hide(saveNoteBtn);
  
  // if the activeNote object is empty, then the user can enter a new note
  if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } 
  
  // if the activeNote object is not empty, then the user can edit the note 
  else { 
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

// if the user clicks the save button, then the note will be saved to the db
const handleNoteSave = () => { 
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

// if the user clicks the save button, then the note will be saved to the db 
// requires the handleNoteSave function to be called using the event listener (onclick = handleNoteSave (DOM event)) 
const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();
