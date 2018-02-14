#!/usr/bin/env python
#push initial test jaemin
from __future__ import print_function

import flask
from flask import Flask, jsonify

import githubstats
from photo import Photo


# Create the application.
APP = flask.Flask(__name__)

@APP.route('/')
def home():
    return flask.render_template('home.html')

shop_1_name = "Summer Moon Coffee Bar"
shop_1_location = "11005 Burnet Rd Ste 112 Austin, TX 78758"
shop_1_price = "$"
shop_1_rating = "4.5"
shop_1_photo = "https://s3-media3.fl.yelpcdn.com/bphoto/WQPD9JYeDyVju0inUEID7w/o.jpg"
shop_1_phone = "737-300-1265"

shop_2_name = "Houndstooth Coffee"
shop_2_location = "401 Congress Ave Ste 100C Austin, TX 78701"
shop_2_price = "$$"
shop_2_rating = "4.5"
shop_2_photo = "https://s3-media3.fl.yelpcdn.com/bphoto/ITv825S32-REV1bISyfk5A/o.jpg"
shop_2_phone = "512-394-6051"

shop_3_name = "Vintage Heart Coffee"
shop_3_location = "1405 E 7th St Austin, TX 78702"
shop_3_price = "$"
shop_3_rating = "4.5"
shop_3_photo = "https://s3-media3.fl.yelpcdn.com/bphoto/hK35KSh9IxFMjvvg4tCmsQ/o.jpg"
shop_3_phone = "512-524-0583"


@APP.route('/api/v1.0/sceniclocations', methods=['GET'])
def get_sceniclocations() :
    """
    Implement RESTful API here
    """
    places_json=[]
    place_dict = {}
    place_dict["name"] = 'Doug Sahm Hill Summit'
    place_dict["address"] = 'Doug Sahm Hill Path, Austin, TX 78704'
    place_dict["rating"] = '4.8'
    place_dict["photo"] = "https://photos.smugmug.com/Galleries/All/i-hbc4Wbr/4/5477538c/L/DJI_0021-cware-L.jpg"
    places_json.append(place_dict)

    place_dict = {}
    place_dict["name"] = 'Scenic Overlook'
    place_dict["address"] = '809, 1069 N Capital of Texas Hwy, Austin, TX 78746'
    place_dict["rating"] = '4.6'
    place_dict["photo"] = "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/scenic-overlook-of-austin-mark-weaver.jpg"
    places_json.append(place_dict)

    place_dict = {}
    place_dict["name"] = 'Lou Neff Point'
    place_dict["address"] = 'Ann and Roy Butler Hike and Bike Trail, Austin, TX 78746'
    place_dict["rating"] = '4.7'
    place_dict["photo"] = "https://s3.amazonaws.com/gs-waymarking-images/897c10a2-3419-4794-b4c3-fc9403decb45_d.jpg"
    places_json.append(place_dict)

    return jsonify({'scenic_locations': places_json})

@APP.route('/api/v1.0/coffeeshops', methods=['GET'])
def get_coffeeshops() :
    
    shops_json=[]

    shop_dict = {}
    shop_dict["name"] = "Summer Moon Coffee Bar"
    shop_dict["location"] = "11005 Burnet Rd Ste 112 Austin, TX 78758"
    shop_dict["price"] = "$"
    shop_dict["rating"] = "4.5"
    shop_dict["photo"] = "https://s3-media3.fl.yelpcdn.com/bphoto/WQPD9JYeDyVju0inUEID7w/o.jpg"
    shop_dict["phone"] = "737-300-1265"

    shops_json.append(shop_dict)

    shop_dict = {}
    shop_dict["name"] = "Houndstooth Coffee"
    shop_dict["location"] = "11005 Burnet Rd Ste 112 Austin, TX 78758"
    shop_dict["price"] = "$$"
    shop_dict["rating"] = "4.5"
    shop_dict["photo"] = "https://s3-media3.fl.yelpcdn.com/bphoto/ITv825S32-REV1bISyfk5A/o.jpg"
    shop_dict["phone"] = "512-394-6051"
    shops_json.append(shop_dict)

    shop_dict = {}
    shop_dict["name"] = "Vintage Heart Coffee"
    shop_dict["location"] = "1405 E 7th St Austin, TX 78702"
    shop_dict["price"] = "$"
    shop_dict["rating"] = "4.5"
    shop_dict["photo"] = "https://s3-media3.fl.yelpcdn.com/bphoto/hK35KSh9IxFMjvvg4tCmsQ/o.jpg"
    shop_dict["phone"] = "512-524-0583"
    shops_json.append(shop_dict)

    return jsonify({'coffeeshops': shops_json})


@APP.route('/shops')
def coffeeshops() :
    return flask.render_template('coffeeshops.html', coffeeId1 = "1", name1 = shop_1_name, location1 = shop_1_location, price1 = shop_1_price, rating1 = shop_1_rating, photo1 = shop_1_photo,
                                 name2 = shop_2_name, coffeeId2 = "2", location2 = shop_2_location, price2 = shop_2_price, rating2 = shop_2_rating, photo2 = shop_2_photo,
                                 name3 = shop_3_name, coffeeId3 = "3", location3 = shop_3_location, price3 = shop_3_price, rating3 = shop_3_rating, photo3 = shop_3_photo)

@APP.route('/shops/<coffeeId>')
def coffeeshop(coffeeId) :
    if coffeeId is "1":
        return flask.render_template('instance1.html', location = shop_1_location, name = shop_1_name, phone = shop_1_phone, price = shop_1_price, rating = shop_1_rating, photo = shop_1_photo)
    if coffeeId is "2":
        return flask.render_template('instance1.html', location = shop_2_location, name = shop_2_name, phone = shop_2_phone, price = shop_2_price, rating = shop_2_rating, photo = shop_2_photo)
    if coffeeId is "3":
        return flask.render_template('instance1.html', location = shop_3_location, name = shop_3_name, phone = shop_3_phone, price = shop_3_price, rating = shop_3_rating, photo = shop_3_photo)
@APP.route('/scenic')
def sceniclocations() :
    """
    scenic_locations = places.get_places()
    name1=scenic_locations[0].name
    placeID1=scenic_locations[0].placeID
    rating1=scenic_locations[0].rating
    photor1=scenic_locations[0].photo

    name2=scenic_locations[1].name
    placeID2=scenic_locations[1].placeID
    rating2=scenic_locations[1].rating
    photor2=scenic_locations[1].photo

    name3=scenic_locations[2].name
    placeID3=scenic_locations[2].placeID
    rating3=scenic_locations[2].rating
    photor3=scenic_locations[2].photo
    """

    #r1 = requests.get('https://maps.googleapis.com/maps/api/place/textsearch/json?type=park&location=30.267153,-97.7430608&radius=10000&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U')

    #photor1 = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + json1['results'][0]['photos'][0]['photo_reference']+ '&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U'


        #location2 = json1["results"][1]["formatted_address"]

    #photor2 = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + json1['results'][1]['photos'][0]['photo_reference']+ '&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U'


    #photor3 = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + json1['results'][2]['photos'][0]['photo_reference']+ '&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U'
    #    return flask.render_template('products.html', name1=name1, placeID1= placeID1, rating1=rating1, photo1=photor1, name2=name2, placeID2=placeID2, rating2=rating2, photo2=photor2, name3=name3, placeID3=placeID3, rating3=rating3, photo3=photor3)

    name1='Doug Sahm Hill Summit'
    placeID1='1'
    rating1='4.8'
    #photor1=

    name2='Scenic Overlook'
    placeID2='2'
    rating2='4.6'
    #photor2=scenic_locations[1].photo

    name3='Lou Neff Point'
    placeID3='3'
    rating3='4.7'
    #photor3=scenic_locations[2].photo

    return flask.render_template('products.html', name1=name1, placeID1= placeID1, rating1=rating1, name2=name2, placeID2=placeID2, rating2=rating2, name3=name3, placeID3=placeID3, rating3=rating3)


@APP.route('/scenic/<placeID>')
def scenicdetails(placeID):
    """
    r1 = requests.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + placeID + '&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U')
    json1 = r1.json()
    name = json1['result']['name']

    address = json1["result"]["formatted_address"]
    rating = ""
    try:
        rating= json1["result"]["rating"]
    except:
        rating = "No ratings for this view yet!"
    photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + json1['result']['photos'][0]['photo_reference']+ '&key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U'
    src_for_map = "https://www.google.com/maps/embed/place?key=AIzaSyBlOaCDL8ePD3nignTrJN1oViXj_rDx_1U&origin=place_id:" + placeID + "&output=embed"
    
    try:
        review1name = json1["result"]["reviews"][0]['author_name']
        review1text = json1["result"]["reviews"][0]['text']
        review1rating= "Rating: " + json1["result"]["reviews"][0]['rating']
        review2name = json1["result"]["reviews"][1]['author_name']
        review2text = json1["result"]["reviews"][1]['text']
        review2rating= "Rating: " + json1["result"]["reviews"][1]['rating']
    except:
        review1name = "No Reviews for this place yet!"
        review1text = ""
        review1rating=""
        review2name = ""
        review2text = ""
        review2rating=""
    
    

    scl = get_loc_from_id(placeID)s
    name = scl.name

    address = scl.address
    rating= scl.rating
    photo= scl.photo

    review1name = scl.reviews[0]['name']
    review1text = scl.reviews[0]['name']
    review1rating=scl.reviews[0]['name']
    review2name = scl.reviews[1]['name']
    review2text = scl.reviews[1]['name']
    review2rating=scl.reviews[1]['name']
    """
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

@APP.route('/snapshots')
def snapshotsmain():
    photo1 = Photo('3', 'J Dimas', ' josecdimas', '0', '0', 'WINTER SUNNY DAY IN AUSTIN',
    'https://farm5.staticflickr.com/4657/40162172101_a30055288c.jpg', '#Austin #Austin, TX #ATX #Zilker Park #winter #dried grass', '1', '1')
    photo2 = Photo('5', 'Don Mason', '-Dons', '0', '0', 'A great start to the day', 'https://farm5.staticflickr.com/4605/25036430577_0f11597674.jpg',
    '#Austin #Camera #Houndstooth - Frost #Texas #United States \
    #coffee #coffee houses #latte art #TX #USA #Nikon #Nikon F3T #cappuccino', '2', '1')
    photo3 = Photo('0', 'unknown', 'ClevrCat', '0', '0', 'YESSS. POST-WORKOUT AND HAIRCUT COFFEE. HOUNDSTOOTH HAS THE CUTEST CUPS TOO. \
    #ATX #CAFFEINE #COFFEE #HOUNDSTOOTH #AUSTIN @HOUNDSTOOTHCOFFEE' , 'https://farm9.staticflickr.com/8515/29772433785_43acb1720a.jpg',
    '#IFTTT #Instagram #Yesss. #Post-workout #haircut #coffee. #Houndstooth #has #cutest #cups #too. #Atx #caffeine #austin #@houndstoothcoffee', '3', '1')
    return flask.render_template('snapshotsmain.html', name1 = photo1.name, name2 = photo2.name, name3 = photo3.name,
                                 title1 = photo1.title, title2 = photo2.title, title3 = photo3.title,
                                 num_favs1 = photo1.num_favorites, num_favs2 = photo2.num_favorites, num_favs3 = photo3.num_favorites,
                                 username1 = photo1.username, username2 = photo2.username, username3 = photo3.username,
                                 url1 = photo1.imageUrl, url2 = photo2.imageUrl, url3 = photo3.imageUrl,
                                 id1 = photo1.id, id2 = photo2.id, id3 = photo3.id,
                                 secret1 =  photo1.secret, secret2 = photo2.secret, secret3 = photo3.secret)

@APP.route('/snapshots/<id>/<secret>')
def snapshotsinstance(id, secret):
    if id is '1' :
        photo = Photo('3', 'J Dimas', ' josecdimas', '0', '0', 'WINTER SUNNY DAY IN AUSTIN',
        'https://farm5.staticflickr.com/4657/40162172101_a30055288c.jpg', '#Austin #Austin, TX #ATX #Zilker Park #winter #dried grass', '1', '1')
    elif id is '2' :
        photo = Photo('5', 'Don Mason', '-Dons', '0', '0', 'A great start to the day', 'https://farm5.staticflickr.com/4605/25036430577_0f11597674.jpg',
        '#Austin #Camera #Houndstooth - Frost #Texas #United States \
        #coffee #coffee houses #latte art #TX #USA #Nikon #Nikon F3T #cappuccino', '2', '2')
    else :
        photo = Photo('0', 'unknown', 'ClevrCat', '0', '0', 'YESSS. POST-WORKOUT AND HAIRCUT COFFEE. HOUNDSTOOTH HAS THE CUTEST CUPS TOO. \
        #ATX #CAFFEINE #COFFEE #HOUNDSTOOTH #AUSTIN @HOUNDSTOOTHCOFFEE' , 'https://farm9.staticflickr.com/8515/29772433785_43acb1720a.jpg',
        '#IFTTT #Instagram #Yesss. #Post-workout #haircut #coffee. #Houndstooth #has #cutest #cups #too. #Atx #caffeine #austin #@houndstoothcoffee', '3', '3')
    return flask.render_template('snapshotinstance.html', username = photo.username, name = photo.name, num_faves = photo.num_favorites,
                                title = photo.title, tags = photo.tags, id = photo.id, secret = photo.secret, url = photo.imageUrl)



@APP.route('/about')
def about():
    commits = githubstats.user_commits()
    issues = githubstats.user_issues()
    return flask.render_template('about.html', total_commits = commits["total"], issues = githubstats.open_issues + issues["total"], amrutha_commits = commits["amrutha"], sonam_commits = commits["sonam"],
                                 jenni_commits = commits["jenni"], ruchi_commits = commits["ruchi"], jaemin_commits = commits["jaemin"], amrutha_issues = issues["amrutha"],
                                 sonam_issues = issues["sonam"], jenni_issues = issues["jenni"], ruchi_issues = issues["ruchi"], jaemin_issues = issues["jaemin"])



if __name__ == '__main__':
    #APP.debug=True
    APP.run()
