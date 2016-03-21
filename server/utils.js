var restify = require('restify');
var Promise = require('promise');
//var Rx = require('rx');
var fs = require('fs');
var path = require('path');

var logging = require('./logging');

var log = logging.log;


exports.getLatestItems = function (itemLimit) {
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
};


exports.groupBy = function (list, key) {
    var grouped = {};

    list.forEach(function(item) {
        grouped[item[key]] = item;
    });

    return grouped;
};
