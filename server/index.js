var restify = require('restify');
var FalcorRouter = require('falcor-router');
var jsong = require('falcor-json-graph');
var falcorRestifyMiddleware = require('falcor-restify');
var Promise = require('promise');
//var Rx = require('rx');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var fs = require('fs');
var path = require('path');

var utils = require('./utils');
var logging = require('./logging');

var listenPort = 3002,
    staticPath = path.join(__dirname, '..', 'public'),
    log = logging.log;

var server = restify.createServer({
    name: logging.serverName,
    log: logging.child
});

server.use(restify.queryParser());
server.pre(restify.pre.sanitizePath());

logging.setupServer(server);

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
    utils.getLatestItems()
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
    var userId = 1,
        settings = {
            first_name: 'Chris',
            last_name: 'Lyon'
        };

    /**
     * Shape of model.json:
     *
     *  {
     *      'greeting': 'Hello World',
     *      'items': {
     *          'xyz': {
     *              'id': 'xyz',
     *              'title': 'Foo',
     *              'description': 'Foo description',
     *              'url': 'http://whatever/foo.jpg',
     *              'full_url': 'http://whatever/foo.jpg'
     *          },
     *          ...
     *      },
     *      'latestItems': [
     *          { '$type': 'ref', value: ['items', 'xyz'] },
     *          ...
     *      ],
     *      'settings': {
     *          'first_name': 'Chris',
     *          'last_name': 'Lyon'
     *      }
     *  }
     *
     */
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
                return utils.getLatestItems()  // TODO: get from persistent storage instead
                    .then(function(items) {
                        var jsonGraph = { items: {} },
                            itemsById = utils.groupBy(items, 'id');

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
                return utils.getLatestItems()
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
                return utils.getLatestItems()
                    .then(function(items) {
                        var selected = [],
                            visited = [];

                        pathSet.indexRanges.forEach(function(range) {
                            for (var i = range.from, c = 0;
                                 (range.to && i <= range.to) || (range.length && c < length);
                                 ++i, ++c) {
                                if (!visited.find(i)) {
                                    visited.push(i);
                                    selected.push({
                                        path: ['latestItems', i],
                                        value: jsong.ref(['items', items[i].id])
                                    });
                                }
                            }
                        });

                        return selected;
                    });
            }
        },
        {
            route: 'settings',
            get: function(pathSet) {
                return {
                    path: ['settings'],
                    value: jsong.atom(settings)
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
    response.send(501, {error: 'Not implemented'});
    next();
});


/**
 * Static asset
 */
var serveStatic = restify.serveStatic({ directory: staticPath });
server.get(/.+/, function (request, response, next) {
    var localPath = path.join(staticPath, decodeURIComponent(request.path()));
    fs.stat(localPath, function(err, stats) {
        if (!err) {
            // Static asset
            serveStatic(request, response, next);
        }
        else {
            // Server-side render

            // TODO: use webpack to compile server-side entry point bundle

            // TODO: require server-side entry point bundle
            //var serverBundle = require('server/server.bundle.js');
            //var Root = serverBundle.Root;  // Root component

            // TODO: set window.uiState and window.location so that Root element has enough data to work with
            // TODO: determine if route is valid (using router component and set status code accordingly)

            //var htmlString = ReactDOMServer.renderToString(React.createElement(Root));
            var htmlString = "This non-existant route should be handled by the client application shell: " + localPath;

            response.send(200, htmlString);
            next();
        }
    });
});


server.listen(listenPort, function () {
    console.log('%s listening at %s', server.name, server.url);
});
