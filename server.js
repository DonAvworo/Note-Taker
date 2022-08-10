
const express = require("express") // require express module and store it in a variable called express
const app = express(); // create an instance of express and store it in a variable called app

const PORT = process.env.PORT || 3001; // set the port to either the PORT environment variable or 8080

app.use(express.urlencoded({ extended: true })); // use the express.urlencoded middleware to parse the body of the request
app.use(express.json());  // use the express.json middleware to parse the body of the request

app.use(express.static("public")); // use the express.static middleware to serve the public folder

require("./routes/api.route")(app); // require the api.routes.js file and pass it the app object
require("./routes/html.route")(app); // require the html.routes.js file and pass it the app object

app.listen(PORT, () => { // listen on the port
  catchErrors(() => { // catch errors in the callback function and log them to the console
    console.log(`Server listening on port ${PORT}`); // log the port to the console
  });
});

