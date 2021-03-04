const mongoose = require('mongoose')

//add new ref to passport-local-mongoose: special model to manage user AUTH
const plm = require('passport-local-mongoose')

//create schema

var userSchema = new mongoose.Schema({
    username: String,
    password: String
})

//use passport-local-mongoose to indicate this is a special Auth model
userSchema.plugin(plm)


//make public by exporting
module.exports = mongoose.model("User", userSchema)