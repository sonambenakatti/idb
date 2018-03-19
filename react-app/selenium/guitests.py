from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest

#driver.get('http://www.google.com/xhtml');
#time.sleep(5) # Let the user actually see something!
#search_box = driver.find_element_by_name('q')
#search_box.send_keys('ChromeDriver')
#search_box.submit()
#time.sleep(5) # Let the user actually see something!
#driver.quit()

driver = webdriver.Chrome()
driver.get("https://espressoyoself.me")
assert "Coffee with a view" in driver.title
shops_link = driver.find_element_by_id("shops")
shops_link.click()
assert "Coffee With a View" in driver.page_source
driver.quit()

# class TestSuite(unittest.TestCase):
#     #####################
#     # Test Driver Setup #
#     #####################
#     def setUp(self):
#         self.driver = webdriver.Chrome()
#         driver = self.driver
#         driver.get("https://espressoyoself.me")
#         assert "Coffee with a view" in driver.title
#
#     ##################
#     # Test Nav Links #
#     ##################
#     def test_shops_link(self):
#         driver = self.driver
#         shops_link = driver.find_element_by_id("shops")
#         shops_link.click()
#         assert "Coffee With a View" in driver.page_source
#
#     # def test_locations_link(self):
#     #     driver = self.driver
#     #     locations_link = driver.find_element_by_xpath("//*[@id='root']/div/div[1]/div/div[2]/ul/li[3]/a")
#     #     locations_link.click()
#     #     assert "Country" in driver.page_source
#     #     assert "State" in driver.page_source
#     #
#     # def test_snapshots_link(self):
#     #     driver = self.driver
#     #     snapshots_link = driver.find_element_by_xpath("//*[@id='root']/div/div[1]/div/div[2]/ul/li[4]/a")
#     #     snapshots_link.click()
#     #     assert "ABV Range" in driver.page_source
#     #     assert "SRM Range" in driver.page_source
#
#     def test_about_link(self):
#         driver = self.driver
#         about_link = driver.find_element_by_xpath("//*[@id='root']/div/div[1]/div/div[2]/ul/li[6]/a")
#         about_link.click()
#         assert "Espresso Yoself" in driver.page_source
#
#     ##################
#     # Shut Down Driver #
#     ##################
#     def tearDown(self):
#         self.driver.close()
#
# suite = unittest.TestLoader().loadTestsFromTestCase(TestSuite)
# unittest.TextTestRunner(verbosity=2).run(suite)
