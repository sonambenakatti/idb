# -*- coding: utf-8 -*-
from __future__ import print_function
import argparse
import json
import pprint
import requests
import sys
import urllib
import sqlalchemy
from sqlalchemy import *
import pymysql
from coffeeshop import CoffeeShop
from configparser import SafeConfigParser

pymysql.install_as_MySQLdb()

# This client code can run on Python 2.x or 3.x.  Your imports can be
# simpler if you only need one of those.
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

# read congig file for secrets
parser = SafeConfigParser()
parser.read('config.ini')

# wrapper function for parsing config file
def my_parser(section, option):
    return str(parser.get(section, option).encode('ascii','ignore').decode('utf-8'))

# Yelp Fusion no longer uses OAuth as of December 7, 2017.
# You no longer need to provide Client ID to fetch Data
# It now uses private keys to authenticate requests (API Key)
# You can find it on
# https://www.yelp.com/developers/v3/manage_app
API_KEY = my_parser('coffeeshops', 'API_KEY')

# API constants, you shouldn't have to change these.
API_HOST = 'https://api.yelp.com'
SEARCH_PATH = '/v3/businesses/search'
BUSINESS_PATH = '/v3/businesses/'  # Business ID will come after slash.

# Defaults for our simple example.
DEFAULT_TERM = 'coffee'
DEFAULT_LOCATION = 'Austin, TX'
SEARCH_LIMIT = 27

# called in #3 and #6
def request(host, path, api_key, url_params=None):
    """Given your API_KEY, send a GET request to the API.
    Args:
        host (str): The domain host of the API.
        path (str): The path of the API after the domain.
        API_KEY (str): Your API Key.
        url_params (dict): An optional set of query parameters in the request.
    Returns:
        dict: The JSON response from the request.
    Raises:
        HTTPError: An error occurs from the HTTP request.
    """
    url_params = url_params or {}
    url = '{0}{1}'.format(host, quote(path.encode('utf8')))
    headers = {
        'Authorization': 'Bearer %s' % api_key,
    }
    response = requests.request('GET', url, headers=headers, params=url_params)

    return response.json()

#5
def get_business(business_id, coffeeshop):
    """Query the Business API by a business ID.
    Args:
        business_id (str): The ID of the business to query.
    Returns:
        dict: The JSON response from the request.
    """
    global API_KEY

    business_path = BUSINESS_PATH + business_id
    response =  request(API_HOST, business_path, API_KEY)
    pprint.pprint(response, indent=2)
    hours = "Hours Not Found"
    if(('hours' in response)) :
        hours = response["hours"]

    location = "Location Not Found"
    if(('location' in response)) :
        location = response["location"]["display_address"]

    latitude = "Latitude Not Found"
    if(('coordinates' in response)) :
        latitude = response["coordinates"]["latitude"]

    longitude = "Longitude Not Found"
    if(('coordinates' in response)) :
        longitude = response["coordinates"]["longitude"]

    contact = "No Contact Info"
    if(('contact' in response)) :
        contact = response["display_phone"]

    coffeeshop.location = location
    coffeeshop.latitude = latitude
    coffeeshop.longitude = longitude
    coffeeshop.hours = hours
    coffeeshop.phone = contact
#4
def coffee_shop_results(response):
    '''
    Parse JSON Object, iterate through results and create coffeeshop object for each
    coffeeshop in JSOM object
    return the list of coffee shops
    '''
    list_shops = []

    for obj in response["businesses"] :
        if(obj is not None) :
            price = "Price Not Found"
            if(('price' in obj)) :
                price = obj["price"]

            rating = "No Ratings"
            if(('rating' in obj)) :
                rating = obj["rating"]

            img_url = "No Image Found"
            if(('image_url' in obj)) :
                img_url = obj["image_url"]

            coffeeshop =  CoffeeShop(obj["name"],
            obj["id"],
            "n/a",
            price,
            rating,
            img_url,
            "n/a")

            get_business(coffeeshop.id, coffeeshop)
            list_shops.append(coffeeshop)

    return list_shops

#3
def search(api_key, term, location):
    """Query the Search API by a search term and location.
    Args:
        term (str): The search term passed to the API.
        location (str): The search location passed to the API.
    Returns:
        dict: The JSON response from the request.
    """

    url_params = {
        'term': term.replace(' ', '+'),
        'location': location.replace(' ', '+'),
        'limit': SEARCH_LIMIT
    }
    return request(API_HOST, SEARCH_PATH, api_key, url_params=url_params)

#2
def query_api(term, location):
    """Queries the API by the input values from the user.
    Args:
        term (str): The search term to query.
        location (str): The location of the business to query.
    """
    response = search(API_KEY, term, location)
    businesses = response.get('businesses')
    if not businesses:
        print(u'No businesses for {0} in {1} found.'.format(term, location))
        return
    coffee_shops = coffee_shop_results(response)
    return coffee_shops

# get DB creds
user = my_parser('database', 'user')
pwd = my_parser('database', 'pwd')
host = my_parser('database', 'host')
db = my_parser('database', 'db')
uri = 'mysql://%s:%s@%s/%s' % (user, pwd, host, db)

#1
def main():
    '''
    Requests the coffeeshops by each city and stores them in our mySQL db.
    '''
    try:
        db = create_engine(uri)
        metadata = MetaData()
        metadata.reflect(bind=db)
        conn = db.connect()
        select_st = select([metadata.tables['Cities']])
        res = conn.execute(select_st)
        for _row in res:
            print (_row[1])
            coffee_shops = query_api('coffee', _row[1])
            for shop in coffee_shops :
                ins = insert(metadata.tables['Shops']).values(
                shop_name = bytes(shop.name, 'utf8'),
                shop_address = bytes(shop.location, 'utf8'),
                shop_contact = bytes(shop.phone, 'utf8'),
                shop_price = bytes(shop.price, 'utf8'),
                shop_hours = bytes(shop.hours, 'utf8'),
                shop_rating = shop.rating,
                shop_picture = bytes(shop.imageUrl, 'utf8'),
                shop_latitude = shop.latitude,
                shop_longitude = shop.longitude,
                city_id = _row[0]
                )
                conn = db.connect()
                conn.execute(ins)
    except HTTPError as error:
        sys.exit(
            'Encountered HTTP error {0} on {1}:\n {2}\nAbort program.'.format(
                error.code,
                error.url,
                error.read(),
            )
        )


if __name__ == '__main__':
    main()
