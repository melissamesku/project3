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
  } 
  else {
    
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

  var template = Handlebars.compile($('#boxes-template').html());
  for(var i=0;i<data.length;i++) {
    formContainer.append(template(data[i]));
    // $('.outer-box').each(function(i){
    //    this.style.backgroundColor = getRandomColor();
    // });
    $('.inner-box').each(function(i){
      this.style.backgroundColor = getRandomColor();
    });
    // $('.inner-box').css('background-color', getRandomColor()); // this makes all the boxes turn a random color
  }

  $(".inner-box").on("click", function() {
    $(this).parent('.outer-box').addClass('outer-box-active');
    var id = $(this).parent('.outer-box').attr('id');
    console.log(".on event! the id of this box is: " + id);
    renderTextInput(id);
  });

  // console.log(data[0]._id, data[0].question);

  // var obj = {
  //   questions: []
  //   // ids: []
  // };

  // $.each(data, function(key, value) {
  //   obj.questions.push(value.question);
  //   // obj.ids.push(value._id);
  //   console.log('MELISSA AND AMANDA ROCK ' + value._id);
  // });

  // console.log(obj);

  // var template = Handlebars.compile($('#boxes-template').html());
  // formContainer.append(template(obj));

}; // end renderQuestions

var renderTextInput = function(id) {
  console.log("I'm just console logging the id: " + id);
  var innerBoxById = $('#' + id);
  // innerBoxById.empty();
  $(this).addClass('inner-box-active');

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

};






// clicking on a question box replaces it with the active box template

// users answer the question and click send

// ‘send' click event activates function that gets:
// the question _id
// the answer
// and saves that into a global variable




// assign to RenderQuestions an id or counter for each item in array 
// S.0. assign same click event









// END QUESTIONS --------------------

// GET ANSWERS ----------------------



// END ANSWERS ----------------------

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
}

