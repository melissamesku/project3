var mongoose = require('mongoose');

// SCHEMA
var capsuleSchema = new mongoose.Schema({
	qa: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'Question',
		question: String,
		answer: String
	}],
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	date_of_return: Date,
	created_at: { type: Date, default: Date.now }
});

// CREATE MODEL USING SCHEMA
var Capsule = mongoose.model('Capsule', capsuleSchema);
module.exports = Capsule;
