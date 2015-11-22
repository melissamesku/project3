var mongoose = require('mongoose');
var capsuleSchema = require('./capsule').schema;

var userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true };
	email: { type: String, required: true, unique: true },
	password_hash: String,
	age: Number,
	location: String,
	time_capsules: [capsuleSchema],
	created_at: { type:Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);
module.exports = User;