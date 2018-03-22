from __future__ import print_function
from ScenicLocations import *
import flask

import argparse
import json
import pprint
import requests
import sys
import urllib
import githubstats
import GooglePlaces


list_locs = []

def get_places():
	r1 = requests.get('https://maps.googleapis.com/maps/api/place/textsearch/json?location=30.267153,-97.7430608&radius=10000&type=park&keyword=campground&key=AIzaSyCpfxawr34R_HO8-d78LWu4AsUGzPr_UiY')
	#r1 = requests.get('https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U&input=scenic+locations+near+me')

	json1 = r1.json()

	#location3 = json1["results"][2]["formatted_address"]
	num_items = 12
	i = 0
	while i < num_items:
		placeID = json1["results"][i]["place_id"]
		list_of_locs(placeID)
		i = i + 1
	return list_locs

def list_of_locs(placeID):
		r1 = requests.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeID + '&key=AIzaSyCpfxawr34R_HO8-d78LWu4AsUGzPr_UiY')
		json1 = r1.json()
		try:
			rating =  json1["result"]["rating"]

		except:
			rating = 0

		
		name = json1['result']['name']

		address = json1["result"]["formatted_address"]
		photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + json1['result']['photos'][0]['photo_reference']+ '&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U'
		#src_for_map = "https://www.google.com/maps/embed/place?key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U&origin=place_id:" + placeID + "&output=embed"
		try:
			review1 = json1["result"]["reviews"][0]["text"]
			review2 = json1["result"]["reviews"][1]["text"]
		except:
			review1 = "This place has no reviews yet!"
			review2 = ""
		
		latitude = json1["result"]["geometry"]["location"]["lat"]
		longitude = json1["result"]["geometry"]["location"]["lng"]
		view = ScenicLocations(name, address, rating, review1, review2, photo, latitude, longitude, placeID)
		global list_locs
		list_locs.append(view)

















