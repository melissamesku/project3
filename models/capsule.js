var mongoose = require('mongoose');

var capsuleSchema = new mongoose.Schema({
	question: Array,
	date_of_return: Date,
	created_at: Date
});

var Capsule = mongoose.model('Capsule', capsuleSchema);
module.exports = Capsule;