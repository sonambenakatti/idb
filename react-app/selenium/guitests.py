from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
import unittest
import time

class TestSuite(unittest.TestCase):
    # Test Driver Setup #
    def setUp(self):
        self.driver = webdriver.Chrome()
        driver = self.driver
        #driver.url = "http://espressoyoself.me/"
        driver.url = "http://127.0.0.1:5000/"
        driver.get(driver.url)
        self.assertEqual(driver.url, driver.current_url)

    def test_navbar(self):
        driver = self.driver
        shops_link = driver.find_element_by_id("shops")
        shops_link.click()
        self.assertEqual(driver.url + "shops", driver.current_url)
        time.sleep(1)
        locations_link = driver.find_element_by_id("scenicloc")
        locations_link.click()
        self.assertEqual(driver.url + "locations", driver.current_url)
        time.sleep(1)
        snapshots_link = driver.find_element_by_id("snaps")
        snapshots_link.click()
        self.assertEqual(driver.url + "snapshots", driver.current_url)
        time.sleep(1)
        about_link = driver.find_element_by_id("about")
        about_link.click()
        self.assertEqual(driver.url + "about", driver.current_url)
        time.sleep(1)

    def test_splash_page(self):
        driver = self.driver
        driver.find_element_by_xpath("//img[@src='/static/img/coffee1.jpg']").click()
        self.assertEqual(driver.url + "shops", driver.current_url)
        time.sleep(2)
        driver.back()
        time.sleep(1)
        driver.find_element_by_class_name("slide-to-locs").click()
        time.sleep(1)
        driver.find_element_by_xpath("//img[@src='/static/img/coffee2.jpg']").click()
        self.assertEqual(driver.url + "locations", driver.current_url)
        time.sleep(2)
        driver.back()
        time.sleep(1)
        driver.find_element_by_class_name("slide-to-locs").click()
        time.sleep(1)
        driver.find_element_by_class_name("slide-to-snaps").click()
        time.sleep(1)
        driver.find_element_by_xpath("//img[@src='/static/img/coffee3.jpg']").click()
        self.assertEqual(driver.url + "snapshots", driver.current_url)
        time.sleep(2)
        driver.back()

    def test_coffee_instance(self):
        driver = self.driver
        shops_link = driver.find_element_by_id("shops")
        shops_link.click()
        self.assertEqual(driver.url + "shops", driver.current_url)
        time.sleep(1)
        #click on shop instance and navigate to instance page
        shop_instance = driver.find_element_by_id("shop_instance")
        shop_instance.click()
        time.sleep(1)
        self.assertEqual(driver.url + "shop", driver.current_url)
        time.sleep(2)
        #make sure instance has correct elements
        assert "Local Shop:" in driver.page_source
        #test coffee instance links to other models
        locations_link = driver.find_element_by_link_text("LOCATIONS NEARBY")
        locations_link.click()
        self.assertEqual(driver.url + "locations", driver.current_url)
        time.sleep(1)
        driver.back()
        time.sleep(1)
        snapshots_link = driver.find_element_by_link_text("MORE SNAPS")
        snapshots_link.click()
        self.assertEqual(driver.url + "snapshots", driver.current_url)
        time.sleep(1)

    def test_locations_instance(self):
        driver = self.driver
        shops_link = driver.find_element_by_id("scenicloc")
        shops_link.click()
        self.assertEqual(driver.url + "locations", driver.current_url)
        time.sleep(1)
        #click on location instance and navigate to instance page
        loc_instance = driver.find_element_by_id("location_instance")
        loc_instance.click()
        time.sleep(1)
        self.assertEqual(driver.url + "location", driver.current_url)
        time.sleep(2)
        #make sure instance has correct elements
        assert "Scenic Location:" in driver.page_source
        #test location instance links to other models
        shops_link = driver.find_element_by_link_text("COFFEE SHOPS NEARBY")
        shops_link.click()
        self.assertEqual(driver.url + "shops", driver.current_url)
        time.sleep(1)
        driver.back()
        time.sleep(1)
        snapshots_link = driver.find_element_by_link_text("MORE SNAPS")
        snapshots_link.click()
        self.assertEqual(driver.url + "snapshots", driver.current_url)
        time.sleep(1)

    def test_snapshots_instance(self):
        driver = self.driver
        snaps_link = driver.find_element_by_id("snaps")
        snaps_link.click()
        self.assertEqual(driver.url + "snapshots", driver.current_url)
        time.sleep(1)
        #click on snapshot instance and navigate to instance page
        snap_instance = driver.find_element_by_id("snap_instance")
        snap_instance.click()
        time.sleep(1)
        self.assertEqual(driver.url + "snapshot", driver.current_url)
        time.sleep(2)
        #make sure instance has correct elements
        assert "Snapshot:" in driver.page_source
        #test snapshot instance links to other models
        shops_link = driver.find_element_by_link_text("COFFEE SHOPS NEARBY")
        shops_link.click()
        self.assertEqual(driver.url + "shops", driver.current_url)
        time.sleep(1)
        driver.back()
        time.sleep(1)
        locs_link = driver.find_element_by_link_text("LOCATIONS NEARBY")
        locs_link.click()
        self.assertEqual(driver.url + "locations", driver.current_url)
        time.sleep(1)

    # def test_about_page(self):



    # Shut Down Driver #
    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
# suite = unittest.TestLoader().loadTestsFromTestCase(TestSuite)
# unittest.TextTestRunner(verbosity=2).run(suite)
