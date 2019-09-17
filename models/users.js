const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const plantsSchema = require("./plants.js").schema;

const userSchema = Schema({
    username: {type:String},
    password: {type:String},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
