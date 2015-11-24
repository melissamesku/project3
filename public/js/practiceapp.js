$(function() {
console.log('js loaded');

// GLOBAL VARIABLES --------------
var user = null;
var formContainer = $('#form-container');


// SETUP --------------
  if (Cookies.get("loggedinId") != undefined) {
    console.log("already logged in")
    formContainer.empty();
    $('#sign-up').hide();
    $('#log-in').hide();
    getQuestions();
  } else {

    // SIGN-UP BUTTON
    $('#sign-up').click(function(){
      console.log('clicked sign-up');
      signUpForm();
      $('#sign-up').hide();
      $('#log-in').hide();
    });

    // LOG-IN BUTTON
    $('#log-in').click(function(){
      console.log('clicked log-in');
      loginForm();
      $('#sign-up').hide();
      $('#log-in').hide();
    });

  };

}); // end doc ready


// SIGN-UP -----------------------
var signUpForm = function() {
		console.log('showing sign up form');
		// formContainer.show();

		var template = Handlebars.compile($('#signup-template').html());
		formContainer.append(template);

    // REGISTER BUTTON
		$('#register-button').click(function(){
			console.log('clicked register');
			newUser();
			// $('#sign-up').hide();
		});
	}; // sign up form


var newUser = function() {
	user = {
		username: $('#username').val(),
		password: $('#password').val(),
    // email: 'test@test.com',
    // age: 20,
    // location: 'New York'
	};
	console.log(user.username+" created app side");

	$.ajax({
		url: "http://localhost:3000/users",
		method: "POST",
    dataType: 'json',
		data: user
	}).done(function(data){
    console.log("sent sign-up info to server");
    console.log(data.username+" signup successful");

    // get main page form goes here
    formContainer.empty();
    console.log(data);
    formContainer.append("<p> name: "+data.username+"</p>");
	});

	user = Cookies.get("loggedinId");
}; // end newUser
// END SIGN-UP -----------------------

// LOGIN ---------------------
var loginForm = function() {
	console.log('showing login form');
  var formContainer = $('#form-container');
	formContainer.empty();

	var template = Handlebars.compile($('#login-template').html());
	formContainer.append(template);

  // LOGIN BUTTON - the one on the actual form
	$('#login-button').click(function(){
		console.log('clicked login-button');
		loginPost();
	});
}; // sign up form


var loginPost = function() {
	user = {
		username: $('#username').val(),
		password: $('#password').val(),
	};

	$.ajax({
		url: 'http://localhost:3000/login',
		method: "POST",
		dataType: 'json',
		data: user
	}).done(function(data) {
		console.log("sent login info to server");
		console.log(data.username+" login successful");

		user = Cookies.get("loggedinId");

    var formContainer = $('#form-container');
    formContainer.empty();
    formContainer.append("<p>"+data.username+" logged in.</p>");

    // loads main page
    getQuestions();

	}).fail(function(){
		var template = Handlebars.compile($('#status-template').html());
		formContainer.append(template("try again"));
	}); // end fail
}; //end loginPost
// END LOGIN ---------------------


// GET QUESTIONS ----------------------
var getQuestions = function(){
	console.log("getting questions");
  var formContainer = $('#form-container');

	$.ajax({
		url: 'http://localhost:3000/questions',
		method: 'GET',
		dataType: 'json'
	}).done(function(data) {
    console.log("questions from database gotten");
    renderQuestions(data);
  });
}; // end getQuestions

var renderQuestions = function(data) {
  var formContainer = $('#form-container');
	formContainer.empty();
  console.log('trying to render questions');

  // console.log(data);

  // console.log(data)

var obj = {
  questions: []
};

$.each(data, function(key, value) {
  obj.questions.push(value.question);
});

// console.log(obj);

 var template =
 Handlebars.compile($('#boxes-template').html());
 formContainer.append(template(obj));

  // formContainer.append("Question Data: " + data[0].question);

  // var id = 0;
  //
  // for (i=0; i<data.length; i++) {
  //   formContainer.append("<div class='box' data-id='" + data[i]._id + "'>" + data[i].question + "</div>");
  //   $('.box').click(function() {
  //     id = $(this).attr("data-id");
  //     console.log(id);
  //   });
  //   // console.log(data[i].question);
  // };
  //
  // $(data).each(function (index) {
  //   console.log(this.question);
  // });
  // console.log(data);

}; // end renderQuestions
// END QUESTIONS --------------------



// GET ANSWERS ----------------------

// END ANSWERS ----------------------

// // ACCORDION -------------------
// $(function() {
//     $( "#accordion" ).accordion({
//       collapsible: true
//     });
//   }); // end accordion

/////////////////  NEW SHIT  //////////////////

// EDIT USER -------------------------
var editForm = function() {
	console.log('showing edit form');

  var formContainer = $('#form-container');

	var template = Handlebars.compile($('#edit_user-template').html());
	formContainer.append(template);

  // update button
	$('#update-user-button').click(function(){
		console.log('clicked edit user');
		editUser();
	});
}; // end editForm


var editUser = function() {
	var user_edit = {
		email: $('#email').val(),
		age: $('#age').val(),
    location: $('#location').val(),
	};

	console.log("user edited");

	$.ajax({
		url: "http://localhost:3000/user/"+Cookies.get('loggedinId'),
		method: "PUT",
    dataType: 'json',
		data: user_edit
	}).done(function(data){
    // returns string "User updated"
    console.log(data);
    getQuestions();
  }); // end put
}; // end editUser

// END EDIT UESR ---------------------



// DELETE USER -------------------------

// delete button
$('#delete-user-button').click(function(){
  console.log('clicked delete user');
  deleteUser();
});

var deleteUser = function() {
	var user_edit = {
		email: $('#email').val(),
		age: $('#age').val(),
    location: $('#location').val(),
	};

	console.log("user edited");

  var id = Cookies.get("loggedinId");

	$.ajax({
		url: "http://localhost:3000/user/"+id,
		method: "DELETE",
    // dataType: 'json',
		// data: user_edit
	}).done(function(data){
    // returns string "Account Deleted"
    console.log(data);
  });

}; // end editUser

// END DELETE UESR ---------------------


// GET CAPSULES  ----------------------
var getCapsules = function(){
	console.log("getting capsules");

	$.ajax({
		url: 'http://localhost:3000/capsules',
		method: 'GET',
		dataType: 'json'
	}).done(function(data) {
    console.log("capsules from database gotten");
    // returns array of capsule objects
    renderCapsules(data);
  });
}; // end getCapsules

var renderCapsules = function(data) {
  var listContainer = $('#list-container');
	listContainer.empty();
  console.log('rendering capsules');

////////////////////
// copy handlebars stuff
// from Melissa's getQuestions
////////////////////

}; // end renderCapsules
// END QUESTIONS --------------------

var answered_questions = [
  // {question: answer}, {question: answer}
];

// CREATE TCs -----------------------
var questionsList = function() {
	console.log('showing questions list');
	var listContainer = $('#list-container');

  if (answered_questions == 0) {
    // show "answer some questions instead of Date / submit buttons
  };

  ////////////////////
  // copy handlebars stuff
  // from Melissa's getQuestions
  // iterate through answered_questions
  ////////////////////

	var template = Handlebars.compile($('#questions-template').html());
	listContainer.append(template());

  ////// need date/calendar or button/input

  // submit button
	$('#submit_capsule-button').click(function(){
		console.log('clicked register');

    var capsule_data = {
      questions: answered_questions,
      user: Cookies.get('loggedinId'),
      date: $('#date').val(), // match date input id
    };

		newCapsule(capsule_data);
	});
}; // sign up form


var newCapsule = function(capsule_data) {
	console.log("capsule created app side");

	$.ajax({
		url: "http://localhost:3000/capsules",
		method: "POST",
    dataType: 'json',
		data: capsule_data
	}).done(function(data){
    console.log("sent capsule to server");
    // returns "capsule creation complete"
    console.log(data);
	});
}; // end newCapsule
// END CREATE TCs -----------------------
