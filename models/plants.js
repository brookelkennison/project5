const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantsSchema = Schema({
    name: {type:String, required:true},
	: String,
	city: String,
    state: String,
	zipcode: Number,
    description: String
});

const Plants = mongoose.model('Plants', plantsSchema);

module.exports = Plants;
