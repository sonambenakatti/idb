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

@APP.route('/about', subdomain='api', methods=['GET'])
def get_about():
    # about_json = {}
    # commits = githubstats.user_commits()
    # issues = githubstats.user_issues()
    # about_json["commits"] = commits
    # about_json["issues"] = issues
    return 'api.espressoyoself.me/about'

@APP.route('/<path:path>')
def catch_all (path):
    return flask.render_template('home.html')

@APP.route('/sceniclocations', subdomain='api', methods=['GET'])
def get_sceniclocations() :
    return 'api.espressoyoself.me/sceniclocations'

@APP.route('/sceniclocation/<scenicId>', subdomain='api', methods=['GET'])
def get_sceniclocation(scenicId) :
    # jsonRes = []
    # try:
    #     result = engine.execute('SELECT * FROM Scenic WHERE scenic_id = %s', str(scenicId)).fetchall()
    #     jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    # except:
    #     flask.abort(500)
    # if len(jsonRes) <= 2:
    #     flask.abort(500)  # nothing is in there
    return 'api.espressoyoself.me/sceniclocation/' + scenicId

@APP.route('/coffeeshops', subdomain='api', methods=['GET'])
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
    return 'api.espressoyoself.me/coffeeshops'

@APP.route('/coffeeshop/<coffeeId>', subdomain='api', methods=['GET'])
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
    return 'api.espressoyoself.me/coffeeshops/' + coffeeId

@APP.route('/snapshots', subdomain='api', methods=['GET'])
def get_snapshots() :
    """
    returns all snapshots from the Snapshots table
    """
    return 'api.espressoyoself.me/snapshots'

@APP.route('/snapshot/<snapshotId>', subdomain='api', methods=['GET'])
def get_snapshot(snapshotId) :
    """
    returns a row based off of snapshotId from the Snapshots table
    """

    #     flask.abort(500)  # nothing is in there
    return 'api.espressoyoself.me/snapshot/' + snapshotId

if __name__ == '__main__':
    #APP.debug=True
    APP.run()
