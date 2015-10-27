#!/usr/bin/env python
import os
import datetime
import json
import logging
import requests

#from . import middleware

from flask import Flask, request
from werkzeug.contrib.fixers import ProxyFix

log = logging.getLogger(__name__)
app = application = Flask(__name__.split('.')[0])
#app.config.from_pyfile()
#app.static_folder = os.path.join(os.path.dirname(__file__), 'static')
app.wsgi_app = reduce(lambda x, y: y(x),
                      [
                          #middleware.HTTPMethodOverrideMiddleware,
                          ProxyFix
                      ],
                      app.wsgi_app)

IMGUR_CLIENT_ID = '531d13764026e5f'
IMGUR_BEARER_TOKEN = '8baa12d283fb230bf5aaf539dfe468a337cd791a'


@app.route('/items/')
def items():
    response = requests.get('https://api.imgur.com/3/gallery/hot/viral/0.json',
                            headers={
                                #'Authorization': 'Bearer %s' % IMGUR_BEARER_TOKEN,
                                'Authorization': 'Client-ID %s' % IMGUR_CLIENT_ID,
                                'Accept': 'application/json'
                            })

    if not (199 < response.status_code < 300):
        return response.text, response.status_code

    items = [
        {
            'id': image['id'],
            'title': image['title'],
            'url': image['link']
        }
        for image in response.json()['data']
        if not image['is_album'] and image.get('link')
    ]

    return (
        json.dumps(items[:30], indent=4),
        200,
        {'Content-Type': 'application/json'}
    )


# @app.route('/items/')
# def items():
#     paths = request.args.get('paths')
#     log.info('paths: %s' % paths)

#     titles = 'foo bar baz bing blah'.split(' ')
#     items = {i: {'id': i, 'title': title} for i, title in enumerate(titles)}

#     return (
#         json.dumps({
#             'jsonGraph': {
#                 'items': items
#             },
#             'paths': paths
#         }, indent=4), 
#         200,  # OK
#         {'Content-Type': 'application/json'}
#     )


def start_server(listen_address, listen_port, debug=False,
                 ssl_public_key_file=None, ssl_private_key_file=None):
    import paste.httpserver
    import paste.reloader

    # Configure debug environment
    if debug:
        app.debug = True
        app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0  # Don't cache files

    # Configure SSL context
    use_ssl = (ssl_public_key_file is not None)
    if use_ssl:
        from OpenSSL import SSL
        ssl_context = SSL.Context(SSL.SSLv23_METHOD)
        ssl_context.use_privatekey_file(ssl_private_key_file)
        ssl_context.use_publickey_file(ssl_public_key_file)
    else:
        ssl_context = None

    if debug:
        # Process will exit when code changes
        # If this is being run in the 'dev_server' script, it will auto-restart
        paste.reloader.install()

    log.info('Static folder: %s' % app.static_folder)
    log.info('Starting server on %s://%s:%d' % (('https' if use_ssl else 'http'),
                                                listen_address,
                                                listen_port))

    # Start HTTP server
    paste.httpserver.serve(app,
                           host=listen_address,
                           port=listen_port,
                           ssl_context=ssl_context,
                           use_threadpool=not debug)


if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)
    start_server('0.0.0.0', 8888, debug=True)
