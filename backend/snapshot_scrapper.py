import flask
import json
import flickrapi
import sys
from photo import Photo
import urllib
import sqlalchemy
from sqlalchemy import *
import pymysql

pymysql.install_as_MySQLdb()

# This client code can run on Python 2.x or 3.x.  Your imports can be
# simpler if you only need one of those.
try:
    # For Python 3.0 and later
    from urllib.error import HTTPError
    from urllib.parse import quote
    from urllib.parse import urlencode
except ImportError:
    # Fall back to Python 2's urllib2 and urllib
    from urllib2 import HTTPError
    from urllib import quote
    from urllib import urlencode

user = 'TheCoolBeans'
pwd = 'riley5143'
host = 'beansdb.cahtfudy2tyu.us-east-1.rds.amazonaws.com'
db = 'beansdb'
uri = 'mysql://%s:%s@%s/%s' % (user, pwd, host, db)

"""
secrets used in request
TODO: hide these
"""
api_key = '646861afb9b6bf211e4b286b447ad794'
api_secret = '1bb508d092416b93'

photos = []
photo_titles = []
RADIUS = '30'
flickr = flickrapi.FlickrAPI(api_key, api_secret, format='json')

"""
runs a search on photos related to sceinc locations, based on lat and lon
"""
def search_photos_scenic(latitude, longitude, title) :
    raw_json = flickr.photos.search(tags=title, media="photo", page=1, per_page=6, lat=latitude, lon=longitude)
    parsed_dict = json.loads(raw_json.decode('utf-8')) #puts all json into dictionary object
    parse_search(parsed_dict)

"""
runs a search on photos realted to coffee shops, based on lat and lon
"""
def search_photos_coffee(latitude, longitude, title) :
    raw_json = flickr.photos.search(tags=title, media="photo", page=1, per_page=3, lat=latitude, lon=longitude)
    parsed_dict = json.loads(raw_json.decode('utf-8'))
    parse_search(parsed_dict)

"""
parses the result of flcikr.photos.search,
return a list of Photo objects with attributes populated
"""
def parse_search(parsed_dict):
    for key, value in parsed_dict['photos'].items():
        if(type(value) is list) :
            for item in value:
                title = item['title']
                if title not in photo_titles and len(photos) < 12 and title is not '':
                    photo_titles.append(title)
                    photo_info = get_info(item['id'], item['secret'])
                    photo = parse_info(photo_info, item['id'], item['secret'])
                    if photo.tags is not 'None' :
                        photos.append(photo)
"""
parse all information about this photo, return a Photo object
with these attributes populated
"""
def parse_info(photo_item, photo_id, photo_secret) -> Photo :
    url = create_url(photo_item)
    num_favs = count_favorites(photo_id)
    date_taken = photo_item['dates'].get('taken')
    location = ''
    lat = ''
    lon = ''
    if 'location' in photo_item :
        location = photo_item['location']
        lat = location.get('latitude')
        lon = location.get('longitude')
    owner = photo_item['owner']
    name = owner.get('realname')
    if(name is '') :
        name = 'unknown'
    username = owner.get('username')
    title = photo_item['title'].get('_content')
    tags = format_tags(photo_item['tags'].get('tag'))
    photo = Photo(num_favs, name, username, lat, lon, title, url, tags, photo_id, photo_secret)
    return photo

"""
creates a url for this photo_item
"""
def create_url(item) -> str :
    url = 'https://farm' + str(item['farm']) + '.staticflickr.com/' \
    + str(item['server']) + '/' + str(item['id']) + '_' + str(item['secret']) \
     + '.jpg'
    return url

"""
returns the basic info for this picture in a dictionary
"""
def get_info(photo_id, photo_secret) -> dict :
   global api_key
   try :
       raw_json = flickr.photos.getInfo(api_key=api_key, photo_id=photo_id, secret=photo_secret)
   except flickrapi.exceptions.FlickrError as e :
       print(e)
   parsed_dict = json.loads(raw_json.decode('utf-8'))
   photo_info = parsed_dict['photo']
   return photo_info

"""
returns the number of favorites this picture got
"""
def count_favorites(photo_id) :
    raw_json = flickr.photos.getFavorites(api_key=api_key, photo_id=photo_id)
    parsed_dict = json.loads(raw_json.decode('utf-8'))
    count = 0
    for person in parsed_dict['photo'].get('person') :
        count = count + 1
    return count

"""
formats tags of this photo
"""
def format_tags(tags) -> String:
    all_tags = ''
    for t in tags :
        if t['raw'][0] is '#' :
            all_tags = all_tags + t['raw'] + ' \n'
        else :
            all_tags = all_tags + '#' + t['raw'] + ' \n'
    if all_tags is '' :
        all_tags = 'None'
    return all_tags
#1
def main():
    try:
        db = create_engine(uri)
        metadata = MetaData()
        conn = db.connect()
        metadata.reflect(bind=db)

        # user_t = metadata.tables['Snapshots']
        # sel_st = user_t.select()
        # res = conn.execute(sel_st)
        # for _row in res:
        #     print(_row)
        #     print("\n\n\n")
        # del_st = user_t.delete()
        # res = conn.execute(del_st)
        #
        # sel_st = user_t.select()
        # res = conn.execute(sel_st)
        # for _row in res: print(_row)

        global photos

        coffeeshops = db.execute('SELECT * FROM Shops').fetchall()
        for shop in coffeeshops :
            shop = dict(shop)
            search_photos_coffee(shop['shop_latitude'], shop['shop_longitude'], shop['shop_name'])

        locations = db.execute('SELECT * FROM Scenic').fetchall()
        for loc in locations:
            loc = dict(loc)
            search_photos_scenic(loc['scenic_latitude'], loc['scenic_longitude'], loc['scenic_name'])

        print(len(photos))

        #shop_loc_id = db.Column(db.Integer)
        #scenic_loc_id = db.Column(db.Integer)
        for photo in photos :
            print(photo.title)
            ins = insert(metadata.tables['Snapshots']).values(
                snap_name = bytes(photo.title, 'utf8'),
                snap_photographer = bytes(photo.name, 'utf8'),
                snap_username = bytes(photo.username, 'utf8'),
                snap_tags = bytes(photo.tags, 'utf8'),
                snap_favs = photo.num_favorites,
                snap_picture = bytes(photo.imageUrl, 'utf8'),
                snap_latitude = photo.latitude,
                snap_longitude = photo.longitude,
                snap_photo_id = bytes(photo.id, 'utf8')
                )
            conn = db.connect()
            conn.execute(ins)
        return photos
    except HTTPError as error:
        sys.exit(
            'Encountered HTTP error {0} on {1}:\n {2}\nAbort program.'.format(
                error.code,
                error.url,
                error.read(),
            )
        )


if __name__ == '__main__':
    main()
