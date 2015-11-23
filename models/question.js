var mongoose = require('mongoose');

// SCHEMA
var questionSchema = new mongoose.Schema({
	question: String
});

// CREATE MODEL USING SCHEMA
var Question = mongoose.model('Question', questionSchema);
module.exports = Question;