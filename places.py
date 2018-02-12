from __future__ import print_function
from ScenicLocations import ScenicLocations
import flask

import argparse
import json
import pprint
import requests
import sys
import urllib
import yelp
import snapshots
import githubstats
import GooglePlaces


list_locs = []

def get_places():
	r1 = requests.get('https://maps.googleapis.com/maps/api/place/textsearch/json?location=30.267153,-97.7430608&radius=10000&type=park&keyword=natural_feature&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U')
	json1 = r1.json()
	
	print(json1)

	#location3 = json1["results"][2]["formatted_address"]
	placeID1 = json1["results"][0]["place_id"]
	placeID2 = json1["results"][1]["place_id"]
	placeID3 = json1["results"][2]["place_id"]
	list_of_locs(placeID1)
	list_of_locs(placeID2)
	list_of_locs(placeID3)
	return list_locs

def list_of_locs(placeID):
	r1 = requests.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeID + '&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U')
	json1 = r1.json()
	print(json1)
	try:
		rating =  json1["result"]["rating"]

	except:
		rating = 0

	
	name = json1['result']['name']

	address = json1["result"]["formatted_address"]
	rating= json1["result"]["rating"]
	photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + json1['result']['photos'][0]['photo_reference']+ '&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U'
	#src_for_map = "https://www.google.com/maps/embed/place?key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U&origin=place_id:" + placeID + "&output=embed"
	reviews = json1["result"]["reviews"]

	scl = ScenicLocations(name, placeID, photo, rating, reviews, address)

	list_locs.append(scl)






