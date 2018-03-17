from __future__ import print_function

import unittest
from DBManager import app, Shops, Scenic, Snapshots
import main
import json
from flask import Flask, jsonify


class TestStringMethods(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_site_home(self):
        r = self.app.get('/')
        self.assertEqual(r.status_code, 200)

    def test_shops_query_exists(self):
        result = Shops.query.all()
        self.assertNotEqual(len(result), 0)


    def test_shops_api_exists(self):
        r = self.app.get('/api/v1.0/coffeeshops')
        str_data = r.data.decode('utf-8')
        data = json.loads(r)
        self.assertEqual(r.status_code, 200)
        self.assertNotEqual(len(data), 0)

    def test_shops_api_one(self):
        r = self.app.get('/api/v1.0/coffeeshops/1')
        str_data = r.data.decode('utf-8')
        data = json.loads(str_data)
        self.assertEqual(r.status_code, 200)
        self.assertEqual(data['name'], 'Summermoon Coffee Bar')
        self.assertNotEqual(len(data), 0)

    def test_scenic_query_exists(self):
        result = Scenic.query.all()
        self.assertNotEqual(len(result), 0)


    def test_scenic_api_exists(self):
        r = self.app.get('/api/v1.0/sceniclocations')
        str_data = r.data.decode('utf-8')
        data = json.loads(str_data)
        self.assertEqual(r.status_code, 200)
        self.assertNotEqual(len(data), 0)

    def test_scenic_api_one(self):
        r = self.app.get('/api/v1.0/sceniclocations/2')
        str_data = r.data.decode('utf-8')
        data = json.loads(str_data)
        self.assertEqual(r.status_code, 200)
        self.assertEqual(data['name'], 'Zilker Metropolitan Park')
        self.assertNotEqual(len(data), 0)

if __name__ == '__main__':
    unittest.main()