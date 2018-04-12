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
import pymysql
import sqlalchemy
from sqlalchemy import *
from configparser import SafeConfigParser

pymysql.install_as_MySQLdb()

# read congig file for secrets
parser = SafeConfigParser()
parser.read('config.ini')

# wrapper function for parsing config file
def my_parser(section, option):
    return str(parser.get(section, option).encode('ascii','ignore').decode('utf-8'))

# get DB creds
user = my_parser('database', 'user')
pwd = my_parser('database', 'pwd')
host = my_parser('database', 'host')
db = my_parser('database', 'db')
uri = 'mysql://%s:%s@%s/%s' % (user, pwd, host, db)

api_key = my_parser('places', 'api_key')

# Database variable that is connected to database.
engine = create_engine(uri)

# Metadata for database.
metadata = MetaData()
metadata.reflect(bind=engine)

# Create the application.
list_locs = []

def get_places():
	cities = engine.execute('SELECT city_id, city_name FROM Cities').fetchall()
	for c in cities:
		city_name = c.city_name
		city_id = c.city_id
		city_name = city_name[:-4]
		city_name = city_name.lower()
		city_name = city_name.replace(" ", "+")
		r1 = requests.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=nature+in+'+ city_name +'&key=' + api_key)
		json1 = r1.json()
		for i in json1["results"]:
			placeID = i["place_id"]
			list_of_locs(placeID, c.city_id)

	return list_locs

def list_of_locs(placeID, city_id):
		r1 = requests.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeID + '&key=' + api_key)
		json1 = r1.json()
		try:
			rating =  json1["result"]["rating"]
		except:
			rating = 0
		name = json1['result']['name']
		address = json1["result"]["formatted_address"]
		try:
			photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + json1['result']['photos'][0]['photo_reference']+ '&key=' + api_key
		except:
			photo = ''
		try:
			review1 = json1["result"]["reviews"][0]["text"]
		except:
			review1 = "This place has no reviews yet!"
		try:
			review2 = json1["result"]["reviews"][1]["text"]
		except:
			review2 = ""

		latitude = json1["result"]["geometry"]["location"]["lat"]
		longitude = json1["result"]["geometry"]["location"]["lng"]
		view = ScenicLocations(name, address, rating, review1, review2, photo, latitude, longitude, int(city_id))
		global list_locs
		list_locs.append(view)
