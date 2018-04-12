from __future__ import print_function
import sys
import flask
from flask import Flask, jsonify, redirect
import sqlalchemy
from sqlalchemy import *
import pymysql
import json
import pprint
import random
#import githubstats
from photo import Photo
from configparser import SafeConfigParser

pymysql.install_as_MySQLdb()

# read congig file for secrets
parser = SafeConfigParser()
parser.read('config.ini')

# wrapper function for parsing config file
def my_parser(section, option):
    return str(parser.get(section, option).encode('ascii','ignore').decode('utf-8'))

# get DB creds
user = 'TheCoolBeans'
pwd = 'riley5143'
host = 'beansdbdev.ch0umvgb0s5r.us-east-1.rds.amazonaws.com'
db = 'beansdbdev'
uri = 'mysql://%s:%s@%s/%s' % (user, pwd, host, db)

# Database variable that is connected to database.
engine = create_engine(uri)
# Metadata for database.
metadata = MetaData()
metadata.reflect(bind=engine)

# Create the application.
APP = flask.Flask(__name__)
def alchemyencoder(obj):
    """
    JSON encoder function for SQLAlchemy special classes.
    Invoked on every column of the returned row
    in the table from the database. ex. used in shops get api.
    """
    if isinstance(obj, bytes):
        return obj.decode('utf8')

@APP.route('/')
def home():
    return flask.render_template('home.html')

@APP.route('/getcities', methods=['GET'])
def get_cities():
    return redirect('//api.espressoyoself.me/getcities', code=302)


@APP.route('/<path:path>')
def catch_all (path):
    return flask.render_template('home.html')

@APP.route('/getsceniclocations', methods=['GET'])
def get_sceniclocations() :
    return redirect('//api.espressoyoself.me/sceniclocations', code=302)

@APP.route('/getsceniclocation/<scenicId>', methods=['GET'])
def get_sceniclocation(scenicId) :

    return redirect('//api.espressoyoself.me/sceniclocation/' + scenicId, code=302)

@APP.route('/getcoffeeshops', methods=['GET'])
def get_coffeeshops() :

    return redirect('//api.espressoyoself.me/coffeeshops', code=302)

@APP.route('/getcoffeeshop/<coffeeId>', methods=['GET'])
def get_coffeeshop(coffeeId) :

    return redirect('//api.espressoyoself.me/coffeeshop/' + coffeeId, code=302)

@APP.route('/getsnapshots', methods=['GET'])
def get_snapshots() :

    return redirect('//api.espressoyoself.me/snapshots', code=302)

@APP.route('/getsnapshot/<snapshotId>', methods=['GET'])
def get_snapshot(snapshotId) :

    return redirect('//api.espressoyoself.me/snapshot/' + snapshotId, code=302)

'''
@APP.route('/search/<searchkey>',  methods=['GET'])
def search(searchkey):
    print(searchkey)

    return redirect('//api.espressoyoself.me/search/' + searchkey, code=302)
'''


#NEARBY SEARCHES
@APP.route('/nearby_scenic_from_shops/<shop_id>',  methods=['GET'])
def nearby_scenic_from_shops(shop_id):
    return redirect('//api.espressoyoself.me/nearby_scenic_from_shops/' + shop_id, code=302)


@APP.route('/nearby_shops_from_scenic/<scenic_id>',  methods=['GET'])
def nearby_shops_from_scenic(scenic_id):
    return redirect('//api.espressoyoself.me/nearby_shops_from_scenic/' + scenic_id, code=302)


@APP.route('/snapshots_shop/<shop_id>',  methods=['GET'])
def snapshots_shop(shop_id):
    return redirect('//api.espressoyoself.me/snapshots_shop/' + shop_id, code=302)

@APP.route('/snapshots_scenic/<scenic_id>',  methods=['GET'])
def snapshots_scenic(scenic_id):

    return redirect('//api.espressoyoself.me/snapshots_scenic/' + scenic_id, code=302)


@APP.route('/search/<searchkey>',  methods=['GET'])
def search(searchkey):
    search_by = searchkey.split(" ")
    print("searchkey: " + searchkey)
    if len(search_by) == 0:
        results = []
        jsonRes = json.dumps([dict(r) for r in results], default=alchemyencoder)
        return jsonRes



    shops_query = 'SELECT DISTINCT * FROM Shops WHERE'
    scenic_query = 'SELECT DISTINCT * FROM Scenic WHERE'
    snapshot_query = 'SELECT DISTINCT * FROM Snapshots WHERE'
    for i in search_by:
        i_search =  '"%%' + str(i) + '%%"'
        i_search = str(i_search)

        print(i_search)
        shops_query += ' shop_name LIKE ' + i_search + '  OR shop_address LIKE ' + i_search + ' OR shop_contact LIKE ' + i_search + ' OR shop_price LIKE ' + i_search + ' OR shop_hours LIKE '+i_search+' OR shop_rating LIKE ' + i_search + ' OR'
        scenic_query += ' scenic_name LIKE ' + i_search + ' OR scenic_address LIKE ' + i_search + ' OR scenic_rating LIKE ' + i_search + ' OR'
        snapshot_query += ' snap_name LIKE ' + i_search + ' OR snap_photographer LIKE ' + i_search + ' OR snap_username LIKE ' + i_search + ' OR snap_tags LIKE ' + i_search + ' OR'
    shops_query = shops_query[:-3]
    scenic_query = scenic_query[:-3]
    snapshot_query = snapshot_query[:-3]
    print(shops_query)
    print(scenic_query)
    #print(snapshot_query)
    shops = engine.execute(shops_query).fetchall()
    scenic = engine.execute(scenic_query).fetchall()
    snapshots = engine.execute(snapshot_query).fetchall()
    results = shops
    results = shops + scenic
    results = results + snapshots
    random.shuffle(results)
    jsonRes = json.dumps([dict(r) for r in results], default=alchemyencoder)

    print(jsonRes)
    '''
    jsonShops = json.dumps([dict(r) for r in shops], default=alchemyencoder)
    jsonScenic = json.dumps([dict(r) for r in scenic], default=alchemyencoder)
    jsonSnaps = json.dumps([dict(r) for r in snapshots], default=alchemyencoder)

    print("jsonShops: " + jsonShops)
    print("jsonScenic: " + jsonScenic)
    print("jsonSnaps: " + jsonSnaps)
    '''

    # TODO: RETURN jsonScenic and jsonSnaps too once we've populated the database!

    return jsonRes


if __name__ == '__main__':
    #APP.debug=True
    APP.run()
