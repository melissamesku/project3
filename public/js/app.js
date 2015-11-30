$(function() {
  console.log('js loaded');

  setUp();

  var template = Handlebars.compile($('#after-capsule-sent').html());
  bigImage.append(template);
  bigImage.addClass('capsule-sent');
  bigImage.append("<img src='http://melissamesku.com/images/nasa-time-capsule.jpg'>");

}); // end doc ready

// GLOBAL VARIABLES --------------
var user = null;
var formContainer = $('#form-container');
var answeredContainer = $('#answered-container');
var bigImage = $('#big-image');
var statusBar = $('#status-bar');
var answeredQuestions = [];
  // {question: answer}, {question: answer}

// NAV BAR LINK FUNCTIONS
$('#logo').click(function() {
  setUp();
});

$('#nav-home-button').click(function() {
  setUp();
})

$('#nav-my-capsules-button').click(function() {
  getCapsules();
});

$('#nav-login-button').click(function() {
  bigImage.remove();
  loginForm();
});

$('#nav-logout-button').click(function() {
  areYouSure();
});

$('#nav-signup-button').click(function() {
  bigImage.remove();
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
  };
}; // end setUp


// SIGN-UP -----------------------
var signUpForm = function() {
    console.log('showing sign up form');

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
}; // end loginForm


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

  // updating status bar
  var status = $('#status-bar');
  status.empty();

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
var getRandomColor = function() {
  // colors = ['#cc33cc', '#9933cc', '#3333cc', '#3366cc', '#3399cc', '#33cccc', '#33cc99', '#33cc66', '#66cc33', '#99cc33', '#cccc33', '#cc9933', '#cc6633', '#cc3333', '#cc3366', '#999933', '#cccc00', '#99cc00']
  // colors = ['#ba321a', '#ba7f1a', '#3333cc', '#bab21a', '#a7ba1a', '#1aba8d', '#1aafba', '#1a6fba', '#521aba', '#721aba', '#921aba', '#a51aba', '#7a0202', '#cc3366', '#7a0250', '#027a58', '#7a6a02']
  // colors = ['#996600', '#b5b700',  '#666666', '#16aca0', '#99004c', '#859900', '#990097', '#1687ac', '#cccccc' ]
  // colors = ['#a2774a', '#a48f78', '#a9a88d', '#caaf40', '#99a9ba', '#8e5c42', '#d6b74e', '#ceb9ae', '#cccccc', '#eeeeee' ]
  colors = ['#846684', '#929dbb', '#92b3bb', '#92bba5', '#a6bb92', '#b6bb92', '#bbb392', '#bbae92', '#cccccc', '#eeeeee', '#bba492', '#929bbb', '#a79782', '#a78e82' ];
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
  });

  $('#modal-log-in').click(function(){
    console.log('clicked log-in');
    loginForm();
    $('#modal').toggle();
  });
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
    formContainer.empty();
    var template = Handlebars.compile($('#after-capsule-sent').html());
    bigImage.append(template);
    bigImage.addClass('capsule-sent');
    bigImage.append("<img src='http://melissamesku.com/images/nasa-time-capsule.jpg'>")

    // answeredContainer.append("<div class='list-questions'>Capsule Saved!</div>");

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
  }; // end Handlebars

  // call functionality for midlevel account buttons
  accountUpdateButton();
  accountDeleteAccount();

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
// click account info in nav, go to account subsection
$('#nav-my-account-button').click(function() {
  console.log("clicked nav edit user");
  // $('#form-container').empty();
  setupAccount();
});

// subsection buttons
var accountViewCapsules = function() {
  $('#account-view-capsules-button').click(function() {
    console.log("clicked view capsules");
    getCapsules();
  })
};

var accountUpdateButton = function() {
  $('#account-update-button').click(function() {
    console.log("clicked update user info");
    editForm();
  })
};

var accountDeleteAccount = function() {
  $('#account-delete-button').click(function() {
    console.log("clicked delete account");
    areYouSure();
  })
};

var setupAccount = function() {
  console.log("toplevel edit page");
  $('#form-container').empty();

  var template = Handlebars.compile($('#account-info-template').html());
  $('#form-container').empty();
  $('#form-container').append(template);

  // midlevel account buttons
  accountViewCapsules();

  accountUpdateButton();

  accountDeleteAccount();
};

var editForm = function() {
  console.log('showing edit form');

  $('#nav-view-user-capsules-button').show();
  $('#nav-logout-button').show();

  // clean up
  $('#form-container').empty();
  $('#status-bar').empty();
  $('#status-bar').append("Manage my account");

  // get user info to populate form
  $.ajax({
    url: "http://localhost:3000/user/"+Cookies.get('loggedinId'),
    method: "GET",
    dataType: 'json',
  }).done(function(data){
    console.log(data);
    var template = Handlebars.compile($('#edit-user-template').html());
    $('#form-container').append(template(data));

    // call functionality for midlevel account buttons
    accountViewCapsules();
    accountDeleteAccount();

    // update button
    $('#update-user-button').click(function(){
      console.log('clicked update user');
      editUser();
    }); // end update button
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
  $('#form-container').empty();
  $('#form-container').append(template);

  // call functionality for midlevel account buttons
  accountViewCapsules();
  accountUpdateButton();

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


// ABOUT ---------------------------------
$('#nav-about-button').click(function() {
  console.log("clicked about button");
  renderAbout();
});

var renderAbout = function() {
  // updating status bar
  var status = $('#status-bar');
  status.empty();
  status.append('About TimeCapsule');

  // clearing form container
  var formContainer = $('#form-container');
  formContainer.empty();

  // Handlebars
  var template = Handlebars.compile($('#about-template').html());
  formContainer.append(template);

  if (Cookies.get("loggedinId") != undefined) {
  console.log("already logged in");

    // nav bar for logged-in users
    $('#nav-my-capsules-button').show();
    $('#nav-my-account-button').show();
    $('#nav-logout-button').show();
    $('#nav-login-button').hide();
    $('#nav-signup-button').hide();
  }
  else {
    // nav bar for non-logged-in users
    $('#nav-login-button').show();
    $('#nav-signup-button').show();
    $('#nav-logout-button').hide();
    $('#nav-my-account-button').hide();
    $('#nav-my-capsules-button').hide();
  } // end conditional
}; // end renderAbout
// END ABOUT -----------------------------
