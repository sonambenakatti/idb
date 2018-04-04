import flask
import flask.ext.sqlalchemy
import flask.ext.restless

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
manager = flask.ext.restless.APIManager(app, session=mysession)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
shops_blueprint = manager.create_api(Shops, methods=['GET'], app=app)
cities_blueprint = manager.create_api(Cities, methods=['GET'], app=app)
scenic_blueprint = manager.create_api(Scenic, methods=['GET'], app=app)
snapshots_blueprint = manager.create_api(Snapshots, methods=['GET'], app=app)

manager.init_app(app)
# start the flask loop
app.run()
