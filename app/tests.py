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
    '''
    def test_about(self):
        r = self.APP.get('/api/about')
        str_data = r.data.decode('utf-8')
        data = json.loads(str_data)
        print(data)
        self.assertEqual(r.status_code, 200)
        self.assertNotEqual(len(data), 0)
    '''
    

    def test_shops_api_exists(self):
        r = self.APP.get('/api/coffeeshops')
        str_data = r.data.decode('utf-8')
        data = json.loads(str_data)
        self.assertEqual(r.status_code, 200)
        self.assertNotEqual(len(data), 0)

    def test_shops_api_one(self):
        r = self.APP.get('/api/coffeeshops/1')
        str_data = r.data.decode('utf-8')
        data = json.loads(str_data)
        self.assertEqual(r.status_code, 200)
        self.assertEqual(data[0]['shop_name'], 'Summermoon Coffee Bar')
        self.assertNotEqual(len(data), 0)
    

    def test_scenic_api_exists(self):
        r = self.APP.get('/api/sceniclocations')
        str_data = r.data.decode('utf-8')
        data = json.loads(str_data)
        self.assertEqual(r.status_code, 200)
        self.assertNotEqual(len(data), 0)

    def test_scenic_api_one(self):
        r = self.APP.get('/api/sceniclocation/2')
        str_data = r.data.decode('utf-8')
        data = json.loads(str_data)
        self.assertEqual(r.status_code, 200)
        self.assertEqual(data[0]['scenic_name'], 'Waterloo Neighborhood Park')
        self.assertNotEqual(len(data), 0)

    def test_snapshots_api_exists(self):
        r = self.APP.get('/api/snapshots')
        str_data = r.data.decode('utf-8')
        data = json.loads(str_data)
        self.assertEqual(r.status_code, 200)
        self.assertNotEqual(len(data), 0)

    def test_snapshots_api_one(self):
        r = self.APP.get('/api/snapshot/98')
        str_data = r.data.decode('utf-8')
        data = json.loads(str_data)
        self.assertEqual(r.status_code, 200)
        self.assertEqual(data[0]['snap_name'], 'Coffee Bean Journey To My Cup')
        self.assertNotEqual(len(data), 0)



if __name__ == '__main__':
    unittest.main()
