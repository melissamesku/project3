var mongoose = require('mongoose');
var capsuleSchema = require('./capsule').schema;

var userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true };
	email: { type: String, required: true, unique: true },
	password_hash: String,
	age: Number,
	location: String,
	time_capsule: [capsuleSchema],
	created_at: Date
});

var User = mongoose.model('User', userSchema);
module.exports = User;