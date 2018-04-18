
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
      rating_sort = driver.find_element_by_id("ratingsort")
      time.sleep(1)
      rating_sort.send_keys("High - Low")
      rating_sort.send_keys(Keys.RETURN)
      time.sleep(3)
      driver.find_element_by_id("location_instance").click()
      time.sleep(1)
      self.assertEqual(driver.url + "location", driver.current_url)
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
      fav_sort.send_keys("Low-High")
      fav_sort.send_keys(Keys.RETURN)
      time.sleep(3)
      fav_filter = driver.find_element_by_id("favsfilter")
      time.sleep(1)
      fav_filter.send_keys("5+")
      fav_filter.send_keys(Keys.RETURN)
      time.sleep(3)
      driver.find_element_by_id("snap_instance").click()
      time.sleep(1)
      self.assertEqual(driver.url + "snapshot", driver.current_url)
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
