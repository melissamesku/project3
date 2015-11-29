$(function() {
  console.log('js loaded');

  setUp();

}); // end doc ready

// GLOBAL VARIABLES --------------
var user = null;
var formContainer = $('#form-container');
var answeredContainer = $('#answered-container');
var statusBar = $('#status-bar');
var answeredQuestions = [];
  // {question: answer}, {question: answer}

$('#logo').click(function(){
  setUp();
});

// SETUP --------------
var setUp = function() {
  console.log('setting up');
  $('#form-container').empty();

  // dev buttons - to be removed once nav bar is working 100%
  $('#logout-button').show();
  $('#edit-user-button').show();
  $('#delete-user-button').show();
  $('#view-user-capsules-button').show();
  $('#sign-up').show();
  $('#log-in').show();

  $('#nav-sign-up-button').show();
  $('#nav-log-in').show();

  if (Cookies.get("loggedinId") != undefined) {
    console.log("already logged in");
    var formContainer = $('#form-container');
    formContainer.empty();
    $('#sign-up').hide();
    $('#log-in').hide();

    // DUPLICATE NAV BAR BUTTONS
    $('#nav-sign-up-button').hide();
    $('#nav-log-in').hide();

    getQuestions();
  }
  else {
    // nav bar for non-logged-in users
    $('#nav-signup-button').show();
    $('#nav-login-button').show();

    getQuestions();

    // SIGN-UP BUTTON
    $('#sign-up').click(function(){
      console.log('clicked sign-up');
      signUpForm();
      $('#sign-up').hide();
      $('#log-in').hide();
      // DUPLICATE NAV BUTTONS
      // $('#nav-sign-up-button').hide();
      // $('#nav-log-in').hide();
    });

    // LOG-IN BUTTON
    $('#log-in').click(function(){
      console.log('clicked log-in');
      loginForm();
      $('#sign-up').hide();
      $('#log-in').hide();
      // DUPLICATE NAV BUTTONS
      $('#nav-sign-up-button').hide();
      $('#nav-log-in').hide();
    });

    // DUPLICATE NAV BAR LOG-IN BUTTON
    $('#nav-login-button').click(function(){
      console.log('clicked log-in');
      loginForm();
      // $('#sign-up').hide();
      // $('#log-in').hide();
    });
    // DUPLICATE NAV BAR SIGN-UP BUTTON
    $('#nav-sign-up-button').click(function(){
      console.log('clicked sign-up');
      signUpForm();
      // DUPLICATE NAV BUTTONS
      // $('#nav-sign-up-button').show();
      // $('#nav-log-in').show();
    });

  };
}; // end setUp


// SIGN-UP -----------------------
var signUpForm = function() {
		console.log('showing sign up form');

    // dev buttons - to be removed once nav bar is working 100%
    $('#logout-button').show();
    $('#edit-user-button').show();
    $('#delete-user-button').show();
    $('#view-user-capsules-button').show();
    $('#sign-up').show();
    $('#log-in').show();

    // nav bar
    $('#nav-login-button').hide();
    $('#nav-signup-button').hide();

    // updating status bar
    var status = $('#status-bar');
    status.empty();
    status.append('Sign Up!');

    var formContainer = $('#form-container');
    formContainer.empty();
		var template = Handlebars.compile($('#signup-template').html());
		formContainer.append(template);

    // REGISTER BUTTON
		$('#register-button').click(function(){
			console.log('clicked register');
			newUser();
		});

    // LOG-IN BUTTON - through signup form
    $('#login-through-signup').click(function() {
      console.log("clicked login through signup button");
      loginForm();
    });
	}; // sign up form


var newUser = function() {
  // turning age into a number :)
  var ageNum = parseInt($('#age').val())
   console.log(age);

	user = {
		username: $('#username').val(),
		password: $('#password').val(),
    email: $('#email').val(),
    age: ageNum,
    location: $('#location').val()
	};
	console.log(user.username+" created app side");
  console.log(user);

	$.ajax({
		url: "http://localhost:3000/users",
		method: "POST",
    dataType: 'json',
		data: user
	}).done(function(data){
    console.log("sent sign-up info to server");
    console.log(data.username+" signup successful");

    // showing sign-up template
    var formContainer = $('#form-container');
    formContainer.empty();
    console.log(data);
    formContainer.append("<p> name: "+data.username+"</p>");

    // setting cookie and back to questions
    user = Cookies.get("loggedinId");
    getQuestions();
	}); // end ajax request
}; // end newUser
// END SIGN-UP -----------------------

// LOGIN ---------------------
var loginForm = function() {
	console.log('showing login form');

  $('#nav-login-button').hide();
  $('#nav-signup-button').hide();

  // dev buttons - to be removed once nav bar is working 100%
  $('#logout-button').show();
  $('#edit-user-button').show();
  $('#delete-user-button').show();
  $('#view-user-capsules-button').show();
  $('#sign-up').show();
  $('#log-in').show();

  // updating status bar
  var status = $('#status-bar');
  status.empty();
  status.append('Login!');

  // showing login template
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

  // this conditional is only about which nav buttons to show
  if (Cookies.get("loggedinId") != undefined) {
    console.log("already logged in");
    $('#nav-log-out-button').show();
    $('#nav-edit-user-button').show();
    $('#nav-sign-up-button').hide();
  }
  else {

  }

  //showing edit/delete buttons
  $('#logout-button').show();
  $('#edit-user-button').show();
  $('#delete-user-button').show();
  $('#view-user-capsules-button').show();
  $('#sign-up').show();
  $('#log-in').show();

  //DUPLICATE NAV BAR BUTTONS
  $('#nav-log-out-button').show();
  $('#nav-edit-user-button').show();

  // updating status bar
  var status = $('#status-bar');
  status.empty();
  status.append('time capsule main area');

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

  // dev buttons - to be removed once nav bar is working 100%
  $('#logout-button').show();
  $('#edit-user-button').show();
  $('#delete-user-button').show();
  $('#view-user-capsules-button').show();
  $('#sign-up').show();
  $('#log-in').show();

  var template = Handlebars.compile($('#boxes-template').html());
  for(var i=0;i<data.length;i++) {
    formContainer.append(template(data[i]));
    // $('.outer-box').each(function(i){
    //    this.style.backgroundColor = getRandomColor();
    // });
    $('.inner-box').each(function(i){
      // this.addClass('random-background-color');
      // ('random-background-color').css(getRandomColor());
      this.style.backgroundColor = getRandomColor();
    });
    // $('.inner-box').css('background-color', getRandomColor()); // this makes all the boxes turn a random color
  }


  if (Cookies.get("loggedinId") != undefined) {
    console.log("already logged in");

    //showing DUPLICATE NAV BAR edit/delete buttons
    $('#nav-log-in').hide();
    $('#nav-edit-user-button').show();
    $('#nav-log-out-button').show();

    $(".inner-box").one("click", function() {
      $(this).parent('.outer-box').addClass('outer-box-active');

      var id = $(this).parent('.outer-box').attr('id');
      console.log(".on event! the id of this box is: " + id);

      var quest =  $(this).parent('.outer-box').attr('data-id');
      console.log(".on event! the question of this box is: " + quest);

      renderTextInput(id, quest);
      $(this).addClass('inner-box-active');
      $(this).removeClass('inner-box');
    });
  }
  else {

    //hiding DUPLICATE NAV BAR edit/delete buttons
    $('#nav-log-out-button').hide();
    $('#nav-edit-user-button').hide();
    $('#nav-view-user-capsules-button').hide();


    $(".inner-box").on("click", function() {
      showModal();
      // $('#modal').toggle(); // this calls the login modal
    });
  };
}; // end renderQuestions


// LOGIN MODAL ----------------------
var showModal = function() {

  $('#modal').toggle(); // this calls the login modal

  $('#close').on('click', function(){
    $('#modal').toggle();
  });

  $('#modal-sign-up').click(function(){
    console.log('clicked sign-up');
    signUpForm();
    $('#modal').toggle();
    // $('#sign-up').hide();
    // $('#log-in').hide();
  });

  $('#modal-log-in').click(function(){
    console.log('clicked log-in');
    loginForm();
    $('#modal').toggle();
    // $('#sign-up').hide();
    // $('#log-in').hide();
  });
  // $('#sign-up').hide();
  // $('#log-in').hide();
};


// SHOW INPUT BOXES --------------
  // loads answer/submit template
var renderTextInput = function(id, quest) {
  // $(this).addClass('inner-box-active');
  // $(this).removeClass('inner-box');
  console.log("I'm just console logging the id: " + id);
  var innerBoxById = $('#' + id);
  // innerBoxById.empty();
  var template = Handlebars.compile($('#active-box-template').html());
  innerBoxById.append(template);

  $('#submit-answer').click(function(){
    console.log('clicked submit answer');

    var temp_id = id;
    var temp_q = quest;
    var temp_ans = $('#response').val();

    var tempQA = {
      id: temp_id,
      question: temp_q,
      answer: temp_ans
    };

    //clears answered box
    $(innerBoxById).empty();

    // show questions in sidebar
    showQuestion(tempQA);

    // make capsules
    if (Cookies.get("currentCapsule") == undefined) {
      newCapsule(tempQA);
    } else {
      existingCapsule(tempQA);
    }; // end if/else
  }); //end submit answer
}; // end renderTextInput
// END QUESTIONS --------------------


// RANDOM COLORS --------------------
getRandomColor = function() {
  colors = ['#999900', '#996600', '#eeeeee', '#660066', '#666666', '#009999', '#99004c', ]
  return colors[Math.floor(Math.random()*colors.length)];
}; // end getRandomColor


// SHOW QUESTION -------------------
// saves Q/A to temp array & appends to sidebar
var showQuestion = function(tempQA) {
	console.log('showing questions list');

  // just showing answered questions in side
  answeredQuestions.push(tempQA);
  console.log(answeredQuestions);
  answeredContainer.empty();

	var template = Handlebars.compile($('#questions-template').html());
  for(var i=0;i<answeredQuestions.length;i++) {
	  answeredContainer.append(template(answeredQuestions[i]))
  };

  ////// need date/calendar or button/input

  answeredContainer.append("<button id='submit-capsule' data-id='{{_id}}'>Create Time Capsule!</button>");
}; // end show question


// NEW CAPSULE -------------------
var newCapsule = function(tempQA) {
  // saving to new capsule
  $.ajax({
    url: "http://localhost:3000/capsules",
    method: "POST",
    dataType: 'json',
    data: tempQA
  }).done(function(data){
    console.log("sent capsule to server");

	}); // end ajax request

  // deletes the current capsule cookie
  $('#submit-capsule').click(function(){
    console.log('submit capsule button clicked');
    Cookies.remove('currentCapsule');
    console.log('user cookie deleted');
  });
}; // end new capsule


// ADD TO CURRENT CAPSULE -------------
var existingCapsule = function(tempQA) {
  $.ajax({
    url: "http://localhost:3000/capsules/"+Cookies.get('currentCapsule'),
    method: "PUT",
    dataType: 'json',
    data: tempQA
  }).done(function(data){
    console.log("add question completed");
    console.log(data);
  }); // end put

  // deletes the current capsule cookie
  $('#submit-capsule').click(function(){
    console.log('submit capsule button clicked');
    Cookies.remove('currentCapsule');
    console.log('user cookie deleted');
  });
}; // end existingCapsule



// GET CAPSULES  -------------------------
$('#view-user-capsules-button').click(function() {
  console.log("clicked view user capsules button");
  getCapsules();
});

var getCapsules = function(){
	console.log("getting capsules");

	$.ajax({
    url: "http://localhost:3000/capsules/"+Cookies.get('loggedinId'),
		method: 'GET',
		dataType: 'json'
	}).done(function(data) {
    console.log("getting capsules from database");
    renderCapsules(data);
  });
}; // end getCapsules


var renderCapsules = function(data) {
  console.log("rendering a user's capsules");

  var formContainer = $('#form-container');
	formContainer.empty();

  // dev buttons - to be removed once nav bar is working 100%
  $('#logout-button').show();
  $('#edit-user-button').show();
  $('#delete-user-button').show();
  $('#view-user-capsules-button').show();
  $('#sign-up').show();
  $('#log-in').show();

  // nav bar for logged-in users
  $('#nav-edit-user-button').show();
  $('#nav-logout-button').show();
  $('#nav-login-button').hide();
  $('#nav-signup-button').hide();
  $('#nav-view-user-capsules-button').hide();

  $('#status-bar').empty();
  $('#status-bar').append("View your time capsules");

  var template = Handlebars.compile($('#view-user-capsules-template').html());
  for(var i=0; i < data.length; i++) {
    formContainer.append(template(data[i]));
  };
}; // end renderCapsules
// END GET CAPSULES -----------------


// LOGOUT ---------------------------
$('#logout-button').click(function(){
  console.log('clicked logout');
  //removes cookie
  Cookies.remove('loggedinId');
  console.log('user cookie deleted, logged out');
  // takes us back to beginning
  setUp();
});

//////THIS IS WHERE MELISSA LEFT OFF!!!
//
//
//
//

$('#nav-log-out-button').click(function(){
  console.log('clicked logout');
  //removes cookie
  Cookies.remove('loggedinId');
  console.log('cookie deleted, logged out');
  // takes us back to beginning
  setUp();

  // adds delete language to status bar
  $('#status-bar').empty();
  $('#status-bar').append("Successfully logged out");
});
// END LOGOUT -----------------------


// EDIT USER -------------------------
$('#edit-user-button').click(function(){
  console.log('clicked edit user');
  editForm();
});
//DUPLICATE EDIT USER BUTTON -- it's called 'MY PROFILE' in HTML
$('#nav-edit-user-button').click(function(){
  console.log('clicked edit user');
  editForm();
});

var editForm = function() {
	console.log('showing edit form');

  $('#nav-view-user-capsules-button').show();
  $('#nav-logout-button').show();

  // clean up
  $('#form-container').empty();
  $('#status-bar').empty();
  $('#status-bar').append("Edit your information");

  // dev buttons - to be removed once nav bar is working 100%
  $('#logout-button').show();
  $('#edit-user-button').show();
  $('#delete-user-button').show();
  $('#view-user-capsules-button').show();
  $('#sign-up').show();
  $('#log-in').show();

  // get user info to populate form

  $.ajax({
		url: "http://localhost:3000/user/"+Cookies.get('loggedinId'),
		method: "GET",
    dataType: 'json',
	}).done(function(data){
    console.log(data);
    var template = Handlebars.compile($('#edit-user-template').html());
    $('#form-container').append(template(data));

    // update button
    $('#update-user-button').click(function(){
      console.log('clicked update user');
      editUser();
    });
  }); // end ajax
}; // end editForm


var editUser = function() {
	var user_edit = {
		email: $('#email').val(),
		age: $('#age').val(),
    location: $('#location').val(),
	};

  console.log(user_edit);
	console.log("user edit sending");

	$.ajax({
		url: "http://localhost:3000/user/"+Cookies.get('loggedinId'),
		method: "PUT",
    dataType: 'json',
		data: user_edit
	}).done(function(data){
    // returns string "User updated"
    console.log("edit ajax completed")
    console.log("from server: "+data);
    getQuestions();
  }); // end put
}; // end editUser
// END EDIT USER ---------------------


// DELETE USER -------------------------
// delete button
$('#delete-user-button').click(function(){
  console.log('clicked delete user');
  $('#form-container').empty();

  // nav bar
  $('#nav-view-user-capsules-button').show();
  $('#nav-edit-user-button').show();
  $('#nav-logout-button').show();

  // adds delete language to status bar
  $('#status-bar').empty();
  $('#status-bar').append("Would you like to delete your account?");

  areYouSure();
});

// double checks if wants to delete
var areYouSure = function() {
  console.log('showing delete form');

  var delContainer = $('#delete-user-container');
  var template = Handlebars.compile($('#delete-user-template').html());
  delContainer.append(template);

  // delete user confirm button
  $('#delete-user-confirm-button').click(function(){
    console.log('clicked confirm delete user');
    deleteUser();
    delContainer.empty();
  });
}; // end areYouSure


var deleteUser = function() {
	console.log("deleting user");

  $('#form-container').empty();
  $('#status-bar').empty();


	$.ajax({
		url: "http://localhost:3000/user/"+Cookies.get("loggedinId"),
		method: "DELETE",
	}).done(function(){
    //removes cookie
    Cookies.remove('loggedinID');
    console.log('Account deleted');

  // confirms successful deletion of account
  $('#status-bar').append("Account successfully deleted");

    // takes us back to beginning
    setUp();
  });
}; // end editUser
// END DELETE UESR -----------------------
