const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantsSchema = Schema({
    nickname: {type:String, required:true},
	species: String,
	water: String,
    sunlight: String,
    image: String
});

const Plants = mongoose.model('Plants', plantsSchema);

module.exports = Plants;
