import os
import datetime
import json
import logging
import requests
import time
import re
import base64
try:
    from cStringIO import StringIO
except ImportError:
    from StringIO import StringIO

from flask import request, abort, url_for, send_file
from flask_socketio import emit

from .shared import app, socketio


IMGUR_CLIENT_ID = '531d13764026e5f'

log = logging.getLogger(__name__)
application = app


@app.route('/items/')
def items():
    item_limit = 60
    response = requests.get('https://api.imgur.com/3/gallery/hot/viral/0.json',
                            headers={
                                'Authorization': 'Client-ID %s' % IMGUR_CLIENT_ID,
                                'Accept': 'application/json'
                            })

    # Request fail?
    if not (199 < response.status_code < 300):
        return response.text, response.status_code

    items = [
        {
            'id': image['id'],
            'title': image['title'],
            'description': image['description'],
            'url': url_for('.image', encodedLink=base64.b64encode(image['link'])),
            'full_url': image['link']
        }
        for image in response.json()['data']
        if not image['is_album'] and image.get('link')
    ]

    # time.sleep(2)
    return (
        json.dumps(items[:item_limit], indent=4),
        200,
        {'Content-Type': 'application/json'}
    )


@app.route('/images/<string:encodedLink>')
def image(encodedLink):
    import hashlib
    import tempfile
    from PIL import Image

    image_link = base64.b64decode(encodedLink)

    # Decoded link valid?
    if re.search(r'^https?://(.+?)\.imgur.com/(.+?)\.(jpg|gif|png)$', image_link) is None:
        log.warn('Denying invalid image link: %s' % image_link)
        abort(403)  # Forbidden; image link can't be any arbitrary URL

    # Check cache first
    cached_image_file = os.path.join(tempfile.gettempdir(), 
                                   '%s.cache' % hashlib.sha256(image_link).hexdigest())
    if os.path.exists(cached_image_file):
        # Cache hit
        log.debug('Using cache for image: %s' % image_link)
        f = open(cached_image_file, 'rb')
        img = Image.open(f)
    else:
        # Download image
        log.debug('Downloading image: %s (saving as: %s)' % (image_link, cached_image_file))
        response = requests.get(image_link,
                                headers={
                                    'Accept': 'image/*'
                                })

        # Request fail?
        if not (199 < response.status_code < 300):
            log.error('Imgur returned %d trying to download image!' % response.status_code)
            return response.text, response.status_code

        with open(cached_image_file, 'wb+') as f:
            f.write(response.content)

        f = open(cached_image_file, 'rb')
        img = Image.open(f)

    # TODO: Cache resized thumb
    img_out = StringIO()
    img = img.convert('RGB')
    img.thumbnail((200, 200))
    img.save(img_out, 'JPEG', quality=70)
    f.close()

    img_out.seek(0)
    return send_file(img_out, mimetype='image/jpeg')


@socketio.on('ping')
def ping_message(message):
    emit('pong', {'data': time.asctime()})
