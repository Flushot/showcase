var restify = require('restify');
var bunyan = require('bunyan');

var serverName = exports.serverName = 'showcase';


// Splunk-compatible JSON logger
var log = exports.log = bunyan.createLogger({
    name: serverName,
    level: bunyan.DEBUG,
    src: true
});


exports.child = log.child({
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
});


exports.setupServer = function (server) {
    server.use(restify.requestLogger());

    server.on('after', restify.auditLogger({
        log: log.child({
            component: 'audit'
        })
    }));
    
    server.on('uncaughtException', function (request, response, route, error) {
        request.log.error(error, 'got uncaught exception');
    });
};