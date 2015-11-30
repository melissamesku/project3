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

// NAV BAR LINK FUNCTIONS
$('#logo').click(function() {
  setUp();
});

$('#nav-my-capsules-button').click(function() {
  getCapsules();
});

$('#nav-login-button').click(function() {
  loginForm();
});

$('#nav-logout-button').click(function() {
  areYouSure();
});

$('#nav-signup-button').click(function() {
  signUpForm();
});

$('#nav-my-account-button').click(function() {
  setupAccount();
});


// SETUP --------------
var setUp = function() {
  console.log('setting up');
  $('#form-container').empty();

  // dev buttons - to be removed once nav bar is working 100%
  // $('#logout-button').show();
  // $('#edit-user-button').show();
  // $('#delete-user-button').show();
  // $('#view-user-capsules-button').show();
  // $('#sign-up').show();
  // $('#log-in').show();

  $('#nav-signup-button').show();
  $('#nav-login').show();

  if (Cookies.get("loggedinId") != undefined) {
    console.log("already logged in");
    var formContainer = $('#form-container');
    formContainer.empty();
    // $('#sign-up').hide();
    // $('#log-in').hide();

    // nav bar for logged-in users
    $('#nav-my-capsules-button').show();
    $('#nav-my-account-button').show();
    $('#nav-logout-button').show();
    $('#nav-signup-button').hide();
    $('#nav-login-button').hide();

    getQuestions();
  }
  else {
    // nav bar for non-logged-in users
    $('#nav-signup-button').show();
    $('#nav-login-button').show();
    $('#nav-my-capsules-button').hide();
    $('#nav-my-account-button').hide();
    $('#nav-logout-button').hide();

    getQuestions();

    // // SIGN-UP BUTTON
    // $('#sign-up').click(function(){
    //   console.log('clicked sign-up');
    //   signUpForm();
    //   $('#sign-up').hide();
    //   $('#log-in').hide();
    // });

    // // LOG-IN BUTTON
    // $('#log-in').click(function(){
    //   console.log('clicked log-in');
    //   loginForm();
    //   $('#sign-up').hide();
    //   $('#log-in').hide();
    //   // DUPLICATE NAV BUTTONS
    //   $('#nav-signup-button').hide();
    //   $('#nav-login-button').hide();
    // });

    // // DUPLICATE NAV BAR LOG-IN BUTTON
    // $('#nav-login-button').click(function(){
    //   console.log('clicked log-in');
    //   loginForm();
    // });

    // // DUPLICATE NAV BAR SIGN-UP BUTTON
    // $('#nav-signup-button').click(function(){
    //   console.log('clicked sign-up');
    //   signUpForm();
    // });

  };
}; // end setUp


// SIGN-UP -----------------------
var signUpForm = function() {
		console.log('showing sign up form');

    // dev buttons - to be removed once nav bar is working 100%
    // $('#logout-button').show();
    // $('#edit-user-button').show();
    // $('#delete-user-button').show();
    // $('#view-user-capsules-button').show();
    // $('#sign-up').show();
    // $('#log-in').show();

    // nav bar for non-logged-in users
    $('#nav-signup-button').hide();
    $('#nav-login-button').hide();
    $('#nav-my-capsules-button').hide();
    $('#nav-my-account-button').hide();
    $('#nav-logout-button').hide();

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
  // checks if age is a number, if not, then 0
  var ageGot = $('#age').val();
  if (parseInt(ageGot) != true) {
    ageGot = 0;
  } else {
  var ageNum = parseInt(ageGot);
  };

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

  // nav bar for non-logged-in users
  $('#nav-signup-button').hide();
  $('#nav-login-button').hide();
  $('#nav-my-capsules-button').hide();
  $('#nav-my-account-button').hide();
  $('#nav-logout-button').hide();

  // dev buttons - to be removed once nav bar is working 100%
  // $('#logout-button').show();
  // $('#edit-user-button').show();
  // $('#delete-user-button').show();
  // $('#view-user-capsules-button').show();
  // $('#sign-up').show();
  // $('#log-in').show();

  // updating status bar
  var status = $('#status-bar');
  status.empty();
  status.append('Log in!');

  // showing login template
  var formContainer = $('#form-container');
	formContainer.empty();
	var template = Handlebars.compile($('#login-template').html());
	formContainer.append(template);

  // SIGNUP button - referral button through login page
  $('#signup-through-login').click(function() {
    signUpForm();
  })

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
    $('#nav-my-capsules-button').show();
    $('#nav-logout-button').show();
    $('#nav-my-account-button').show();
    $('#nav-signup-button').hide();
  }
  else {

  }

  // dev buttons - to be removed once nav bar is working 100%
  // $('#logout-button').show();
  // $('#edit-user-button').show();
  // $('#delete-user-button').show();
  // $('#view-user-capsules-button').show();
  // $('#sign-up').show();
  // $('#log-in').show();

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
  // $('#logout-button').show();
  // $('#edit-user-button').show();
  // $('#delete-user-button').show();
  // $('#view-user-capsules-button').show();
  // $('#sign-up').show();
  // $('#log-in').show();

  // puts questions in boxes with random colors
  var template = Handlebars.compile($('#boxes-template').html());
  for(var i=0;i<data.length;i++) {
    formContainer.append(template(data[i]));
    $('.inner-box').each(function(i){
      this.style.backgroundColor = getRandomColor();
    });
  }

  if (Cookies.get("loggedinId") != undefined) {
    console.log("already logged in");

    // nav bar for logged-in users
    $('#nav-view-user-capsules-button').show();
    $('#nav-my-account-button').show();
    $('#nav-logout-button').show();
    $('#nav-login-button').hide();
    $('#nav-signup-button').hide();

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

    // nav bar for non-logged-in users
    $('#nav-login-button').show();
    $('#nav-signup-button').show();
    $('#nav-logout-button').hide();
    $('#nav-my-account-button').hide();
    $('#nav-view-user-capsules-button').hide();

    $(".inner-box").on("click", function() {
      showModal();
      // $('#modal').toggle(); // this calls the login modal
    });
  };
}; // end renderQuestions


// RANDOM COLORS --------------------
getRandomColor = function() {
  colors = ['#999900', '#996600', '#eeeeee', '#660066', '#666666', '#009999', '#99004c', ]
  return colors[Math.floor(Math.random()*colors.length)];
}; // end getRandomColor


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

    var tempQA = {};
    var temp_id = id;
    var temp_q = quest;
    var temp_ans = $('#response').val();

    tempQA = {
      id: temp_id,
      question: temp_q,
      answer: temp_ans
    };

    //clears answered box
    $(innerBoxById).empty();

    // show questions in sidebar
    showQuestions(tempQA);

    // make capsules
    if (Cookies.get("currentCapsule") == undefined) {
      newCapsule(tempQA);
    } else {
      existingCapsule(tempQA);
    }; // end if/else
  }); //end submit answer
}; // end renderTextInput
// END QUESTIONS --------------------


// SHOW QUESTIONS -------------------
// saves Q/A to temp array & appends to sidebar
var showQuestions = function(tempQA) {
	console.log('showing questions list');

  // just showing answered questions in side
  answeredQuestions.push(tempQA);
  console.log(answeredQuestions);
  answeredContainer.empty();

	var template = Handlebars.compile($('#questions-template').html());
  for(var i=0;i<answeredQuestions.length;i++) {
	  answeredContainer.append(template(answeredQuestions[i]))
  };

  // MELISSA'S GRAVEYARD OF TRYING TO TRUNCATE THE STRINGS IN SIDEBAR;
  // var questionInList = $('.list-questions');
  // var yellow = questionInList.css('color', '#666');
  // var shortText = $.trim(questionInList).substring(0, 10).split(" ").slice(0, -1).join(" ") + "...";

  ////// need date/calendar or button/input

  answeredContainer.append("<button id='submit-capsule' data-id='{{_id}}'>Create Time Capsule!</button>");
}; // end show question


// QUESTION TO NEW CAPSULE -------------------
var newCapsule = function(tempQA) {
  // saving to new capsule
  $.ajax({
    url: "http://localhost:3000/capsules",
    method: "POST",
    dataType: 'json',
    data: tempQA
  }).done(function(data){
    console.log("new capsule created in db");
    submitCapsule();
	}); // end ajax request
}; // end new capsule

// QUESTION TO CURRENT CAPSULE -------------
var existingCapsule = function(tempQA) {
  $.ajax({
    url: "http://localhost:3000/capsules/"+Cookies.get('currentCapsule'),
    method: "PUT",
    dataType: 'json',
    data: tempQA
  }).done(function(data){
    console.log("question added to capsule");
    submitCapsule();
  }); // end put
}; // end existingCapsule

// deletes the current capsule cookie
var submitCapsule = function(){
  $('#submit-capsule').click(function(){
    console.log('submit capsule button clicked');
    Cookies.remove('currentCapsule');
    console.log('capsule cookie deleted');

    // empties sidebar/questions array
    // leaves saved message
    answeredContainer.empty();
    answeredContainer.append("<div class='list-questions'>Capsule Saved!</div>");
    answeredQuestions = [];

    // snaps the box back to original color/shape
    // not working
    var innerBoxById = $('#' + id);
    innerBoxById.empty();

    $('.outer-box').removeClass('.outer-box-active');


  });
};

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
		dataType: 'json',
	}).done(function(data) {
    console.log("got capsules from database");
    console.log(data);

    renderCapsules(data);
  });
}; // end getCapsules

var renderCapsules = function(data) {
  console.log("rendering a user's capsules");

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
  $('#nav-my-capsules-button').hide();

  $('#status-bar').empty();
  $('#status-bar').append("View your time capsules");

  var template = Handlebars.compile($('#view-user-capsules-template').html());
  for(var i=0; i < data.length; i++) {
    formContainer.append(template(data[i]));
  };
}; // end renderCapsules
// END GET CAPSULES -----------------

// LOGOUT ---------------------------
$('#nav-logout-button').click(function() {
  console.log('clicked logout');
  //removes cookie
  Cookies.remove('loggedinId');
  console.log('user cookie deleted, logged out');
  // takes us back to beginning
  // adds delete language to status bar
  $('#status-bar').empty();
  $('#status-bar').append("Successfully logged out");

  // takes us back to beginning
  setUp();
});
// END LOGOUT -----------------------


// EDIT USER -------------------------
// click account info in nav, go to account splash
$('#nav-my-account-button').click(function() {
  console.log("clicked nav edit user");
  $('#form-container').empty();
  setupAccount();
});

var setupAccount = function() {
  console.log("toplevel edit page");
  $('#form-container').empty();

  var template = Handlebars.compile($('#account-info-template').html());
  $('#form-container').empty();
  $('#form-container').append(template);

  $('#toplevel-view-capsules-button').click(function() {
    console.log("clicked view capsules");
    $('#form-container').empty();
    getCapsules();
  })

 $('#toplevel-update-user-info-button').click(function() {
    console.log("clicked update user info");
    $('#form-container').empty();
    editForm();
  })

  $('#toplevel-delete-account-button').click(function() {
    console.log("clicked delete account");
    $('#form-container').empty();
    areYouSure();
  })
};

var editForm = function() {
	console.log('showing edit form');

  $('#nav-view-user-capsules-button').show();
  $('#nav-logout-button').show();

  // clean up
  $('#form-container').empty();
  $('#status-bar').empty();
  $('#status-bar').append("Manage my account");

  // dev buttons - to be removed once nav bar is working 100%
  // $('#logout-button').show();
  // $('#edit-user-button').show();
  // $('#delete-user-button').show();
  // $('#view-user-capsules-button').show();
  // $('#sign-up').show();
  // $('#log-in').show();

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
$('#toplevel-delete-account-button').click(function(){
  console.log('clicked delete user');
  $('#form-container').empty();

  // nav bar
  $('#nav-my-capsules-button').show();
  $('#nav-my-account-button').show();
  $('#nav-logout-button').show();

  // adds delete language to status bar
  $('#status-bar').empty();
  $('#status-bar').append("Would you like to delete your account?");

  areYouSure();
});

// double checks if wants to delete
var areYouSure = function() {
  console.log('showing delete form');

  var template = Handlebars.compile($('#delete-user-template').html());
  $('#form-container').append(template);

  // delete user confirm button
  $('#delete-user-confirm-button').click(function(){
    console.log('clicked confirm delete user');
    deleteUser();
    delContainer.empty();
  });
}; // end areYouSure

// DELETE method
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
}; // end deleteUser
// END DELETE USER -----------------------

// ---------------------------------------
///////////////////////////
//////   EMAIL   //////////
///////////////////////////

// Create a function to log the response from the Mandrill API
function log(obj) {
    $('#response').text(JSON.stringify(obj));
}

// create a new instance of the Mandrill class with your API key
var m = new mandrill.Mandrill('ErC_Pp1x5G3LBsNSbDgQLw');

// create a variable for the API call parameters
var params = {
    "message": {
        "from_email":"ericdelin@me.com",
        "to":[{"email":"ericdevlin@me.com"}],
        "subject": "Sending a text email from the Mandrill API",
        "html": "I'm learning the Mandrill API at Codecademy."
    }
};

function sendTheMail() {
// Send the email!

    m.messages.send(params, function(res) {
        log(res);
    }, function(err) {
        log(err);
    });
}
