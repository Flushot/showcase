import logging

log = logging.getLogger(__name__)


class HTTPMethodOverrideMiddleware(object):
    """
    Handles HTTP method overrides specified in the 'X-HTTP-Method-Override' header.

    Some clients (such curl/PHP, or older browsers) can only use a subset of
    available HTTP methods (e.g. only GET and POST). In order to remain RESTful,
    the intended method can be emulated by specifying it in a standard header.

    e.g.

        POST /app/form HTTP/1.1
        X-HTTP-Method-Override: PATCH

    is the same as:

        PATCH /app/form HTTP/1.1

    """

    # Don't just allow any method.
    allowed_methods = frozenset(['GET', 'HEAD', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'])

    # These methods should never have a body (entity) attached.
    bodyless_methods = frozenset(['GET', 'HEAD', 'OPTIONS', 'DELETE'])

    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        method = environ.get('HTTP_X_HTTP_METHOD_OVERRIDE', '').upper()
        if method:
            log.debug('HTTP method override: "%s" -> "%s"' % (environ['REQUEST_METHOD'], method))

            if method in self.allowed_methods:
                environ['REQUEST_METHOD'] = method.encode('ascii', 'replace')

            elif method in self.bodyless_methods:
                environ['CONTENT_LENGTH'] = '0'

        return self.app(environ, start_response)
