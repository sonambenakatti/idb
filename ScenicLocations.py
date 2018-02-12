from __future__ import print_function
from GooglePlaces import GooglePlaces
import argparse
import json
import pprint
import requests
import sys
import urllib

class ScenicLocations:
	def __init__(self, name, placeID, photo, rating, reviews, address) :
		self.__name = name
		self.__placeID = placeID
		self.__photo = photo
		self.__rating = rating
		self.__reviews = reviews
		self.__address = address

	def __str__(self):
		return str(self.__name)

	@property
	def name(self) :
	    return self.__name

	@name.setter
	def name(self, n) :
	    self.__name = n

	@property
	def placeId(self) :
	    return self.__placeID

	@placeId.setter
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
	def reviews(self) :
	    return self.__reviews

	@reviews.setter
	def reviews(self, reviews) :
	    self.__reviews = reviews


	@property
	def address(self) :
	    return self.__address

	@address.setter
	def address(self, address) :
	    self.__address = address

	







