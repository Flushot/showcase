#!/usr/bin/env python
import logging

import paste.httpserver
import paste.reloader

from .shared import app, env_name
import server


log = logging.getLogger(__name__)


def start_server(listen_address, listen_port, debug=False,
                 ssl_public_key_file=None, ssl_private_key_file=None):
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
    logging.basicConfig(level=(logging.DEBUG if env_name == 'dev' else logging.INFO))
    log.info('Environment is: %s' % env_name)
    start_server('0.0.0.0', 8888, debug=(env_name == 'dev'))
