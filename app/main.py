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
    about_json = {}
    commits = githubstats.user_commits()
    issues = githubstats.user_issues()
    about_json["commits"] = commits
    about_json["issues"] = issues
    return 'api.espressoyoself.me/about'

@APP.route('/<path:path>')
def catch_all (path):
    return flask.render_template('home.html')

photo1 = Photo('3', 'J Dimas', ' josecdimas', '0', '0', 'WINTER SUNNY DAY IN AUSTIN',
'https://farm5.staticflickr.com/4657/40162172101_a30055288c.jpg', '#Austin #Austin, TX #ATX #Zilker Park #winter #dried grass', '1', '1')
photo2 = Photo('5', 'Don Mason', '-Dons', '0', '0', 'A great start to the day', 'https://farm5.staticflickr.com/4605/25036430577_0f11597674.jpg',
'#Austin #Camera #Houndstooth - Frost #Texas #United States \
#coffee #coffee houses #latte art #TX #USA #Nikon #Nikon F3T #cappuccino', '2', '1')
photo3 = Photo('0', 'unknown', 'ClevrCat', '0', '0', 'YESSS. POST-WORKOUT AND HAIRCUT COFFEE. HOUNDSTOOTH HAS THE CUTEST CUPS TOO. \
#ATX #CAFFEINE #COFFEE #HOUNDSTOOTH #AUSTIN @HOUNDSTOOTHCOFFEE' , 'https://farm9.staticflickr.com/8515/29772433785_43acb1720a.jpg',
'#IFTTT #Instagram #Yesss. #Post-workout #haircut #coffee. #Houndstooth #has #cutest #cups #too. #Atx #caffeine #austin #@houndstoothcoffee', '3', '1')


@APP.route('/sceniclocations', subdomain='api', methods=['GET'])
def get_sceniclocations() :
    jsonRes = []
    try:
        result = engine.execute('SELECT * FROM Scenic').fetchall()
        jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    except:
        flask.abort(500)
    if len(jsonRes) <= 2:
        flask.abort(500)  # nothing is in there
    return 'api.espressoyoself.me/sceniclocations'


@APP.route('/coffeeshops', subdomain='api', methods=['GET'])
def get_coffeeshops() :
    """
    returns all coffeeshops from the Shops table
    """
    print('Hello world!', file=sys.stderr)
    jsonRes = []
    try:
        result = engine.execute('SELECT * FROM Shops').fetchall()
        jsonRes = json.dumps([dict(r) for r in result], default=alchemyencoder)
    except:
        flask.abort(500)
    if len(jsonRes) <= 2:
        flask.abort(500)  # nothing is in there
    return 'api.espressoyoself.me/coffeeshops'

@APP.route('/coffeeshops/<coffeeId>', subdomain='api', methods=['GET'])
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
    return 'api.espressoyoself.me/coffeeshops/' + coffeeId

@APP.route('/snapshots', subdomain='api', methods=['GET'])
def get_snapshots() :
    """
    Implement RESTful API here
    """
    # db = create_engine(uri)
    # metadata = MetaData()
    # metadata.reflect(bind=db)
    # conn = db.connect()
    # #select statement
    # select_st = select([metadata.tables['Shops']])
    # res = conn.execute(select_st).fetchall()
    snapshots_json = []
    global photo1
    global photo2
    global photo3
    img_list = []
    img_list.append(photo1)
    img_list.append(photo2)
    img_list.append(photo3)
    length = len(img_list)
    for i in range(0, length) :
        snapshot_dict = {}
        snapshot_dict["name"] = img_list[i].name
        snapshot_dict["title"] = img_list[i].title
        snapshot_dict["num_favorites"] = img_list[i].num_favorites
        snapshot_dict["username"] = img_list[i].username
        snapshot_dict["imageUrl"] = img_list[i].imageUrl
        snapshot_dict["tags"] = img_list[i].tags
        snapshots_json.append(snapshot_dict)
    return 'api.espressoyoself.me/snapshots'

@APP.route('/scenic/<placeID>')
def scenicdetails(placeID):
    if placeID is '1':
        name = 'Doug Sahm Hill Summit'
        address = 'Doug Sahm Hill Path, Austin, TX 78704'
        rating = '4.8'
        review1name = "L. Andrew Sterling"
        review1text = "Love this spot , it's elevated and you can see the whole New Austin Skyline panorama."
        review1rating= "Rating: 5"
        review2name = 'Robert Elsishans'
        review2text = 'A great spot for photos of downtown Austin.  Get to the top of the small hill and take in the scenery.  You will typically meet runners, tourists, families, and pets up on the hill.'
        review2rating= "Rating: 5"
        photo="https://photos.smugmug.com/Galleries/All/i-hbc4Wbr/4/5477538c/L/DJI_0021-cware-L.jpg"
    if placeID is '2':
        name = 'Scenic Overlook'
        address = '809, 1069 N Capital of Texas Hwy, Austin, TX 78746'
        rating = '4.6'
        review1name = "Phillip Barnhart"
        review1text = "Beautiful overlook with Austin in the distance.  Great for photographs, a good place to pull off for that phone call, or a few minutes of leg stretching.  Trash can and handicapped spot available.  We've even seen a wedding here!  A nice scenic spot."
        review1rating= "Rating: 5"
        review2name = 'Lindsay Crathers'
        review2text = 'Very nice view'
        review2rating= "Rating: 4"
        photo="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/scenic-overlook-of-austin-mark-weaver.jpg"
    if placeID is '3':
        name = 'Lou Neff Point'
        address = 'Ann and Roy Butler Hike and Bike Trail, Austin, TX 78746'
        rating = '4.7'
        review1name = "Manni Interrupted"
        review1text = "First time here and I will say it has a beautiful view of Downtown Austin. I will definitely come to this spot again. I could only imagine the city lights at night. "
        review1rating= "Rating: 5"
        review2name = 'Jose Davila'
        review2text = ' One of the most amazing views of downtown Austin...'
        review2rating= "Rating: 5"
        photo="https://s3.amazonaws.com/gs-waymarking-images/897c10a2-3419-4794-b4c3-fc9403decb45_d.jpg"
    return flask.render_template('scenicdetails.html', name=name, address=address, photo=photo,  rating=rating, review1name=review1name, review1text=review1text, review1rating=review1rating, review2name=review2name, review2text=review2text, review2rating=review2rating)

if __name__ == '__main__':
    #APP.debug=True
    APP.run()
