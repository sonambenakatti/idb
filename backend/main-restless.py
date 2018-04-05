import flask
import flask_sqlalchemy
import flask_restless
from flask import Flask, jsonify
import sqlalchemy
from sqlalchemy import *
import pymysql
import json
import pprint
from photo import Photo
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import backref, relationship
from sqlalchemy.orm import scoped_session, sessionmaker

# Create the Flask application and the Flask-SQLAlchemy object.
app = flask.Flask(__name__)
pymysql.install_as_MySQLdb()

user = 'TheCoolBeans'
pwd = 'riley5143'
host = 'beansdbdev.ch0umvgb0s5r.us-east-1.rds.amazonaws.com'
dbname = 'beansdbdev'
uri = 'mysql://%s:%s@%s/%s' % (user, pwd, host, dbname)
# Database variable that is connected to database.
engine = create_engine(uri)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
mysession = scoped_session(Session)

Base = declarative_base()
Base.metadata.bind = engine

# flask restless manager
manager = flask_restless.APIManager(app, session=mysession)

class Shops(Base):
    __tablename__ = 'Shops'
    shop_id = Column(Integer, primary_key=True)
    shop_name = Column(Unicode)
    shop_address = Column(Unicode)
    shop_contact = Column(Unicode)
    shop_price = Column(Unicode)
    shop_hours = Column(Unicode)
    shop_rating = Column(Float)
    shop_picture = Column(LargeBinary)
    shop_latitude = Column(Float)
    shop_longitude = Column(Float)
    city_id = Column(Integer, ForeignKey("Cities.city_id"))

class Cities(Base):
    __tablename__ = 'Cities'
    city_id = Column(Integer, primary_key=True)
    city_name = Column(Unicode)
    city_picture = Column(LargeBinary)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
shops_blueprint = manager.create_api(Shops, methods=['GET'])
cities_blueprint = manager.create_api(Cities, methods=['GET'])
#scenic_blueprint = manager.create_api(Scenic, methods=['GET'], app=app)
#snapshots_blueprint = manager.create_api(Snapshots, methods=['GET'], app=app)

#manager.init_app(app)
# start the flask loop

@app.route('/')
def home():
    return flask.render_template('home.html')

@app.route('/<path:path>')
def catch_all (path):
    return flask.render_template('home.html')

app.run()
