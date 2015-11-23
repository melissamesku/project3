// DEPENDENCIES
var express      = require('express'),
    mongoose     = require('mongoose'),
    bodyParser   = require('body-parser'),
    md5          = require('md5'),
    cookieParser = require('cookie-parser');
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
    // email: req.body.email,
    // age: req.body.age,
    // location: req.body.location
  });

  console.log("secrets " + user.secrets);

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
}); // end post

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
}); // end post


// GET QUESTIONS --------------------
app.get('/questions', function(req, res) {
  console.log('got questions request');

	Question.find().then(function(questions) {

    // var shuffle = function(a) {
    //   for(var j, x, i = a.length; i; j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x);
    //   return a;
    // };
    // shuffledDeck = deckOfCards.slice(0);
    // shuffle(shuffledDeck);

    // console.log(questions);

		res.send(questions);
	});
});
