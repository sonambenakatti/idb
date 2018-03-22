import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import CoffeeShops from '../components/CoffeeShops.js';
import Locations from '../components/Locations.js';
import SnapshotsMain from '../components/SnapshotsMain.js';

describe("Test CoffeeShops", function() {
  it("Test for grid", function() {
      expect(shallow(<CoffeeShops />).contains(<div className="row" />)).to.equal(true);
  });
});

describe("Test Locations", function() {
  it("Test for grid", function() {
      expect(shallow(<Locations />).contains(<div className="row" />)).to.equal(true);
  });
});

describe("Test SnapshotsMain", function() {
  it("Test for grid", function() {
      expect(shallow(<SnapshotsMain />).contains(<div className="row" />)).to.equal(true);
  });
});
