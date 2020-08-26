$(document).ready(function() {

  getViewNotes();

});

// creates a promise for the demo users token
function createDemoUserTokenPromise(){
  var body = {
    'userName': USERNAME,
    'password': PASSWORD
  };

  return fetch(SERVER + 'auth/local', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  }).then(function(response) {
      return response.json();
  }).then(function(body) {
      return ("Success:", [body, SERVER]);
  }).catch(function(error) {
      return ("Error:", error);
  });
}


// uses the demo users token to get all notes from a view
function getViewNotes(){
  var promise = createDemoUserTokenPromise();
  promise.then(function(response){
    var token = response[0].token;
    var request = new XMLHttpRequest();

    request.open('GET', SERVER + 'api/links/from/' + WELCOMEVIEWID + '/child');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + token);

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    };

    request.send();

  });


}
