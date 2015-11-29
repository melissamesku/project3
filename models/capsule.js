var mongoose = require('mongoose');

// SCHEMA
var capsuleSchema = new mongoose.Schema({
	qa: Array,
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	date_of_return: Date,
	created_at: { type: Date, default: Date.now }
});

// CREATE MODEL USING SCHEMA
var Capsule = mongoose.model('Capsule', capsuleSchema);
module.exports = Capsule;
