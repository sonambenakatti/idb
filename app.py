#!/usr/bin/env python
#push initial test jaemin
from __future__ import print_function

import flask

import argparse
import json
import pprint
import requests
import sys
import urllib

import yelp
#import github

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


@APP.route('/templates/coffeeshops.html')
def coffeeshops():
    yelp.start()
    return flask.render_template('coffeeshops.html')

@APP.route('/templates/about.html')
def about():
    return flask.render_template('about.html')

if __name__ == '__main__':
    #APP.debug=True
    APP.run()
