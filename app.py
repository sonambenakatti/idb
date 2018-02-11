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

json1 = ""

@APP.route('/')
def index():
    """ Displays the index page accessible at
    """
    return flask.render_template('home.html')

@APP.route('/scenic')
def sceniclocations():
	r1 = requests.get('https://maps.googleapis.com/maps/api/place/textsearch/json?type=park&location=30.267153,-97.7430608&radius=10000&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U')
	json1 = r1.json()
	
	print(json1)
	try:
		rating1 =  json1["results"][0]["rating"]

	except:
		rating1 = 0

	try:
		rating2 =  json1["results"][1]["rating"]
	except:
		rating2 = 0

	try:
		rating3 =  json1["results"][2]["rating"]
	except:

		rating3 = 0

	name1 = json1["results"][0]["name"]
		#location1 = json1["results"][0]["formatted_address"]
		#location1 = json1["results"][0]["formatted_address"]

	photor1 = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + json1['results'][0]['photos'][0]['photo_reference']+ '&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U'

	name2 = json1["results"][1]["name"]
		#location2 = json1["results"][1]["formatted_address"]

	photor2 = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + json1['results'][1]['photos'][0]['photo_reference']+ '&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U'

	
	name3 = json1["results"][2]["name"]
	#location3 = json1["results"][2]["formatted_address"]
	placeID1 = json1["results"][0]["place_id"]
	placeID2 = json1["results"][1]["place_id"]
	placeID3 = json1["results"][2]["place_id"]


	photor3 = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + json1['results'][2]['photos'][0]['photo_reference']+ '&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U'
	return flask.render_template('products.html', name1=name1, placeID1= placeID1, rating1=rating1, photo1=photor1, name2=name2, placeID2=placeID2, rating2=rating2, photo2=photor2, name3=name3, placeID3=placeID3, rating3=rating3, photo3=photor3)

@APP.route('/scenic/<placeID>')
def scenicdetails(placeID):
	r1 = requests.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeID + '&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U')
	json1 = r1.json()
	print(json1)
	name = json1['result']['name']

	address = json1["result"]["formatted_address"]
	rating= json1["result"]["rating"]
	photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + json1['result']['photos'][0]['photo_reference']+ '&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U'
	src_for_map = "https://www.google.com/maps/embed/place?key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U&origin=place_id:" + placeID + "&output=embed"

	return flask.render_template('scenicdetails.html', name=name, address=address, photo=photo, src_for_map=src_for_map, rating=rating)





@APP.route('/templates/coffeeshops.html')
def coffeeshops():
    yelp.start()
    return flask.render_template('coffeeshops.html')

if __name__ == '__main__':
    #APP.debug=True
    APP.run()
