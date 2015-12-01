// ======================================
// Note on running seed
// ======================================
// Include the following line in server.js (comment it out).
// Uncomment to run seed, then re-comment in order to prevent
// the seed from running multiple times.

// var seed = require('./seed.js');
// ======================================
// ======================================

// REQUIRE MONGOOSE AND MODELS
var mongoose = require('mongoose'),
    User = require('./models/user.js'),
    Question = require('./models/question.js'),
    Capsule = require('./models/capsule.js');

// DATABASE
mongoose.connect('mongodb://localhost/timecapsule_app'), function(err) {
	if(err) {
		console.log('Connection error: ', err);
	} else {
		console.log('Connection successful');
	}
};

// SEED
// create questions
var question1 = new Question({
	question: "What advice would you give your future self?"
});

var question2 = new Question({
	question: "What style trend will embarrass you in the future?"
});

var question3 = new Question({
	question: "What's the biggest current domestic political issue?"
});

var question4 = new Question({
	question: "What's the biggest current international political issue?"
});

var question5 = new Question({
	question: "What the best movie you've seen lately? Why did you like it?"
});

var question6 = new Question({
	question: "What's your favorite book? Why?"
});

var question7 = new Question({
	question: "What was your favorite recent accomplishment, big or small?"
});

var question8 = new Question({
	question: "What is one amazing thing you expect to do in the near future?"
});

var question9 = new Question({
	question: "What technological innovation would you like to see?"
});

var question10 = new Question({
	question: "How would you spend an ideal day?"
});

var question11 = new Question({
	question: "What work of art will remain important to you in the future?"
});

var question12 = new Question({
	question: "What musical artist will surely still be around in five years?"
});

var question13 = new Question({
	question: "What makes you laugh the most?"
});

var question14 = new Question({
	question: "How might your close friends describe you?"
});

var question15 = new Question({
	question: "Do you hope to stay where you are now or move somewhere else?"
});

var question16 = new Question({
	question: "What do you predict will be made legal in the future?"
});

var question17 = new Question({
	question: "How do you get most of your news?"
});

var question18 = new Question({
	question: "What is your greatest talent? How'd you get so good at it?"
});

var question19 = new Question({
	question: "What should you throw away, but probably never will?"
});

var question20 = new Question({
	question: "What's your favorite website or app?"
});

var question21 = new Question({
	question: "Will the world improve or get worse during your lifetime?"
});

var question22 = new Question({
	question: "How was last Saturday night? Any plans for next Saturday?"
});

var question23 = new Question({
	question: "What's an important historical event you've lived through?"
});

var question24 = new Question({
	question: "Where do you go to recharge your energy?"
});

// save questions to database
question1.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question1);
});

question2.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question2);
});

question3.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question3);
});

question4.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question4);
});

question5.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question5);
});

question6.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question6);
});

question7.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question7);
});

question8.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question8);
});

question9.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question9);
});

question10.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question10);
});

question11.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question11);
});

question12.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question12);
});

question13.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question13);
});

question14.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question14);
});

question15.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question15);
});

question16.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question16);
});

question17.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question17);
});

question18.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question18);
});

question19.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question19);
});

question20.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question20);
});

question21.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question21);
});

question22.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question22);
});

question23.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question23);
});

question24.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: " + question24);
});
