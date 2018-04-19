from __future__ import print_function
import requests
import unittest
from DBManager import db, Shops, Scenic, Snapshots
import json
from main import *
from main import APP
from flask import Flask, jsonify


class TestStringMethods(unittest.TestCase):
    def setUp(self):
        self.APP = APP.test_client()
        self.APP.testing = True

    def test_site_home(self):
        r = self.APP.get('/')
        self.assertEqual(r.status_code, 200)


    def test_shops_api_exists(self):
        r = self.APP.get('/getcoffeeshops')
        self.assertEqual(r.status_code, 302)
        self.assertEqual(r.location, 'http://api.espressoyoself.me/coffeeshops')

    def test_shops_api_one(self):
        r = self.APP.get('/getcoffeeshop/1')
        str_data = r.data.decode('utf-8')
        self.assertEqual(r.status_code, 302)
        self.assertEqual(r.location, 'http://api.espressoyoself.me/coffeeshop/1')


    def test_scenic_api_exists(self):
        r = self.APP.get('/getsceniclocations')
        self.assertEqual(r.status_code, 302)
        self.assertEqual(r.location, 'http://api.espressoyoself.me/sceniclocations')

    def test_scenic_api_one(self):
        r = self.APP.get('/getsceniclocation/2')
        self.assertEqual(r.status_code, 302)
        self.assertEqual(r.location, 'http://api.espressoyoself.me/sceniclocation/2')


    def test_snapshots_api_exists(self):
        r = self.APP.get('/getsnapshots')
        self.assertEqual(r.status_code, 302)
        self.assertEqual(r.location, 'http://api.espressoyoself.me/snapshots')

    def test_snapshots_api_one(self):
        r = self.APP.get('/getsnapshot/1')
        self.assertEqual(r.status_code, 302)
        self.assertEqual(r.location, 'http://api.espressoyoself.me/snapshot/1')

    #New (Phase 3)backend tests

    def test_search_api_exists(self):
        r = self.APP.get('/search/coffee')
        self.assertEqual(r.status_code, 302)
        self.assertEqual(r.location, 'http://api.espressoyoself.me/search/coffee')

    def test_nearby_scenic_api_exists(self):
        r = self.APP.get('/nearby_scenic_from_shops/1')
        self.assertEqual(r.status_code, 302)
        self.assertEqual(r.location, 'http://api.espressoyoself.me/nearby_scenic_from_shops/1')

    def test_nearby_scenic_api_exists(self):
        r = self.APP.get('/nearby_shops_from_scenic/1')
        self.assertEqual(r.status_code, 302)
        self.assertEqual(r.location, 'http://api.espressoyoself.me/nearby_shops_from_scenic/1')


    def test_snapshots_shop_api_exists(self):
        r = self.APP.get('/snapshots_shop/1')
        self.assertEqual(r.status_code, 302)
        self.assertEqual(r.location, 'http://api.espressoyoself.me/snapshots_shop/1')

    def test_snapshots_scenic_api_exists(self):
        r = self.APP.get('/snapshots_scenic/1')
        self.assertEqual(r.status_code, 302)
        self.assertEqual(r.location, 'http://api.espressoyoself.me/snapshots_scenic/1')




if __name__ == '__main__':
    unittest.main()
