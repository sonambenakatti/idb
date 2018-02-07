#!/usr/bin/env python
from __future__ import print_function

import flask

import argparse
import json
import pprint
import requests
import sys
import urllib

try:
    # For Python 3.0 and later
    from urllib.error import HTTPError
    from urllib.parse import quote
    from urllib.parse import urlencode
except ImportError:
    # Fall back to Python 2's urllib2 and urllib
    from urllib2 import HTTPError
    from urllib import quote
    from urllib import urlencode

API_KEY= "1t54qajbOLK-eXDY2rtywLC9aefjxfsZM6T12Vf2aeoTQuWvwt3B6clW_2ORAavpZY9T4GrrNvJWwly37Sp-iRrSfHN8NX6xjW-ysVzzENi91CC8ZCtE4IKnrk17WnYx "


# API constants, you shouldn't have to change these.
API_HOST = 'https://api.yelp.com'
SEARCH_PATH = '/v3/businesses/search'
BUSINESS_PATH = '/v3/businesses/'  # Business ID will come after slash.


# Defaults for our simple example.
DEFAULT_TERM = 'coffee'
DEFAULT_LOCATION = 'Austin, TX'
SEARCH_LIMIT = 3


# Create the application.
APP = flask.Flask(__name__)


@APP.route('/')
def index():
    """ Displays the index page accessible at '/'
    """
    return flask.render_template('index.html')


if __name__ == '__main__':
    APP.debug=True
    APP.run()
