from __future__ import print_function

import argparse
import json
import pprint
import requests
import sys
import urllib

class CoffeeShop:

    def __init__(self, n, queryId, l, p, r, imgurl, ph) :
        self.__name = n
        self.__id = queryId
        self.__location = l
        self.__price = p
        self.__rating = r
        self.__imageUrl = imgurl
        self.__phone = ph
        self.__hours = []

    def __str__(self):
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
