var mongoose = require('mongoose');

var capsuleSchema = new mongoose.Schema({
	question: Array,
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	date_of_return: Date,
	created_at: { type: Date, default: Date.now }
});

var Capsule = mongoose.model('Capsule', capsuleSchema);
module.exports = Capsule;