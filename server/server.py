import os
import datetime
import json
import logging
import requests
import time

from flask import request

from .shared import app


IMGUR_CLIENT_ID = '531d13764026e5f'

log = logging.getLogger(__name__)
application = app


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

    # time.sleep(2)
    return (
        json.dumps(items[:30], indent=4),
        200,
        {'Content-Type': 'application/json'}
    )
