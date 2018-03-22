//require('./.setup');//('<html><body></body></html>');

import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import "isomorphic-fetch"

import CoffeeShops from '../components/CoffeeShops.js';
import Locations from '../components/Locations.js';
import SnapshotsMain from '../components/SnapshotsMain.js';
import CoffeeInstance from '../components/CoffeeInstance.js';
import Location from '../components/Location.js';
import Snapshot from '../components/Snapshot.js';

import {jsdom} from 'jsdom';

describe("Test CoffeeShops", function() {

  before(() => {
    global.document = jsdom('<!doctype html><html><body></body></html>')
    global.window = global.defaultView
    global.navigator = {
      userAgent: 'node.js'
    }
  })

  it("Test for grid", function() {
      expect(shallow(<CoffeeShops />).contains(<div className="row" />)).to.equal(true);
  });
  it("Test state of coffeeshops", function() {
    const wrapper = mount(<CoffeeShops/>);
    wrapper.setState({ coffeeshops: [1, 2, 3, 4]});
    expect(wrapper.state('coffeeshops')).to.equal([1, 2, 3, 4]);
  });
});


// Ensure that the grid is showing up
describe("Test Locations", function() {
  it("Test for grid", function() {
      expect(shallow(<Locations />).contains(<div className="row" />)).to.equal(true);
  });
});

// Ensure that the grid is showing up
describe("Test SnapshotsMain", function() {
  it("Test for grid", function() {
      expect(shallow(<SnapshotsMain />).contains(<div className="row" />)).to.equal(true);
  });
});
