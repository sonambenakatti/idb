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
    """ Displays the index page accessible at
    """
    return flask.render_template('home.html')

@APP.route('/scenic')
def sceniclocations():
	r1 = requests.get('https://maps.googleapis.com/maps/api/place/textsearch/json?type=park&location=30.267153,-97.7430608&radius=10000&key=AIzaSyD_XJoBX5jhOnTthWnFc1gzJYQ3sumP-pk')
	json1 = r1.json()
	print(json1)
	name1 = json1["results"][0]["name"]
	location1 = json1["results"][0]["formatted_address"]
	photor1 = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + json1['results'][0]['photos'][0]['photo_reference']+ '&key=AIzaSyD_XJoBX5jhOnTthWnFc1gzJYQ3sumP-pk'

	name2 = json1["results"][1]["name"]
	location2 = json1["results"][1]["formatted_address"]
	photor2 = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + json1['results'][1]['photos'][0]['photo_reference']+ '&key=AIzaSyD_XJoBX5jhOnTthWnFc1gzJYQ3sumP-pk'

	
	name3 = json1["results"][2]["name"]
	location3 = json1["results"][2]["formatted_address"]
	photor3 = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + json1['results'][2]['photos'][0]['photo_reference']+ '&key=AIzaSyD_XJoBX5jhOnTthWnFc1gzJYQ3sumP-pk'
	return flask.render_template('products.html', name1=name1, location1=location1, photo1=photor1, name2=name2, location2=location2, photo2=photor2, name3=name3, location3=location3, photo3=photor3)


if __name__ == '__main__':
    #APP.debug=True
    APP.run()
