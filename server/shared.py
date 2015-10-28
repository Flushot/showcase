import os

from flask import Flask, request
from werkzeug.contrib.fixers import ProxyFix
from flask_socketio import SocketIO

from .middleware import HTTPMethodOverrideMiddleware


env_name = os.environ.get('NODE_ENV', 'dev')

# Init Flask
app = Flask(__name__.split('.')[0])
app.config.from_pyfile('config/%s.cfg' % env_name)

# Install middleware
app.wsgi_app = reduce(lambda x, y: y(x),
                      [
                          HTTPMethodOverrideMiddleware,
                          ProxyFix
                      ],
                      app.wsgi_app)

socketio = SocketIO(app)

# CORS
@app.after_request
def after_request(response):
	response.headers.add('Access-Control-Allow-Origin', '*')
	# response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
	# response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	return response
