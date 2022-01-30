const mongoose = require("mongoose") //require our mongose module (used for ease with mongoDB)

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
})


// creating collectins

const User = new mongoose.model("User", userSchema) // creates user collection in the database

module.exports = User // exporting our collection to use in other modules