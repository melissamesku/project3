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

console.log(obj);

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
