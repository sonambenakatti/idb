import pymysql
import flask
from flask import Flask
import sqlalchemy
from sqlalchemy import *
from flask_sqlalchemy import *
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import json
import os

pymysql.install_as_MySQLdb()

# Create the Flask application and the Flask-SQLAlchemy object.
app = flask.Flask(__name__)

user = 'TheCoolBeans'
pwd = 'riley5143'
host = 'beansdb.cahtfudy2tyu.us-east-1.rds.amazonaws.com'
db = 'beansdb'
uri = 'mysql://%s:%s@%s/%s' % (user, pwd, host, db)
#mysql_engine = create_engine('mysql://{0}:{1}@{2}:{3}'.format(user, pwd, host, port))

app.config['SQLALCHEMY_DATABASE_URI'] = uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
db.echo = False

# Create your Flask-SQLALchemy models as usual but with the following two
# (reasonable) restrictions:
#   1. They must have a primary key column of type sqlalchemy.Integer or
#      type sqlalchemy.Unicode.
#   2. They must have an __init__ method which accepts keyword arguments for
#      all columns (the constructor in flask.ext.sqlalchemy.SQLAlchemy.Model
#      supplies such a method, so you don't need to declare a new one).

metadata = MetaData()
coffee_shops = Table('Shops', metadata,
  Column('shop_id', Integer, primary_key=True),
  Column('shop_name', String(100)),
  Column('shop_address', String(100)),
  Column('shop_contact', String(100)),
  Column('shop_price', String(100)),
  Column('shop_hours', String(100)),
  Column('shop_rating', String(100)),
  Column('shop_picture', LargeBinary(length=(2**32)-1)),
  Column('shop_latitude', String(100)),
  Column('shop_longitude', String(100)),
  Column('shop_yelp_id', String(100))

)

scenic_views = Table('Scenic', metadata,
  Column('scenic_id', Integer, primary_key=True),
  Column('scenic_name', String(100)),
  Column('scenic_address', String(100)),
  Column('scenic_rating', String(100)),
  Column('scenic_review1', String(100)),
  Column('scenic_review2', String(100)),
  Column('scenic_picture', LargeBinary(length=(2**32)-1)),
  Column('scenic_latitude', String(100)),
  Column('scenic_longitude', String(100)),
)

snapshots = Table('Snapshots', metadata,
  Column('snap_id', Integer, primary_key=True),
  Column('snap_name', String(100)),
  Column('snap_photographer', String(100)),
  Column('snap_username', String(100)),
  Column('snap_tags', String(100)),
  Column('snap_favs', String(100)),
  Column('snap_picture', LargeBinary(length=(2**32)-1)),
  Column('snap_latitude', String(100)),
  Column('snap_longitude', String(100)),
  Column('shop_loc_id', Integer, ForeignKey("Shops.shop_id")),
  Column('scenic_loc_id', Integer, ForeignKey("Scenic.scenic_id"))

)


engine = create_engine(uri)
metadata.create_all(engine)

# models
class Shops(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    address = db.Column(db.String(100))
    contact = db.Column(db.String(100))
    price = db.Column(db.String(100))
    hours = db.Column(db.String(100))
    rating = db.Column(db.String(100))
    picture = db.Column(db.LargeBinary(length=(2**32)-1))
    latitude = db.Column(db.String(100))
    longitude = db.Column(db.String(100))
    yelp_id = db.Column(db.String(100))



    #events = db.relationship('Event', secondary='character_event', backref=db.backref('characters'), lazy='dynamic')
    #series = db.relationship('ComicSeries', secondary='character_comicseries', backref=db.backref('characters'),
                            # lazy='dynamic')

    def __init__(self, id, name, address, contact, price, hours, rating, picture, latitude, longitude):
        assert name != ""
        self.id = id
        self.name = name
        self.address = address
        self.contact = contact
        self.price = price
        self.hours = hours
        self.rating = rating
        self.picture = picture
        self.latitude = latitude
        self.longitude = longitude



class Scenic(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    address = db.Column(db.String(100))
    rating = db.Column(db.String(100))
    review1 = db.Column(db.String(100))
    review2 = db.Column(db.String(100))
    picture = db.Column(db.LargeBinary(length=(2**32)-1))
    latitude = db.Column(db.String(100))
    longitude = db.Column(db.String(100))

    #series = db.relationship('ComicSeries', secondary='event_comicseries', backref=db.backref('events'), lazy='dynamic')

    def __init__(self, id, name, address, rating, review1, review2, picture, latitude, longitude):
        self.id = id
        self.name = name
        self.address = address
        self.rating = rating
        self.review1 = review1
        self.review2 = review2
        self.picture = picture
        self.latitude = latitude
        self.longitude = longitude


class Snapshots(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    photographer = db.Column(db.String(100))
    username = db.Column(db.String(100))
    tags = db.Column(db.String(100))
    favs = db.Column(db.String(100))
    picture = db.Column(db.LargeBinary(length=(2**32)-1))
    latitude = db.Column(db.String(100))
    longitude = db.Column(db.String(100))

    #characters = db.relationship('Character', secondary='character_actor', backref=db.backref('actors'), lazy='dynamic')
    #tvshows = db.relationship('TvShow', secondary='actor_tvshow', backref=db.backref('actors'), lazy='dynamic')

    def __init__(self, id, name, photographer, username, tags, favs, picture, latitude, longitude):
        self.id = id
        self.name = name
        self.photographer = photographer
        self.username = username
        self.tags = tags
        self.favs = favs
        self.picture = picture
        self.latitude = latitude
        self.longitude = longitude






if __name__ == "__main__":
    print("Making the database")
