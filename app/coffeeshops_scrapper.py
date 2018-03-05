# -*- coding: utf-8 -*-
'''
TL;DR of overall workings of yelp.py
query_api() is called first from start(), then query_api() calls the search(), then search() calls request(), and then request() returns a json object.
the query_api() then sees if businesses are in json oject and prints the first businuss.
'''
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

# Yelp Fusion no longer uses OAuth as of December 7, 2017.
# You no longer need to provide Client ID to fetch Data
# It now uses private keys to authenticate requests (API Key)
# You can find it on
# https://www.yelp.com/developers/v3/manage_app
API_KEY= '1t54qajbOLK-eXDY2rtywLC9aefjxfsZM6T12Vf2aeoTQuWvwt3B6clW_2ORAavpZY9T4GrrNvJWwly37Sp-iRrSfHN8NX6xjW-ysVzzENi91CC8ZCtE4IKnrk17WnYx'


# API constants, you shouldn't have to change these.
API_HOST = 'https://api.yelp.com'
SEARCH_PATH = '/v3/businesses/search'
BUSINESS_PATH = '/v3/businesses/'  # Business ID will come after slash.


# Defaults for our simple example.
DEFAULT_TERM = 'coffee'
DEFAULT_LOCATION = 'Austin, TX'
SEARCH_LIMIT = 10

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

    #print(u'Querying {0} ...'.format(url))

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
    #pprint.pprint(response, indent=2)
    coffeeshop.location = response["location"]["display_address"]
    coffeeshop.latitude = response["coordinates"]["latitude"]
    coffeeshop.longitude = response["coordinates"]["longitude"]
    coffeeshop.hours = response["hours"]
#4
def coffee_shop_results(response):
    '''
    Parse JSON Object, iterate through results and create coffeeshop object for each
    coffeeshop in JSOM object
    return the list of coffee shops
    '''
    list_shops = []

    for obj in response["businesses"] :
        #print (obj, "next \n\n")
        #address = obj["location"]["display_address"]
        coffeeshop =  CoffeeShop(obj["name"],
        obj["id"],
        "n/a",
        obj["price"],
        obj["rating"],
        obj["image_url"],
        "n/a")
        #coffeeshop.location = address
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
    #pprint.pprint(response, indent=2)
    if not businesses:
        print(u'No businesses for {0} in {1} found.'.format(term, location))
        return
    coffee_shops = coffee_shop_results(response)
    return coffee_shops


user = 'TheCoolBeans'
pwd = 'riley5143'
host = 'beansdb.cahtfudy2tyu.us-east-1.rds.amazonaws.com'
db = 'beansdb'
uri = 'mysql://%s:%s@%s/%s' % (user, pwd, host, db)
#app.config['SQLALCHEMY_DATABASE_URI'] = uri
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#db = SQLAlchemy(app)
#db.echo = False

#1
def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('-q', '--term', dest='term', default=DEFAULT_TERM,
                        type=str, help='Search term (default: %(default)s)')
    parser.add_argument('-l', '--location', dest='location',
                        default=DEFAULT_LOCATION, type=str,
                        help='Search location (default: %(default)s)')

    input_values = parser.parse_args()

    try:
        coffee_shops = query_api(input_values.term, input_values.location)

        db = create_engine(uri)
        metadata = MetaData()
        metadata.reflect(bind=db)
        conn = db.connect()
        #select statement
        select_st = select([metadata.tables['Shops']])
        print(metadata.tables['Shops'])
        #selecte query execute
        #res = conn.execute(select_st).fetchall()
        #print (res)

        for shop in coffee_shops :
            ins = metadata.tables['Shops'].insert()
            ins.values(
            shop_yelp_id = shop.id,
            shop_name = shop.name,
            shop_address = shop.location,
            shop_contact = shop.phone,
            shop_price = shop.price,
            shop_hours = shop.hours,
            shop_rating = shop.rating,
            shop_picture = shop.imageUrl,
            shop_latitude = shop.latitude,
            shop_longitude = shop.longitude
            )
        conn.execute(ins)

        return coffee_shops
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
