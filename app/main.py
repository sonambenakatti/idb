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

@APP.route('/api/about', methods=['GET'])
def get_about():
    about_json = {}
    commits = githubstats.user_commits()
    issues = githubstats.user_issues()
    about_json["commits"] = commits
    about_json["issues"] = issues
    return jsonify({'about': about_json})

@APP.route('/<path:path>')
def catch_all (path):
    return flask.render_template('home.html')

@APP.route('/api/sceniclocations', methods=['GET'])
def get_sceniclocations() :
    jsonRes = []
    try:
        result = engine.execute('SELECT * FROM Scenic').fetchall()
        jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    except:
        flask.abort(500)
    if len(jsonRes) <= 2:
        flask.abort(500)  # nothing is in there
    return jsonRes


@APP.route('/api/coffeeshops', methods=['GET'])
def get_coffeeshops() :
    """
    returns all coffeeshops from the Shops table
    """
    jsonRes = []
    try:
        result = engine.execute('SELECT * FROM Shops').fetchall()
        jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    except:
        flask.abort(500)
    if len(jsonRes) <= 2:
        flask.abort(500)  # nothing is in there
    return jsonRes

@APP.route('/api/coffeeshops/<coffeeId>', methods=['GET'])
def get_coffeeshop(coffeeId) :
    """
    returns a row based off of coffeeId from the Shops table
    """
    jsonRes = []
    try:
        result = engine.execute('SELECT * FROM Shops WHERE shop_yelp_id = %s', coffeeId).fetchall()
        jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    except:
        flask.abort(500)
    if len(jsonRes) <= 2:
        flask.abort(500)  # nothing is in there
    return jsonRes

@APP.route('/api/snapshots', methods=['GET'])
def get_snapshots() :
    """
    returns all snapshots from the Snapshots table
    """
    jsonRes = []
    try:
        result = engine.execute('SELECT * FROM Snapshots').fetchall()
        print(result)
        jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    except Exception as e:
        print(e)
        flask.abort(500)
    if len(jsonRes) <= 2:
        flask.abort(500)  # nothing is in there
    return jsonRes

@APP.route('/api/snapshot/<snapshotId>', methods=['GET'])
def get_snapshot(snapshotId) :
    """
    returns a row based off of snapshotId from the Snapshots table
    """
    jsonRes = []
    try:
        result = engine.execute('SELECT * FROM Snaphots WHERE snap_photo_id = %s', snapshotId).fetchall()
        jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    except:
        flask.abort(500)
    if len(jsonRes) <= 2:
        flask.abort(500)  # nothing is in there
    return jsonRes
    
if __name__ == '__main__':
    #APP.debug=True
    APP.run()
