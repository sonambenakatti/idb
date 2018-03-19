from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
import unittest
import time
#driver.get('http://www.google.com/xhtml');
#time.sleep(5) # Let the user actually see something!
#search_box = driver.find_element_by_name('q')
#search_box.send_keys('ChromeDriver')
#search_box.submit()
#time.sleep(5) # Let the user actually see something!
#driver.quit()

# driver = webdriver.Chrome()
# driver.get("http://espressoyoself.me")
# assert "Coffee with a view" in driver.page_source
# shops_link = driver.find_element_by_id("shops")
# shops_link.click()
# assertEqual("http://espressoyoself.me/shops", driver.current_url)
# #assert "Coffee With a View" in driver.page_source
# driver.close()

class TestSuite(unittest.TestCase):
    #####################
    # Test Driver Setup #
    #####################
    def setUp(self):
        self.driver = webdriver.Chrome()
        driver = self.driver
        driver.get("http://espressoyoself.me")
        self.assertEqual("http://espressoyoself.me/", driver.current_url)

    ##################
    # Test Nav Links #
    ##################
    def test_shops_link(self):
        driver = self.driver
        shops_link = driver.find_element_by_id("shops")
        shops_link.click()
        self.assertEqual("http://espressoyoself.me/shops", driver.current_url)
        time.sleep(2)

    def test_locations_link(self):
        driver = self.driver
        locations_link = driver.find_element_by_id("scenicloc")
        locations_link.click()
        self.assertEqual("http://espressoyoself.me/locations", driver.current_url)
        time.sleep(2)

    def test_snapshots_link(self):
        driver = self.driver
        snapshots_link = driver.find_element_by_id("snaps")
        snapshots_link.click()
        self.assertEqual("http://espressoyoself.me/snapshots", driver.current_url)
        time.sleep(2)

    def test_about_link(self):
        driver = self.driver
        about_link = driver.find_element_by_id("about")
        about_link.click()
        self.assertEqual("http://espressoyoself.me/about", driver.current_url)
        time.sleep(2)

    ##################
    # Shut Down Driver #
    ##################
    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
# suite = unittest.TestLoader().loadTestsFromTestCase(TestSuite)
# unittest.TextTestRunner(verbosity=2).run(suite)
