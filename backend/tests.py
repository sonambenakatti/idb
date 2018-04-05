from __future__ import print_function
from main import *
import requests
import unittest
from DBManager import db, Shops, Scenic, Snapshots
import json
from main import APP
from flask import Flask, jsonify


class TestStringMethods(unittest.TestCase):
    def setUp(self):
        self.APP = APP.test_client()
        self.APP.testing = True

    def test_site_home(self):
        r = self.APP.get('/')
        self.assertEqual(r.status_code, 200)

    def test_about(self):
        r = self.APP.get('/getabout')
        self.assertEqual(r.status_code, 302)
        self.assertEqual(r.location, 'http://api.espressoyoself.me/about')


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
        r = self.APP.get('/getsnapshot/181')
        self.assertEqual(r.status_code, 302)
        self.assertEqual(r.location, 'http://api.espressoyoself.me/snapshot/181')

    


if __name__ == '__main__':
    unittest.main()
