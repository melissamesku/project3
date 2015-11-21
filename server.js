// DEPENDENCIES
var express      = require('express'),
    mongoose     = require('mongoose'),
    bodyParser   = require('body-parser'),
    md5          = require('md5'),
    cookieParser = require('cookie-parser');
    morgan = require('morgan');

var port         = process.env.PORT || 3000;
var app          = express();

// var User = require('./models/user.js');
// var Wish = require('./models/wish.js');

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

// LOGIN -------------------------
app.post('/login', function(req, res){

  var req_username = req.body.username;
  var req_password= req.body.password;

  User.findOne( {'username' : req_username} ).exec(function(err, user){

    req_password_hash = md5(req_password);

    if (user != null && req_password_hash  == user.password_hash){
      res.cookie("loggedinId", user.id);
      res.send(user);
    } else {
      // res.status(400);
      console.log("let's try this again!");
    }; // end if/else
  }); // end findOne
}); // end post
