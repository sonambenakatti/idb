#!/usr/bin/env python
#push initial test jaemin

from __future__ import print_function
import sys
import flask
from flask import Flask, jsonify
import sqlalchemy
from sqlalchemy import *
import pymysql
import json
import pprint
from photo import Photo
from flask_cors import CORS, cross_origin
import random


pymysql.install_as_MySQLdb()

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
CORS(APP)
'''
@APP.route('/')
def home():
    return "You have reached espressoyoself's rest api"
'''

@APP.route('/')
def home():
    return flask.render_template('home.html')

@APP.route('/getcities', methods=['GET'])
def get_cities():
    try:
        result = engine.execute('SELECT city_id, city_name FROM Cities').fetchall()
        jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    except:
        flask.abort(500)
    if len(jsonRes) <= 2:
        flask.abort(500)  # nothing is in there
    return jsonRes

@APP.route('/<path:path>')
def catch_all (path):
    return flask.render_template('home.html')

def alchemyencoder(obj):
    """
    JSON encoder function for SQLAlchemy special classes.
    Invoked on every column of the returned row
    in the table from the database. ex. used in shops get api.
    """
    if isinstance(obj, bytes):
        return obj.decode('utf8')
'''
@APP.route('/about',  methods=['GET'])
'''
@APP.route('/getabout', methods=['GET'])
def get_about():
    about_json = {}
    commits = githubstats.user_commits()
    issues = githubstats.user_issues()
    about_json["commits"] = commits
    about_json["issues"] = issues
    return jsonify({'about': about_json})
'''
@APP.route('/sceniclocations', methods=['GET'])
'''
@APP.route('/getsceniclocations', methods=['GET'])
def get_sceniclocations() :
    jsonRes = []
    print("IN SCENIC")

    try:
        result = engine.execute('SELECT * FROM Scenic').fetchall()
        jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    except:
        flask.abort(500)
    if len(jsonRes) <= 2:
        flask.abort(500)  # nothing is in there
    return jsonRes
'''
@APP.route('/sceniclocation/<scenicId>', methods=['GET'])
'''
@APP.route('/getsceniclocation/<scenicId>', methods=['GET'])
def get_sceniclocation(scenicId) :
    jsonRes = []
    print("IN SCENIC ID")

    try:
        result = engine.execute('SELECT * FROM Scenic WHERE scenic_id = %s', str(scenicId)).fetchall()
        jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    except:
        flask.abort(500)
    if len(jsonRes) <= 2:
        flask.abort(500)  # nothing is in there
    return jsonRes
'''
@APP.route('/coffeeshops', methods=['GET'])
'''
@APP.route('/getcoffeeshops', methods=['GET'])
def get_coffeeshops() :
    """
    returns all coffeeshops from the Shops table
    """
    jsonRes = []
    print("IN COFFEESHOPS")

    try:
        result = engine.execute('SELECT * FROM Shops').fetchall()
        jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    except:
        flask.abort(500)
    if len(jsonRes) <= 2:
        flask.abort(500)  # nothing is in there
    return jsonRes
'''
@APP.route('/coffeeshop/<coffeeId>', methods=['GET'])
'''
@APP.route('/getcoffeeshop/<coffeeId>', methods=['GET'])
def get_coffeeshop(coffeeId) :
    """
    returns a row based off of coffeeId from the Shops table
    """
    jsonRes = []
    print("IN COFFEESHOP. ID")

    try:
        result = engine.execute('SELECT * FROM Shops WHERE shop_id = %s', str(coffeeId)).fetchall()
        jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    except:
        flask.abort(500)
    if len(jsonRes) <= 2:
        flask.abort(500)  # nothing is in there
    return jsonRes
'''
@APP.route('/snapshots', methods=['GET'])
'''
@APP.route('/getsnapshots', methods=['GET'])
def get_snapshots() :
    """
    Implement RESTful API here
    """
    jsonRes = []
    print("IN SNAPSHOTS")
    try:
        result = engine.execute('SELECT * FROM Snapshots').fetchall()
        jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    except Exception as e:
        print(e)
        flask.abort(500)
    if len(jsonRes) <= 2:
        flask.abort(500)  # nothing is in there
    return jsonRes
'''
@APP.route('/snapshot/<snapshotId>',  methods=['GET'])
'''
@APP.route('/getsnapshot/<snapshotId>', methods=['GET'])
def get_snapshot(snapshotId) :
    """
    returns a row based off of snapshotId from the Snapshots table
    """
    jsonRes = []
    print("IN SNAPSHOT ID")
    try:
        result = engine.execute('SELECT * FROM Snapshots WHERE snap_id = %s', str(snapshotId)).fetchall()
        jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
        print(result)
    except:
        flask.abort(500)
    if len(jsonRes) <= 2:
        flask.abort(500)  # nothing is in there
    return jsonRes


@APP.route('/search/<searchkey>',  methods=['GET'])
def search(searchkey):
    search_key = "%" + searchkey + "%"
    print("searchkey: " + searchkey)
    shops = engine.execute('SELECT * FROM Shops WHERE shop_name LIKE %s OR shop_address LIKE %s OR shop_contact LIKE %s OR shop_price LIKE %s OR shop_hours LIKE %s OR shop_rating LIKE %s', (search_key, search_key, search_key, search_key, search_key, search_key)).fetchall()
    scenic = engine.execute('SELECT * FROM Scenic WHERE scenic_name LIKE %s OR scenic_address LIKE %s OR scenic_rating LIKE %s', (search_key, search_key, search_key)).fetchall()
    snapshots = engine.execute('SELECT * FROM Snapshots WHERE snap_name LIKE %s OR snap_photographer LIKE %s OR snap_username LIKE %s OR snap_tags LIKE %s', (search_key, search_key, search_key, search_key)).fetchall()
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



#COFFEE SHOPS SORTING
@APP.route('/coffeeshops/sort/priceasc',  methods=['GET'])
def sort_coffeeshops_price_ascending():
    shops = engine.execute('SELECT * FROM Shops ORDER BY shop_price asc').fetchall()
    jsonShops = json.dumps([dict(r) for shop in shops], default=alchemyencoder)
    return jsonShops


@APP.route('/coffeeshops/sort/pricedesc',  methods=['GET'])
def sort_coffeeshops_price_descending():
    shops = engine.execute('SELECT * FROM Shops ORDER BY shop_price desc').fetchall()
    jsonShops = json.dumps([dict(r) for shop in shops], default=alchemyencoder)
    return jsonShops


@APP.route('/coffeeshops/sort/ratingasc',  methods=['GET'])
def sort_coffeeshops_rating_ascending():
    shops = engine.execute('SELECT * FROM Shops ORDER BY shop_rating asc').fetchall()
    jsonShops = json.dumps([dict(r) for shop in shops], default=alchemyencoder)
    return jsonShops


@APP.route('/coffeeshops/sort/ratingdesc',  methods=['GET'])
def sort_coffeeshops_rating_descending():
    shops = engine.execute('SELECT * FROM Shops ORDER BY shop_rating desc').fetchall()
    jsonShops = json.dumps([dict(r) for shop in shops], default=alchemyencoder)
    return jsonShops


@APP.route('/coffeeshops/sort/atoz',  methods=['GET'])
def sort_coffeeshops_name_ascending():
    shops = engine.execute('SELECT * FROM Shops ORDER BY shop_name asc').fetchall()
    jsonShops = json.dumps([dict(r) for shop in shops], default=alchemyencoder)
    return jsonShops

@APP.route('/coffeeshops/sort/ztoa',  methods=['GET'])
def sort_coffeeshops_name_descending():
    shops = engine.execute('SELECT * FROM Shops ORDER BY shop_name desc').fetchall()
    jsonShops = json.dumps([dict(r) for shop in shops], default=alchemyencoder)
    return jsonShops


#SCENIC LOCATIONS SORTING
@APP.route('/sceniclocations/sort/ratingasc',  methods=['GET'])
def sort_sceniclocations_rating_ascending():
    scenic = engine.execute('SELECT * FROM Scenic ORDER BY scenic_rating asc').fetchall()
    jsonScenic = json.dumps([dict(r) for sc in scenic], default=alchemyencoder)
    return jsonScenic


@APP.route('/sceniclocations/sort/ratingdesc',  methods=['GET'])
def sort_sceniclocations_ratng_descending():
    scenic = engine.execute('SELECT * FROM Scenic ORDER BY scenic_rating desc').fetchall()
    jsonScenic = json.dumps([dict(r) for sc in scenic], default=alchemyencoder)
    return jsonScenic


@APP.route('/sceniclocations/sort/atoz',  methods=['GET'])
def sort_sceniclocations_name_ascending():
    scenic = engine.execute('SELECT * FROM Scenic ORDER BY shop_name asc').fetchall()
    jsonScenic = json.dumps([dict(r) for sc in scenic], default=alchemyencoder)
    return jsonScenic

@APP.route('/sceniclocations/sort/ztoa',  methods=['GET'])
def sort_sceniclocations_name_descending():
    scenic = engine.execute('SELECT * FROM Scenic ORDER BY shop_name desc').fetchall()
    jsonScenic = json.dumps([dict(r) for sc in scenic], default=alchemyencoder)
    return jsonScenic



#SNAPSHOTS SORTING
@APP.route('/snapshots/sort/favsasc',  methods=['GET'])
def sort_snapshots_favs_ascending():
    snaps = engine.execute('SELECT * FROM Snapshots ORDER BY snap_favs asc').fetchall()
    jsonSnaps = json.dumps([dict(snap) for snap in snaps], default=alchemyencoder)
    return jsonSnaps


@APP.route('/snapshots/sort/favsdesc',  methods=['GET'])
def sort_snapshots_favs_descending():
    snaps = engine.execute('SELECT * FROM Snapshots ORDER BY snap_favs desc').fetchall()
    jsonSnaps = json.dumps([dict(snap) for snap in snaps], default=alchemyencoder)
    return jsonSnaps


#NEARBY SEARCHES

@APP.route('/nearby_scenic_from_shops/<shop_id>',  methods=['GET'])
def nearby_scenic_from_shops(shop_id):
    print(shop_id)

    query = 'SELECT * FROM Shops WHERE shop_id = %(id)s'
    data={
        'id': int(scenic_id),
    }
    scenic = engine.execute(query, data).fetchone()
    lat = float(shop.shop_latitude)
    lon = float(shop.shop_longitude)
    print(lat)
    print(lon)
    query = 'SELECT *,   6371 * 2 * ASIN(SQRT(POWER(SIN((scenic_latitude - abs(%(lat)s)) * pi()/180 / 2), 2) + COS(scenic_latitude * pi()/180 ) * COS(abs(%(lat)s) * pi()/180) * POWER(SIN((scenic_longitude - (%(lon)s)) *pi()/180 / 2), 2))) as distance FROM Scenic Order by distance asc Limit 10'
    data={
        'lat': float(lat),
        'lon': float(lon),
    }
    scenic = engine.execute(query, data).fetchall()
    print(scenic)

    jsonScenic = json.dumps([dict(sc) for sc in scenic], default=alchemyencoder)
    return jsonScenic


@APP.route('/nearby_shops_from_scenic/<scenic_id>',  methods=['GET'])
def nearby_shops_from_scenic(scenic_id):
    print("in method")
    print(scenic_id)
    query = 'SELECT * FROM Scenic WHERE scenic_id = %(id)s'
    data={
        'id': int(scenic_id),
    }
    scenic = engine.execute(query, data).fetchone()

    print(scenic)
    lat = scenic.scenic_latitude
    lon = scenic.scenic_longitude
    print(lat)
    print(lon)
    query = 'SELECT *,   6371 * 2 * ASIN(SQRT(POWER(SIN((shop_latitude - abs(%(lat)s)) * pi()/180 / 2), 2) + COS(shop_latitude * pi()/180 ) * COS(abs(%(lat)s) * pi()/180) * POWER(SIN((shop_longitude - (%(lon)s)) *pi()/180 / 2), 2))) as distance FROM Shops Order by distance asc Limit 10'
    data={
        'lat': float(lat),
        'lon': float(lon),
    }
    shops = engine.execute(query, data).fetchall()

    jsonShops = json.dumps([dict(shop) for shop in shops], default=alchemyencoder)
    return jsonShops

@APP.route('/snapshots_shop/<shop_id>',  methods=['GET'])
def snapshots_shop(shop_id):
    print("IN SNAPSHOTS SHOPS")
    snaps = engine.execute('SELECT * FROM Snapshots where shop_id = shop_id Limit 10').fetchall()
    jsonSnaps = json.dumps([dict(snap) for snap in snaps], default=alchemyencoder)
    return jsonSnaps

@APP.route('/snapshots_scenic/<scenic_id>',  methods=['GET'])
def snapshots_scenic(scenic_id):

    print("IN SNAPSHOTS SCENIC")
    snaps = engine.execute('SELECT * FROM Snapshots where scenic_id = scenic_id Limit 10').fetchall()
    jsonSnaps = json.dumps([dict(snap) for snap in snaps], default=alchemyencoder)
    return jsonSnaps






if __name__ == '__main__':
    #APP.debug=True
    APP.run()


'''
from __future__ import print_function
import sys
import flask
from flask import Flask, jsonify, redirect
import sqlalchemy
from sqlalchemy import *
import pymysql
import json
import pprint
#import githubstats
from photo import Photo

pymysql.install_as_MySQLdb()

user = 'TheCoolBeans'
pwd = 'riley5143'
host = 'beansdb.cahtfudy2tyu.us-east-1.rds.amazonaws.com'
db = 'beansdb'
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

@APP.route('/getabout', methods=['GET'])
def get_about():
    # about_json = {}
    # commits = githubstats.user_commits()
    # issues = githubstats.user_issues()
    # about_json["commits"] = commits
    # about_json["issues"] = issues
    return redirect('//api.espressoyoself.me/about', code=302)

@APP.route('/<path:path>')
def catch_all (path):
    return flask.render_template('home.html')

@APP.route('/getsceniclocations', methods=['GET'])
def get_sceniclocations() :
    return redirect('//api.espressoyoself.me/sceniclocations', code=302)

@APP.route('/getsceniclocation/<scenicId>', methods=['GET'])
def get_sceniclocation(scenicId) :
    # jsonRes = []
    # try:
    #     result = engine.execute('SELECT * FROM Scenic WHERE scenic_id = %s', str(scenicId)).fetchall()
    #     jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    # except:
    #     flask.abort(500)
    # if len(jsonRes) <= 2:
    #     flask.abort(500)  # nothing is in there
    return redirect('//api.espressoyoself.me/sceniclocation/' + scenicId, code=302)

@APP.route('/getcoffeeshops', methods=['GET'])
def get_coffeeshops() :
    """
    returns all coffeeshops from the Shops table
    """
    #
    # jsonRes = []
    # try:
    #     result = engine.execute('SELECT * FROM Shops').fetchall()
    #     jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    # except:
    #     flask.abort(500)
    # if len(jsonRes) <= 2:
    #     flask.abort(500)  # nothing is in there
    return redirect('//api.espressoyoself.me/coffeeshops', code=302)

@APP.route('/getcoffeeshop/<coffeeId>', methods=['GET'])
def get_coffeeshop(coffeeId) :
    """
    returns a row based off of coffeeId from the Shops table
    """
    # jsonRes = []
    # try:
    #     result = engine.execute('SELECT * FROM Shops WHERE shop_id = %s', str(coffeeId)).fetchall()
    #     jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    # except:
    #     flask.abort(500)
    # if len(jsonRes) <= 2:
    #     flask.abort(500)  # nothing is in there
    return redirect('//api.espressoyoself.me/coffeeshop/' + coffeeId, code=302)

@APP.route('/getsnapshots', methods=['GET'])
def get_snapshots() :
    """
    returns all snapshots from the Snapshots table
    """
    return redirect('//api.espressoyoself.me/snapshots', code=302)

@APP.route('/getsnapshot/<snapshotId>', methods=['GET'])
def get_snapshot(snapshotId) :
    """
    returns a row based off of snapshotId from the Snapshots table
    """

    #     flask.abort(500)  # nothing is in there
    return redirect('//api.espressoyoself.me/snapshot/' + snapshotId, code=302)

if __name__ == '__main__':
    #APP.debug=True
    APP.run()
'''
