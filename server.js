//create variables for the Path (Dependent on the page (depenncies))
const express = require('express'); // import nodejs module (express) that allows us to create a server
const app = express(); // create an instance of express
// const api = require('./api');
const port = process.env.PORT || 3001;

app.use(express.json());                          // use the express json middleware to parse the body of the request
app.use(express.urlencoded({ extended: true }));  // use the express urlencoded middleware to parse the body of the request
app.use(express.static('public'));                // use the express static middleware to serve the public folder

require('./routes/api.routes')(app); // require the routes file and pass in the app object
require('./routes/html.routes')(app); // require the routes file and pass in the app object

// listen on the port specified in the environment variable PORT or 3001 if not specified
app.listen(port, () => console.log(`Listening on port ${port}`)); 

