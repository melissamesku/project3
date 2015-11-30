// DEPENDENCIES
var express      = require('express'),
    mongoose     = require('mongoose'),
    bodyParser   = require('body-parser'),
    md5          = require('md5'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan');


var port         = process.env.PORT || 3000;
var app          = express();

var User = require('./models/user');
var Capsule = require('./models/capsule');
var Question = require('./models/question');

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser());

// DATABASE
mongoose.connect('mongodb://localhost/timecapsule_app');

// LISTENER
app.listen(port);
console.log('server working');

// POST SIGN-UP -----------------------
app.post('/users', function(req, res) {

// console.log("at users post");

  var password_hash = md5(req.body.password);

  var user = new User({
    username: req.body.username,
    password_hash: password_hash,
    email: req.body.email,
    age: req.body.age,
    location: req.body.location
  });

  user.save(function(err) {
    if (err) {
      console.log(err);
      res.statusCode = 503;
    } else {
      console.log(user.username + " created server side");

      res.cookie("loggedinId", user.id);

      res.send(user);
    }; // end if/else
  }); // end save
}); // end sign-up

// POST LOGIN -------------------------
app.post('/login', function(req, res){

  var req_username = req.body.username;
  var req_password= req.body.password;

  console.log('username '+req_username);
  console.log('password '+req_password);

  req_password_hash = md5(req_password);

  User.findOne( {'username' : req_username} ).exec(function(err, user){

    if (user != null && req_password_hash  == user.password_hash){
      res.cookie("loggedinId", user.id);
      res.send(user);
    } else {
      // res.status(400);
      console.log("let's try this again!");
    }; // end if/else
  }); // end findOne
}); // end login

// GET USER -----------------------
// gets and sends user info
app.get('/user/:id', function(req, res) {
	User.findById(req.params.id).then(function(user) {
		res.send(user);
	});
});

// EDIT USER -----------------------
app.put('/user/:id', function(req, res) {

console.log("got user edit request")

	User.findOneAndUpdate( {_id: req.params.id}, req.body, function(err, user) {
    console.log('User Updated');
		res.send(user);
	});
});


// DELETE USER ---------------------
app.delete('/user/:id', function(req, res) {
  console.log('got delete request on server');

	User.findOneAndRemove({_id: req.params.id}, function(err) {
    console.log('user deleted from db');
		res.clearCookie('loggedinId');
    console.log('user cookie cleared');
    res.send();
	});
});

// GET QUESTIONS --------------------
app.get('/questions', function(req, res) {
  console.log('got questions request');

	Question.find().then(function(questions) {

    console.log("sending "+questions.length+" questions");

		res.send(questions);
	});
});


// need to correct with foreign keys
// NEW CAPSULE --------------
app.post('/capsules', function(req, res) {

console.log("making new capsule");
// console.log("THIS IS THE REQ: " + req);
console.log(req.body);

var capsule = new Capsule({
  qa: req.body,
  user: req.cookies.loggedinId,
  // date: req.body.date,
});
// console.log("server capsule data: "+capsule);

  capsule.save( function(err, capsule) {
    if (err) {
      console.log(err);
      res.statusCode = 503;
    } else {
      console.log('after save');

      //setting capsule cookie
      res.cookie("currentCapsule", capsule.id);

      res.send(capsule);
    }; // end if/else
  }); // end save
}); // end post time-capsule

// ADD TO CAPSULE ---------------
app.put('/capsules/:id', function(req, res) {

console.log("adding to current capsule");

	Capsule.findByIdAndUpdate(
    req.params.id,
    {$push: {qa: req.body}},
    {safe: true, upsert: true},
    function(err, capsule) {
    console.log(capsule);
		res.send(capsule);
	});
});

// GET TIME-CAPSULES ---------------
app.get('/capsules/:id', function(req, res) {
  console.log('got time capsules request');

	Capsule.find({ 'user': req.params.id }).exec(function(err, capsules) {

    console.log('sending time capsules');

		res.send(capsules);
	});
});
