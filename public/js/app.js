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

// SETUP --------------
var setUp = function() {
  console.log('setting up');
  $('#form-container').empty();
  $('#edit-user-button').hide();
  $('#delete-user-button').hide();
  $('#logout-button').hide();
  $('#sign-up').show();
  $('#log-in').show();

  $('#nav-log-in').show();

  if (Cookies.get("loggedinId") != undefined) {
    console.log("already logged in");
    var formContainer = $('#form-container');
    formContainer.empty();
    $('#sign-up').hide();
    $('#log-in').hide();
    getQuestions();
  }
  else {
    getQuestions();

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

    // DUPLICATE NAV BAR LOG-IN BUTTON
    $('#nav-log-in').click(function(){
      console.log('clicked log-in');
      loginForm();
      $('#sign-up').hide();
      $('#log-in').hide();
    });

  };
}; // end setUp


// SIGN-UP -----------------------
var signUpForm = function() {
		console.log('showing sign up form');

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

  //showing edit/delete buttons
  $('#logout-button').show();
  $('#edit-user-button').show();
  $('#delete-user-button').show();

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
    $('#nav-log-out').hide();

    $(".inner-box").on("click", function() {
      $('#form-container').empty();
      showModal();
      // $('#modal').toggle(); // this calls the login modal
    });
  };
}; // end renderQuestions

var showModal = function() {
  // LOGIN MODAL ----------------------

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

    // END LOGIN MODAL ----------------------

    // $('#sign-up').hide();
    // $('#log-in').hide();
};




  // loads answer/submit template
var renderTextInput = function(id, quest) {
  // $(this).addClass('inner-box-active');
  // $(this).removeClass('inner-box');
  console.log("I'm just console logging the id: " + id);
  var innerBoxById = $('#' + id);
  // innerBoxById.empty();
  var template = Handlebars.compile($('#active-box-template').html());
  innerBoxById.append(template);

  // $('.outer-box').each(function(i) {
  //     $(this).addClass('outer-box-active');
  //   });

  // $(this).animate({width:'toggle'},500); //USE THIS WHEN SENDING SUBMISSION


  // innerBoxById.style.color = getRandomColor(); //this doesn't work
  // innerBoxById.css("background-color", "#fff"); //this doesn't work either


  // $('.inner-box').each(function(i){
  //     // innerBox.css("font-color", "#fff")
  //     this.style.color = getRandomColor();
  //   });

  // $('#testing0').click(function(){
  //   console.log('FUCK YEAH index 0 was clicked');
  // });

  $('#submit-answer').click(function(){
    console.log('clicked submit answer');

    var temp_id = id;
    // console.log(quest);

    // .parent('.outer-box-active').attr('id');
    var temp_q = quest;
    var temp_ans = $('#response').val();
    //$('em').val();
    // $('#inner-box-active').attr('data-id')

    var tempQA = {
      id: temp_id,
      question: temp_q,
      answer: temp_ans
    };

    //clears answered box
    $(innerBoxById).empty();

    console.log(tempQA);

    saveQuestion(tempQA);
  });

}; // end renderTextInput

// clicking on a question box replaces it with the active box template

// users answer the question and click send

// ‘send' click event activates function that gets:
// the question _id
// the answer
// and saves that into a global variable

// assign to RenderQuestions an id or counter for each item in array
// S.0. assign same click event


// function getRandomColor() {
//   var letters = '0123456789ABCDEF'.split('');
//   var color = '#';
//   for (var i = 0; i < 6; i++ ) {
//       color += letters[Math.floor(Math.random() * 12)]; //could put up to 16, but I prefer these hues
//   }
//   return color;
// }

getRandomColor = function() {
  // colors = ['#cc33cc', '#9933cc', '#3333cc', '#3366cc', '#3399cc', '#33cccc', '#33cc99', '#33cc66', '#66cc33', '#99cc33', '#cccc33', '#cc9933', '#cc6633', '#cc3333', '#cc3366', '#999933', '#cccc00', '#99cc00']
  // colors = ['#ba321a', '#ba7f1a', '#3333cc', '#bab21a', '#a7ba1a', '#1aba8d', '#1aafba', '#1a6fba', '#521aba', '#721aba', '#921aba', '#a51aba', '#7a0202', '#cc3366', '#7a0250', '#027a58', '#7a6a02']
  colors = ['#999900', '#996600', '#eeeeee', '#660066', '#666666', '#009999', '#99004c', ]
  return colors[Math.floor(Math.random()*colors.length)];
}; // end getRandomColor
// END QUESTIONS --------------------


// GET ANSWERS ----------------------

// END ANSWERS ----------------------


// LOGOUT ---------------------------
$('#logout-button').click(function(){
  console.log('clicked logout');
  //removes cookie
  Cookies.remove('loggedinId');
  console.log('cookie deleted, logged out');
  // takes us back to beginning
  setUp();
});


// END LOGOUT -----------------------

// EDIT USER -------------------------
$('#edit-user-button').click(function(){
  console.log('clicked edit user');
  editForm();
});

var editForm = function() {
	console.log('showing edit form');

  // clean up
  $('#form-container').empty();
  $('#status-bar').empty();
  $('#status-bar').append("Edit your information");

  // get user infp to populate form
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

// END EDIT UESR ---------------------


// DELETE USER -------------------------
// delete button
$('#delete-user-button').click(function(){
  console.log('clicked delete user');
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

	$.ajax({
		url: "http://localhost:3000/user/"+Cookies.get("loggedinId"),
		method: "DELETE",
	}).done(function(){
    //removes cookie
    Cookies.remove('loggedinID');
    console.log('Account deleted');
    // takes us back to beginning
    setUp();
  });
}; // end editUser
// END DELETE UESR -----------------------


// SAVE QUESTIONS -----------------------
// saves Q/A to temp array & appends to sidebar
var saveQuestion = function(tempQA) {
	console.log('showing questions list');

  // console.log(tempQA);

	var answeredContainer = $('#answered-container');

  answeredQuestions.push(tempQA);

  console.log(answeredQuestions);

  // if (answeredQuestions == 0) {
  //   // show "answer some questions instead of Date / submit buttons
  //   answeredContainer.append("Answer some questions!");
  // } else {

    answeredContainer.empty();

  	var template = Handlebars.compile($('#questions-template').html());
    for(var i=0;i<answeredQuestions.length;i++) {
  	   answeredContainer.append(template(answeredQuestions[i]))
    };

    ////// need date/calendar or button/input

    answeredContainer.append("<button id='submit-capsule' data-id='{{_id}}'>Create Time Capsule!</button>");

    // submit button
  	$('#submit-capsule').click(function(){
      //
      var capsuleData = {
        questions: answeredQuestions,
        // user: Cookies.get('loggedinId'),
        // date: $('#date').val(), // match date input id
      };

      // console.log(capsuleData);
  		newCapsule(capsuleData);

    }); // end
	// }; // end submit capsule button
}; // sign up form
// SAVE QUESTIONS -----------------------


// CREATE CAPSULES -----------------------
var newCapsule = function(capsuleData) {
	console.log("capsule created app side");
  console.log(capsuleData);

	$.ajax({
		url: "http://localhost:3000/capsules",
		method: "POST",
    dataType: JSON.stringify(capsuleData),
		data: capsuleData
	}).done(function(data){
    console.log("sent capsule to server");
    // returns "capsule creation complete"
    console.log(data);
	});
}; // end newCapsule
// END CREATE CAPSULES -------------------


// GET CAPSULES  -------------------------
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

  var template = Handlebars.compile($('#boxes-template').html());
  for(var i=0;i<data.length;i++) {
    formContainer.append(template(data[i]));
  };

  $(".inner-box").on("click", function() {
    var id = $(this).parent('.outer-box').attr('id');
    console.log("the id should be here: " + id);
    render(id);
  });

}; // end renderCapsules
// END GET CAPSULES -----------------
