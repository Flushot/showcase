var express = require('express');
var app = express();


var listenPort = 3002;

app.get('/', function(request, response) {
    response.send('Render server is alive.');
});

app.post('/render', function(request, response) {
    // TODO: require() compiled webpack scripts
    // TODO: set window.location to url passed in as param
    // TODO: set view state from state passed in as param (figure out a better way than with globals)
    // TODO: render Root component as string
    // TODO: determine if route is valid and throw a 404 if not
    // TODO: response.send() rendered html
    response.send('Not implemented');
});

app.listen(listenPort, function() {
    console.log('Render server is listening on port ' + listenPort);
});
