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
user = my_parser('database', 'user')
pwd = my_parser('database', 'pwd')
host = my_parser('database', 'host')
db = my_parser('database', 'db')
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

#Reroutes to API to get cities
@APP.route('/getcities', methods=['GET'])
def get_cities():
    return redirect('//api.espressoyoself.me/getcities', code=302)

#Reroutes to path
@APP.route('/<path:path>')
def catch_all (path):
    return flask.render_template('home.html')

#Reroutes to API to get scenic locations 
@APP.route('/getsceniclocations', methods=['GET'])
def get_sceniclocations() :
    return redirect('//api.espressoyoself.me/sceniclocations', code=302)

#Reroutes to API to a scenic location by the scenic id
@APP.route('/getsceniclocation/<scenicId>', methods=['GET'])
def get_sceniclocation(scenicId) :

    return redirect('//api.espressoyoself.me/sceniclocation/' + scenicId, code=302)

#Reroutes to API to get coffeeshops
@APP.route('/getcoffeeshops', methods=['GET'])
def get_coffeeshops() :

    return redirect('//api.espressoyoself.me/coffeeshops', code=302)

#Reroutes to API to get a coffeeshop by the shop id
@APP.route('/getcoffeeshop/<coffeeId>', methods=['GET'])
def get_coffeeshop(coffeeId) :

    return redirect('//api.espressoyoself.me/coffeeshop/' + coffeeId, code=302)

#Reroutes to API to get snapshots
@APP.route('/getsnapshots', methods=['GET'])
def get_snapshots() :

    return redirect('//api.espressoyoself.me/snapshots', code=302)

#Reroutes to API to get a snapshot by the shap id
@APP.route('/getsnapshot/<snapshotId>', methods=['GET'])
def get_snapshot(snapshotId) :

    return redirect('//api.espressoyoself.me/snapshot/' + snapshotId, code=302)


#Reroutes to API to get data based on a search key
@APP.route('/search/<searchkey>',  methods=['GET'])
def search(searchkey):
    print(searchkey)

    return redirect('//api.espressoyoself.me/search/' + searchkey, code=302)


#NEARBY SEARCHES

#Reroutes to API to get scenic locations close to a shop by the shop id
@APP.route('/nearby_scenic_from_shops/<shop_id>',  methods=['GET'])
def nearby_scenic_from_shops(shop_id):
    return redirect('//api.espressoyoself.me/nearby_scenic_from_shops/' + shop_id, code=302)


#Reroutes to API to get shops close to a scenic location by the location id
@APP.route('/nearby_shops_from_scenic/<scenic_id>',  methods=['GET'])
def nearby_shops_from_scenic(scenic_id):
    return redirect('//api.espressoyoself.me/nearby_shops_from_scenic/' + scenic_id, code=302)


#Reroutes to API to get the coffeeshop at which the snap was taken
@APP.route('/snapshots_shop/<shop_id>',  methods=['GET'])
def snapshots_shop(shop_id):
    return redirect('//api.espressoyoself.me/snapshots_shop/' + shop_id, code=302)

#Reroutes to API to get the scenic location at which the snap was taken
@APP.route('/snapshots_scenic/<scenic_id>',  methods=['GET'])
def snapshots_scenic(scenic_id):

    return redirect('//api.espressoyoself.me/snapshots_scenic/' + scenic_id, code=302)




if __name__ == '__main__':
    #APP.debug=True
    APP.run()
