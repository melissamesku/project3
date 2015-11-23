var mongoose = require('mongoose');
var capsuleSchema = require('./capsule').schema;

// SCHEMA
var userSchema = new mongoose.Schema({

	username: { type: String, required: true, unique: true };
	email: type: String,
	password_hash: { type: String, required: true },
	age: Number,
	location: String,
	time_capsules: [capsuleSchema],
	created_at: { type:Date, default: Date.now }
});

// CREATE MODEL USING SCHEMA
var User = mongoose.model('User', userSchema);
module.exports = User;
