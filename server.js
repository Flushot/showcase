var restify = require('restify');
var bunyan = require('bunyan');
var falcorRestifyMiddleware = require('falcor-restify');
var FalcorRouter = require('falcor-router');

var listenPort = 3002;

var log = bunyan.createLogger({
    name: 'renderServer',
    level: bunyan.DEBUG,
    src: true
});

var server = restify.createServer({
    // Splunk-compatible JSON logger
    log: log.child({
        component: 'server',
        level: bunyan.INFO,
        streams: [
            {
                // This ensures that if we get a WARN or above all debug records
                // related to that request are spewed to stderr - makes it nice
                // filter out debug messages in prod, but still dump on user
                // errors so you can debug problems
                level: bunyan.DEBUG,
                type: 'raw',
                stream: new restify.bunyan.RequestCaptureStream({
                    level: bunyan.WARN,
                    maxRecords: 100,
                    maxRequestIds: 1000,
                    stream: process.stderr
                })
            }
        ],
        serializers: bunyan.stdSerializers
    })
});

server.use(restify.requestLogger());
server.use(restify.queryParser());

server.on('after', restify.auditLogger({
    log: log.child({
        component: 'audit'
    })
}));
server.on('uncaughtException', function (req, res, route, err) {
    req.log.error(err, 'got uncaught exception');
});


/**
 * Test
 */
server.get('/hello/:name', function (request, response, next) {
    response.send('Hello ' + request.params.name);
    next();
});


/**
 * Falcor model
 */
server.get('/model.json', falcorRestifyMiddleware(function (request, response) {
    // create a Virtual JSON resource with single key ("greeting")
    return new FalcorRouter([
        {
            // match a request for the key "greeting"
            route: 'greeting',
            // respond with a PathValue with the value of "Hello World."
            get: function () {
                return {
                    path: ['greeting'],
                    value: 'Hello World'
                };
            }
        }
    ]);
}));


/**
 * Render API
 */
server.post('/render', function (request, response, next) {
    // TODO: require() compiled webpack scripts
    // TODO: set window.location to url passed in as param
    // TODO: set view state from state passed in as param (figure out a better way than with globals)
    // TODO: render Root component as string
    // TODO: determine if route is valid and throw a 404 if not
    // TODO: response.send() rendered html
    response.send('Not implemented');
    next();
});


/**
 * Home page
 */
server.get('/', function(request, response, next) {
    response.redirect('/index.html', next);
});


/**
 * Static asset
 */
server.get(/.+/, restify.serveStatic({
    directory: './public'
}));


server.listen(listenPort, function () {
    console.log('%s listening at %s', server.name, server.url);
});
