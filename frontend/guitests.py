import selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.options import Options
import unittest
import time

class TestSuite(unittest.TestCase):
	# Test Driver Setup #
	def setUp(self):
		chromeOptions = Options()
		chromeOptions.add_argument("--start-maximized")
		self.driver = webdriver.Chrome()
		driver = self.driver
		#driver.url = "http://espressoyoself.me/"
		driver.url = "http://127.0.0.1:5000/"
		driver.get(driver.url)
		self.assertEqual(driver.url, driver.current_url)

	# Test that navbar links go to the correct pages
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
		print('passed test_navbar')

	# Test that splash page carousel goes to the correct pages
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
		print('passed test_splash_page')

	# Test that a coffee instance page shows up when clicked on
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
		self.assertEqual(driver.url + "shop/1", driver.current_url)
		time.sleep(2)
		#make sure instance has correct elements
		assert "Local Shop:" in driver.page_source
		time.sleep(1)
		print('passed test_coffee_instance')

	# Test that a location instance page shows up when clicked on
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
		self.assertEqual(driver.url + "location/1", driver.current_url)
		time.sleep(2)
		#make sure instance has correct elements
		assert "Scenic Location:" in driver.page_source
		time.sleep(1)
		print('passed test_locations_instance')

	# Test that a snapshot instance page shows up when clicked on
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
		self.assertEqual(driver.url + "snapshot/850", driver.current_url)
		time.sleep(2)
		#make sure instance has correct elements
		assert "Snapshot:" in driver.page_source
		time.sleep(1)
		print('passed test_snapshots_instance')

	# Test that about page has correct components
	def test_about_page(self):
		driver = self.driver
		about_link = driver.find_element_by_id("about")
		about_link.click()
		self.assertEqual(driver.url + "about", driver.current_url)
		time.sleep(1)
		assert "ESPRESSO YOSELF"
		assert "Amrutha" in driver.page_source
		assert "Jaemin" in driver.page_source
		assert "Jenni" in driver.page_source
		assert "Ruchi" in driver.page_source
		assert "Sonam" in driver.page_source
		assert "STATISTICS" in driver.page_source
		assert "DATA SOURCES" in driver.page_source
		assert "TOOLS" in driver.page_source
		assert "Github" in driver.page_source
		assert "Gitbook" in driver.page_source
		assert "UML Diagram" in driver.page_source
		print('passed test_about_page')

	# Test that the links on the about page work
	def test_about_page_links(self):
		driver = self.driver
		about_link = driver.find_element_by_id("about")
		about_link.click()
		self.assertEqual(driver.url + "about", driver.current_url)
		time.sleep(1)
		# Yelp
		driver.find_element_by_link_text("Yelp").click()
		self.assertEqual("https://www.yelp.com/developers/documentation/v3", driver.current_url)
		time.sleep(1)
		driver.back()
		# Google Places
		driver.find_element_by_link_text("Google Places").click()
		self.assertEqual("https://developers.google.com/places/", driver.current_url)
		time.sleep(1)
		driver.back()
		# Flickr
		driver.find_element_by_link_text("Flickr").click()
		self.assertEqual("https://www.flickr.com/services/api/", driver.current_url)
		time.sleep(1)
		driver.back()
		# Github
		driver.find_element_by_link_text("Github").click()
		self.assertEqual("https://github.com/sonambenakatti/idb", driver.current_url)
		time.sleep(3)
		driver.back()
		# GitBook
		driver.find_element_by_link_text("Gitbook").click()
		self.assertEqual("https://sonambenakatti.gitbooks.io/espresso-yoself/content/", driver.current_url)
		time.sleep(3)
		driver.back()
		# UML Diagram
		driver.find_element_by_link_text("UML Diagram").click()
		self.assertEqual("https://yuml.me/3114f25a.png", driver.current_url)
		time.sleep(1)
		driver.back()
		print('passed test_about_page_links')

	# Test that browser forward/backward navigation works
	def test_forward_back(self):
		driver = self.driver
		snaps_link = driver.find_element_by_id("snaps")
		snaps_link.click()
		self.assertEqual(driver.url + "snapshots", driver.current_url)
		time.sleep(1)
		snap_instance = driver.find_element_by_id("snap_instance")
		snap_instance.click()
		time.sleep(1)
		driver.back()
		time.sleep(1)
		driver.forward()
		time.sleep(1)
		self.assertEqual(driver.url + "snapshot/850", driver.current_url)
		about_link = driver.find_element_by_id("about")
		about_link.click()
		time.sleep(1)
		driver.back()
		self.assertEqual(driver.url + "snapshot/850", driver.current_url)
		time.sleep(1)
		driver.forward()
		self.assertEqual(driver.url + "about", driver.current_url)
		time.sleep(1)
		print('passed test_forward_back')

	# Test that direct links to certain pages works
	def test_direct_links(self):
		driver = self.driver
		driver.get(driver.url+"shops")
		self.assertEqual(driver.url + "shops", driver.current_url)
		time.sleep(1)
		driver.get(driver.url+"snapshots")
		self.assertEqual(driver.url + "snapshots", driver.current_url)
		time.sleep(1)
		driver.get(driver.url)
		self.assertEqual(driver.url, driver.current_url)
		time.sleep(1)
		driver.get(driver.url+"shop/3")
		self.assertEqual(driver.url + "shop/3", driver.current_url)
		time.sleep(5)
		print('passed test_direct_links')

	## Tests for searching, filtering, sorting, pagination ##

	def test_search(self):
		driver = self.driver
		search_link = driver.find_element_by_id("search")
		search_link.click()
		time.sleep(1)
		s_bar = driver.find_element_by_class_name("search-input")
		s_bar.send_keys("coffee")
		time.sleep(1)
		driver.find_element_by_class_name("btn-lg").click()
		time.sleep(3)
		s_bar.send_keys("ghiegeoi")
		time.sleep(1)
		driver.find_element_by_class_name("btn-lg").click()
		time.sleep(1)
		assert "No search results found" in driver.page_source
		print('passed test_search')

	def test_pagination(self):
		driver = self.driver
		shop_link = driver.find_element_by_id("shops")
		shop_link.click()
		time.sleep(3)
		n = driver.find_element_by_id("next")
		n.click()
		time.sleep(3)
		p = driver.find_element_by_id("prev")
		p.click()
		time.sleep(1)
		print('passed test_pagination')

	def test_filter_city(self):
		driver = self.driver
		shop_link = driver.find_element_by_id("shops")
		shop_link.click()
		time.sleep(1)
		city_filter = driver.find_element_by_id("cityfilter")
		time.sleep(1)
		city_filter.send_keys("Austin, TX")
		city_filter.send_keys(Keys.RETURN)
		time.sleep(5)
		driver.find_element_by_id("shop_instance").click()
		time.sleep(1)
		self.assertEqual(driver.url + "shop/28", driver.current_url)
		assert "Austin" in driver.page_source
		print('passed test_filter_city')

	def test_sort_price(self):
		driver = self.driver
		shop_link = driver.find_element_by_id("shops")
		shop_link.click()
		time.sleep(1)
		price_sort = driver.find_element_by_id("sort")
		time.sleep(1)
		price_sort.send_keys("Price: Low - High")
		price_sort.send_keys(Keys.RETURN)
		time.sleep(5)
		driver.find_element_by_id("shop_instance").click()
		time.sleep(1)
		self.assertEqual(driver.url + "shop/256", driver.current_url)
		assert "$" in driver.page_source
		print('passed test_sort_price')

	def test_filter_sort(self):
		driver = self.driver
		loc_link = driver.find_element_by_id("scenicloc")
		loc_link.click()
		time.sleep(1)
		city_filter = driver.find_element_by_id("cityfilter")
		time.sleep(1)
		city_filter.send_keys("New York, NY")
		city_filter.send_keys(Keys.RETURN)
		time.sleep(3)
		rating_sort = driver.find_element_by_id("sort")
		time.sleep(1)
		rating_sort.send_keys("Rating: High - Low")
		rating_sort.send_keys(Keys.RETURN)
		time.sleep(3)
		driver.find_element_by_id("location_instance").click()
		time.sleep(1)
		self.assertEqual(driver.url + "location/43", driver.current_url)
		assert "4.9" in driver.page_source
		assert "NY" in driver.page_source
		print('passed test_filter_sort')

	def test_sort_filter_filter(self):
		driver = self.driver
		snap_link = driver.find_element_by_id("snaps")
		snap_link.click()
		time.sleep(1)
		city_filter = driver.find_element_by_id("cityfilter")
		time.sleep(1)
		city_filter.send_keys("Denver, CO")
		city_filter.send_keys(Keys.RETURN)
		time.sleep(3)
		fav_sort = driver.find_element_by_id("favssort")
		time.sleep(1)
		fav_sort.send_keys("Faves: Low - High")
		fav_sort.send_keys(Keys.RETURN)
		time.sleep(3)
		fav_filter = driver.find_element_by_id("favsfilter")
		time.sleep(1)
		fav_filter.send_keys("5+")
		fav_filter.send_keys(Keys.RETURN)
		time.sleep(3)
		driver.find_element_by_id("snap_instance").click()
		time.sleep(1)
		self.assertEqual(driver.url + "snapshot/1297", driver.current_url)
		assert "5" in driver.page_source
		assert "Grumpy" in driver.page_source
		print('passed test_sort_filter_filter')

	def test_no_result_filter(self):
		driver = self.driver
		shop_link = driver.find_element_by_id("shops")
		shop_link.click()
		time.sleep(1)
		city_filter = driver.find_element_by_id("cityfilter")
		time.sleep(1)
		city_filter.send_keys("San Francisco, CA")
		city_filter.send_keys(Keys.RETURN)
		time.sleep(3)
		price_filter = driver.find_element_by_id("pricefilter")
		price_filter.send_keys('$$$$')
		price_filter.send_keys(Keys.RETURN)
		time.sleep(2)
		assert "No Results" in driver.page_source
		print('passed test_no_result_filter')

	# Tests that link on snapshot instance goes to new tab
	def test_snapshot_link(self):
		driver = self.driver
		snap_link = driver.find_element_by_id("snaps")
		snap_link.click()
		time.sleep(1)
		snap_instance = driver.find_element_by_id("snap_instance")
		snap_instance.click()
		time.sleep(1)
		driver.find_element_by_id("more_snaps").click()
		time.sleep(2)
		driver.switch_to.window(driver.window_handles[1])
		self.assertEqual(driver.url + "shop/2", driver.current_url)
		time.sleep(2)
		print('passed test_snapshot_link')

	# Tests that links on coffee instance go to new tab
	def test_coffee_instance_links(self):
		driver = self.driver
		driver.find_element_by_id("shops").click()
		time.sleep(3)
		driver.find_element_by_id("shop_instance").click()
		time.sleep(1)
		driver.find_element_by_id("scenic_nearby").click()
		time.sleep(2)
		driver.find_element_by_id("location_instance").click()
		driver.find_element_by_id("more_snaps").click()
		time.sleep(2)
		assert "no more snaps" in driver.page_source
		driver.switch_to.window(driver.window_handles[1])
		self.assertEqual(driver.url + "location/3", driver.current_url)
		time.sleep(2)
		print('passed test_coffee_instance_links')

	# Tests that links on scenic instance go to new tab
	def test_scenic_instance_links(self):
		driver = self.driver
		driver.find_element_by_id("scenicloc").click()
		time.sleep(3)
		driver.find_element_by_id("location_instance").click()
		time.sleep(1)
		driver.find_element_by_id("coffee_nearby").click()
		time.sleep(2)
		driver.find_element_by_id("shop_instance").click()
		driver.find_element_by_id("more_snaps").click()
		time.sleep(2)
		driver.find_element_by_id("snap_instance").click()
		driver.switch_to.window(driver.window_handles[2])
		self.assertEqual(driver.url + "shop/25", driver.current_url)
		time.sleep(2)
		driver.switch_to.window(driver.window_handles[1])
		self.assertEqual(driver.url + "snapshot/1129", driver.current_url)
		time.sleep(2)
		print('passed test_scenic_instance_links')

	# Shut Down Driver #
	def tearDown(self):
		self.driver.close()

if __name__ == "__main__":
	unittest.main()
# suite = unittest.TestLoader().loadTestsFromTestCase(TestSuite)
# unittest.TextTestRunner(verbosity=2).run(suite)
