from __future__ import print_function

import argparse
import json
import pprint
import requests
import sys
import urllib

class CoffeeShop:

    def __init__(self, n, queryId, l, p, r, imgurl, ph)  :
        self.__name = n
        self.__id = queryId
        self.__location = l
        self.__price = p
        self.__rating = r
        self.__imageUrl = imgurl
        self.__phone = ph
        self.__hours = ""

    # def jsonify(self)  :
    #     json_dict = {}
    #     json_dict["name"] = self.__name
    #     json_dict["id"] = self.__id
    #     json_dict["location"] = self.__location
    #     json_dict["price"] = self.__price
    #     json_dict["rating"] = self.__rating
    #     json_dict["imageUrl"] = self.__imageUrl
    #     json_dict["phone"] = self.__phone
    #     json_dict["hours"] = self.__hours
    #     return json_dict

    def __str__(self) :
         return str(self.__name)

    @property
    def name(self) :
        return str(self.__name)

    @name.setter
    def name(self, n) :
        self.__name = n

    @property
    def id(self) :
        return self.__id

    @id.setter
    def id(self, i) :
        self.__id = i

    @property
    def location(self) :
        return self.__location

    @location.setter
    def location(self, l) :
        address = ""
        for string in l :
            address += string
        self.__location = address

    @property
    def price(self) :
        return self.__price

    @price.setter
    def price(self, p) :
        self.__price = p

    @property
    def rating(self) :
        return self.__rating

    @rating.setter
    def rating(self, r) :
        self.__rating = r

    @property
    def imageUrl(self) :
        return self.__imageUrl

    @imageUrl.setter
    def imageUrl(self, img) :
        self.__imageUrl = img

    @property
    def phone(self) :
        return self.__phone

    @phone.setter
    def phone(self, ph) :
        self.__phone = ph

    @property
    def hours(self) :
        return self.__hours

    @hours.setter
    def hours(self, h) :
        self.__hours = str(h)



    @property
    def longitude(self) :
        return self.__longitude

    @longitude.setter
    def longitude(self, l) :
        self.__longitude = l

    @property
    def latitude(self) :
        return self.__latitude

    @latitude.setter
    def latitude(self, l) :
        self.__latitude = l
