from __future__ import print_function

import argparse
import json
import pprint
import requests
import sys
import urllib

class CoffeeShop:

    def __init__(self, n, queryId, l, p, r, imgurl) :
        self.__name = n
        self.__id = queryId
        self.__location = l
        self.__price = p
        self.__review = r
        self.__imageUrl = imgurl

    @property
    def name(self) :
        return self.__name

    @name.setter
    def name(self, n) :
        self.__name = n

    @property
    def id(self) :
        return self.__id

    @id.setter
    def name(self, i) :
        self.__id = i

    @property
    def location(self) :
        return self.__location

    @location.setter
    def location(self, l) :
        self.__location = l

    @property
    def price(self) :
        return self.__price

    @price.setter
    def price(self, p) :
        self.__price = p

    @property
    def review(self) :
        return self.__review

    @review.setter
    def review(self, r) :
        self.__review = r

    @property
    def imageUrl(self) :
        return self.__imageUrl

    @imageUrl.setter
    def imageUrl(self, img) :
        self.__imageUrl = img
