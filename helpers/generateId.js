//generate a random id for the note object

Math.floor((1 + Math.random()) * 0x10000) // generate a random number
.toString(16) // convert it to a hexadecimal string 
.substring(1); // remove the leading '0' from the string

// export the function that takes in the app object and returns a function
module.exports
    