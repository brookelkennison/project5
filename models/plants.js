const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantsSchema = Schema({
    nickName: {type:String, required:true},
	scientificName: String,
	water: String,
    sun: String,
});

const Plants = mongoose.model('Plants', plantsSchema);

module.exports = Plants;
