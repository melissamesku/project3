$(function() {
console.log('js loaded');

  if (Cookies.get("loggedinId") != undefined) {
    console.log("already logged in")
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

// GLOBAL VARIABLES --------------
var user = null;
var formContainer = $('#form-container');

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
	formContainer.empty();

 var template =
 Handlebars.compile($('#boxes-template').html());
 formContainer.append(template);

  $(data).each(function (index) {
    console.log(this.question);
  });
  // console.log(data);

	// $('.box').click(function() {
  //   var $id = $(this).attr("data-id");
  //   console.log($id);
	// });
}; // end renderQuestions



// // ACCORDION -------------------
// $(function() {
//     $( "#accordion" ).accordion({
//       collapsible: true
//     });
//   }); // end accordion
