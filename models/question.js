var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
	question: String
});

var Question = mongoose.model('Question', questionSchema);
module.exports = Question;