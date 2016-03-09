var restify = require('restify');
var bunyan = require('bunyan');
var FalcorRouter = require('falcor-router');
var jsong = require('falcor-json-graph');
var falcorRestifyMiddleware = require('falcor-restify');
var Promise = require('promise');
//var Rx = require('rx');

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
server.pre(restify.pre.sanitizePath());

server.on('after', restify.auditLogger({
    log: log.child({
        component: 'audit'
    })
}));
server.on('uncaughtException', function (request, response, route, error) {
    request.log.error(error, 'got uncaught exception');
});


/**
 * Test
 */
server.get('/hello/:name', function (request, response, next) {
    response.send('Hello ' + request.params.name);
    next();
});


/**
 * Home page
 */
server.get('/', function(request, response, next) {
    response.redirect('/index.html', next);
});


/**
 * Items
 */
server.get('/api/items/', function (request, response, next) {
    getLatestItems()
        .then(function (items) {
            response.send(items);
            next();
        })
        .catch(function (error) {
            response.send(500, error.message);
            next();
        });
});


/**
 * Falcor model
 */
server.get('/model.json', falcorRestifyMiddleware(function (request, response) {
    return new FalcorRouter([
        {
            route: 'greeting',
            get: function (pathSet) {
                return {
                    path: ['greeting'],
                    value: 'Hello World'
                };
            }
        },
        {
            route: 'items[{keys:ids}][{keys:props}]',
            get: function(pathSet) {
                return getLatestItems()  // TODO: get from persistent storage instead
                    .then(function(items) {
                        var jsonGraph = { items: {} },
                            itemsById = groupBy(items, 'id');

                        pathSet.ids.forEach(function(id) {
                            jsonGraph.items[id] = {};
                            pathSet.props.forEach(function(prop) {
                                jsonGraph.items[id][prop] = jsong.atom(itemsById[id][prop]);
                            });
                        });

                        return { jsonGraph: jsonGraph };
                    });
            }
        },
        {
            route: 'latestItems.["length"]',
            get: function(pathSet) {
                return getLatestItems()
                    .then(function(items) {
                        return {
                            path: ['latestItems', 'length'],
                            value: items.length
                        };
                    });
            }
        },
        {
            route: 'latestItems[{ranges:indexRanges}]',
            get: function(pathSet) {
                return getLatestItems()
                    .then(function(items) {
                        var selected = [];

                        pathSet.indexRanges.forEach(function(range) {
                            for (var i = range.from, c = 0;
                                 (range.to && i <= range.to) || (range.length && c < length);
                                 ++i, ++c) {
                                selected.push({
                                    path: ['latestItems', i],
                                    value: jsong.ref(['items', [items[i].id]])
                                });
                            }
                        });

                        return selected;
                    });
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
    response.send(501, {error: 'Not implemented'});
    next();
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


function getLatestItems(itemLimit) {
    return new Promise(function (resolve, reject) {
        var imgurClientId = '531d13764026e5f',
            imgurClient = restify.createJsonClient({
                url: 'https://api.imgur.com',
                log: log
            });

        imgurClient.get(
            {
                path: '/3/gallery/hot/viral/0.json',
                headers: {
                    'Authorization': 'Client-ID ' + imgurClientId,
                    'Accept': 'application/json'
                }
            },
            function (error, imgurRequest, imgurResponse, obj) {
                if (error) {
                    reject(new Error('Remote API request failed: ' + error.message));
                }
                else if (imgurResponse.statusCode < 200 || imgurResponse.statusCode > 299) {
                    reject(new Error('Remote API returned status code ' + imgurResponse.statusCode));
                }
                else {
                    var items = [];
                    obj.data.forEach(function(image) {
                        if (!image.is_album && image.link) {
                            items.push({
                                id: image.id,
                                title: image.title,
                                description: image.description,
                                url: image.link,
                                full_url: image.link
                            });
                        }
                    });

                    if (itemLimit !== undefined) {
                        resolve(items.slice(0, itemLimit - 1));
                    }
                    else {
                        resolve(items);
                    }
                }
            }
        );
    });
}

function groupBy(list, key) {
    var grouped = {};

    list.forEach(function(item) {
        grouped[item[key]] = item;
    });

    return grouped;
}
