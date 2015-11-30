

// Create a function to log the response from the Mandrill API
function log(obj) {
    $('#response').text(JSON.stringify(obj));
}

// create a new instance of the Mandrill class with your API key
var m = new mandrill.Mandrill('API KEY');

// create a variable for the API call parameters
var params = {
  "message": {
    "from_email":"ericdevin@me.com",
    "to":[{"email":"ericdevlin@me.com"}],
    "subject": "Hello from the past!",
    "html": "Here are your capsules!!"
  }
};

function sendTheMail() {
console.log("sending email");
  m.messages.send(params, function(res) {
      log(res);
  }, function(err) {
      log(err);
  });
}

$('#email-button').click(function(){
  console.log('clicked email button');
  sendTheMail();
});
