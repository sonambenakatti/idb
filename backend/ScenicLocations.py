from __future__ import print_function

import argparse
import json
import pprint
import requests
import sys
import urllib


class ScenicLocations:
	def __init__(self, name, address, rating, review1, review2, photo, latitude, longitude, city_id) :
		self.__name = name
		self.__address = address
		self.__rating = rating
		self.__review1 = review1
		self.__review2 = review2
		self.__photo = photo
		self.__latitude = latitude
		self.__longitude = longitude
		self.__city_id = city_id		


	def __str__(self):
		return str(self.__name)


	@property
	def name(self) :
	    return self.__name

	@name.setter
	def name(self, n) :
	    self.__name = n

	@property
	def address(self) :
	    return self.__address

	@address.setter
	def address(self, address) :
	    self.__address = address

	@property
	def placeID(self) :
	    return self.__placeID

	@placeID.setter
	def placeID(self, placeID) :
	    self.__placeID = placeID

	@property
	def photo(self) :
	    return self.__photo

	@photo.setter
	def photo(self, photo) :
	    self.__photo = photo

	@property
	def rating(self) :
	    return self.__rating

	@rating.setter
	def rating(self, rating) :
	    self.__rating = rating

	@property
	def review1(self) :
	    return self.__review1

	@review1.setter
	def review1(self, reviews) :
	    self.__review1 = review1

	@property
	def review2(self) :
	    return self.__review2

	@review2.setter
	def review2(self, reviews) :
	    self.__review2 = review2

	@property
	def latitude(self) :
	    return self.__latitude

	@property
	def longitude(self) :
	    return self.__longitude

	@property
	def city_id(self) :
	    return self.__city_id

	
	







