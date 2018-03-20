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
    # Test Driver Setup #
    def setUp(self):
        self.driver = webdriver.Chrome()
        driver = self.driver
        #driver.url = "http://espressoyoself.me/"
        driver.url = "http://127.0.0.1:5000/"
        driver.get(driver.url)
        self.assertEqual(driver.url, driver.current_url)

    # Test Nav Links #
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



    ##################
    # Shut Down Driver #
    ##################
    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
# suite = unittest.TestLoader().loadTestsFromTestCase(TestSuite)
# unittest.TextTestRunner(verbosity=2).run(suite)
