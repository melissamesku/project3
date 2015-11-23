$(function() {
console.log('js loaded');

// SIGN-UP BUTTON
$('#sign-up').click(function(){
  console.log('clicked sign-up');
  signUpForm();
  // $('#sign-up').hide();
});

// LOG-IN BUTTON
$('#log-in').click(function(){
  console.log('clicked log-in');
  loginForm();
  // $('#log-in').hide();
});

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
	// formContainer.empty();

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

    // get main page form goes here
    // formContainer.empty();
    formContainer.append("<p>"+data+"</p>");

	}).fail(function(){
		var template = Handlebars.compile($('#status-template').html());
		formContainer.append(template("try again"));
	}); // end fail
}; //end loginPost
// END LOGIN ---------------------
