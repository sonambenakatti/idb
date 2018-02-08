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

# Create the application.
APP = flask.Flask(__name__)

@APP.route('/')
def index():
    """ Displays the index page accessible at '/'
    """
    return flask.render_template('home.html')

@APP.route('/templates/coffeeshops.html')
def coffeeshops():
    yelp.start()
    return flask.render_template('coffeeshops.html')

if __name__ == '__main__':
    APP.debug=True
    APP.run()
