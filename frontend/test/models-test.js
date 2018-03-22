import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

import CoffeeShops from '../components/CoffeeShops.js';
import CoffeeInstance from '../components/CoffeeInstance.js';
import Locations from '../components/Locations.js';
import SnapshotsMain from '../components/SnapshotsMain.js';
import About from '../components/About.js';
import Navbar from '../components/Navbar.js';

import {jsdom} from 'jsdom';

describe('Test Navigation Bar', () => {
    const wrapper = shallow(<Navbar />);
    it('exists', () => {
      expect(wrapper.find('#navbar').exists()).to.eql(true);
    });
});

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

describe("Test About", function() {
  const wrapper = shallow(<About />);
  it('Test all users exist', () => {
      expect(wrapper.find('#amrutha').exists()).to.eql(true);
      expect(wrapper.find('#jaemin').exists()).to.eql(true);
      expect(wrapper.find('#sonam').exists()).to.eql(true);
      expect(wrapper.find('#jenni').exists()).to.eql(true);
      expect(wrapper.find('#ruchi').exists()).to.eql(true);
  });
  it('Test all tools/links exist', () => {
        expect(wrapper.find('#info').exists()).to.eql(true);
  });
});
