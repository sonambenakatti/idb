from __future__ import print_function

import argparse
import json
import pprint
import requests
import sys
import urllib

class Photo:

    def __init__(self, num_favorites, n, un, lat, lon, title, imgurl) :
        self.__username = un
        self.__num_favorites = num_favorites
        self.__name = n
        self.__latitude = lat
        self.__longitude = lon
        self.__title = title
        self.__imageUrl = imgurl

    @property
    def username(self) :
        return self.__username

    @username.setter
    def username(self, un) :
        self.__username = un

    @property
    def num_favorites(self) :
        return self.__num_favorites

    @num_favorites.setter
    def name(self, num_favorites) :
        self.__num_favorites = num_favorites

    @property
    def name(self) :
        return self.__name

    @name.setter
    def name(self, n) :
        self.__name = n

    @property
    def latitude(self) :
        return self.__latitude

    @latitude.setter
    def latitude(self, lat) :
        self.__latitude = lat

    @property
    def longitude(self) :
        return self.__longitude

    @longitude.setter
    def longitude(self, lon) :
        self.__longitude = lon

    @property
    def title(self) :
        return self.__title

    @title.setter
    def title(self, title) :
        self.__title = title

    @property
    def imageUrl(self) :
        return self.__imageUrl

    @imageUrl.setter
    def imageUrl(self, img) :
        self.__imageUrl = img
