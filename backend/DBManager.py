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

# Create the Flask application and the Flask-SQLAlchemy object.
app = flask.Flask(__name__)
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

Cities = Table('Cities', metadata,
  Column('city_id', Integer, primary_key=True),
  Column('city_name', String(255)),
  Column('city_picture', LargeBinary(length=(2**32)-1)),
)

Shops = Table('Shops', metadata,
  Column('shop_id', Integer, primary_key=True),
  Column('shop_name', String(255)),
  Column('shop_address', String(528)),
  Column('shop_contact', String(255)),
  Column('shop_price', String(255)),
  Column('shop_hours', String(255)),
  Column('shop_rating', Float),
  Column('shop_picture', LargeBinary(length=(2**32)-1)),
  Column('shop_latitude', Float),
  Column('shop_longitude', Float),
  Column('city_id', Integer, ForeignKey("Cities.city_id")),
)

Scenic = Table('Scenic', metadata,
  Column('scenic_id', Integer, primary_key=True),
  Column('scenic_name', String(255)),
  Column('scenic_address', String(528)),
  Column('scenic_rating', Float),
  Column('scenic_review1', String(1024)),
  Column('scenic_review2', String(1024)),
  Column('scenic_picture', LargeBinary(length=(2**32)-1)),
  Column('scenic_latitude', Float),
  Column('scenic_longitude', Float),
  Column('city_id', Integer, ForeignKey("Cities.city_id")),
)

Snapshots = Table('Snapshots', metadata,
  Column('snap_id', Integer, primary_key=True),
  Column('snap_name', String(255)),
  Column('snap_photographer', String(255)),
  Column('snap_username', String(255)),
  Column('snap_tags', String(255)),
  Column('snap_favs', Integer),
  Column('snap_picture', LargeBinary(length=(2**32)-1)),
  Column('snap_latitude', Float),
  Column('snap_longitude', Float),
  Column('shop_id', Integer, ForeignKey("Shops.shop_id")),
  Column('scenic_id', Integer, ForeignKey("Scenic.scenic_id")),
  Column('city_id', Integer, ForeignKey("Cities.city_id")),
)

engine = create_engine(uri)
metadata.create_all(engine)

if __name__ == "__main__":
    print("Making the database")
