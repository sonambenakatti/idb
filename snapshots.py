import flask
import json
import flickrapi
import sys

"""
secrets used in request
TODO: hide these
"""
api_key = '646861afb9b6bf211e4b286b447ad794'
api_secret = '1bb508d092416b93'


"""
Lat and long of Austin, TX
Radius in KM
"""
LATITUDE = '30.2672'
LONGITUDE = '97.7431'
RADIUS = '30'
TAGS = 'coffee'

def search_photos() :
    flickr = flickrapi.FlickrAPI(api_key, api_secret, format='json')
    raw_json = flickr.photos.search(tags=TAGS, media="photo")
    parsed_dict = json.loads(raw_json.decode('utf-8')) #puts all json into dictionary object
    create_url(parsed_dict)

def create_url(parsed_dict):
    for key, value in parsed_dict['photos'].items():
        if(type(value) is list) :
            for item in value:
                url = 'https://farm' + str(item['farm']) + '.staticflickr.com/' \
                + str(item['server']) + '/' + str(item['id']) + '_' + str(item['secret']) \
                 + '.jpg'


def main() :
    search_photos()

if __name__ == '__main__':
    main()
