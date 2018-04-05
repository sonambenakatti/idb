import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'isomorphic-fetch';
import 'ignore-styles';

Enzyme.configure({adapter: new Adapter()});

import CoffeeShops from '../frontend/components/CoffeeShops.js';
import CoffeeInstance from '../frontend/components/CoffeeInstance.js';
import Locations from '../frontend/components/Locations.js';
import Location from '../frontend/components/Location.js';
import SnapshotsMain from '../frontend/components/SnapshotsMain.js';
import Snapshot from '../frontend/components/Snapshot.js';
import About from '../frontend/components/About.js';
import Navbar from '../frontend/components/Navbar.js';
import Search from '../frontend/components/Search.js';

var ReactTestUtils = require('react-dom/test-utils');

describe("Test Search", function() {

  before(function() {
    this.jsdom = require('jsdom-global')();
  })

  after(function() {
    this.jsdom();
  })

  it('Test search', function () {
    const component = ReactTestUtils.renderIntoDocument(
			<Search />
		);

    const inputField = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input');
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'button');
    expect(inputField).to.be.ok;
    expect(button).to.be.ok;

    inputField.value = 'coffee';
    ReactTestUtils.Simulate.change(inputField);
    ReactTestUtils.Simulate.click(button);

    const li = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'li');
    expect(li).to.be.ok;

  });
});

describe('Test Navigation Bar', () => {

    before(function() {
      this.jsdom = require('jsdom-global')();
    })

    after(function() {
      this.jsdom();
    })

    const wrapper = shallow(<Navbar />);
    it('exists', () => {
      expect(wrapper.find('#navbar').exists()).to.eql(true);
    });
});

describe("Test CoffeeShops", function() {

  before(function() {
    this.jsdom = require('jsdom-global')();
  })

  after(function() {
    this.jsdom();
  })

  it("Test for grid", function() {
      expect(shallow(<CoffeeShops />).contains(<div className="row" />)).to.equal(true);
  });
  it('Test coffee shop set state', function () {
    const wrapper = mount(<CoffeeShops/>);
    wrapper.setState({ coffeeshops: ["test"] });
    expect(wrapper.state('coffeeshops')).to.have.length(1);
  });
});

describe("Test CoffeeInstance", function() {

  before(function() {
    this.jsdom = require('jsdom-global')();
  })

  after(function() {
    this.jsdom();
  })

  it('Test coffee instance', function () {
    const wrapper = mount(<CoffeeInstance location={{state: {shop: {shop_address: '1234 SWE St'}}}} />);
    expect(wrapper.state().shop).contains({shop_address: '1234 SWE St'});
  });
});


describe("Test Locations", function() {

  before(function() {
    this.jsdom = require('jsdom-global')();
  })

  after(function() {
    this.jsdom();
  })

  it("Test for grid", function() {
      expect(shallow(<Locations />).contains(<div className="row" />)).to.equal(true);
  });
  it('Test locations set state', function () {
    const wrapper = mount(<Locations />);
    wrapper.setState({ locations: ["test"] });
    expect(wrapper.state('locations')).to.have.length(1);
  });
});

describe("Test SnapshotsMain", function() {

  before(function() {
    this.jsdom = require('jsdom-global')();
  })

  after(function() {
    this.jsdom();
  })

  it("Test for grid", function() {
      expect(shallow(<SnapshotsMain />).contains(<div className="row" />)).to.equal(true);
  });
  it('Test snapshots set state', function () {
    const wrapper = mount(<SnapshotsMain />);
    wrapper.setState({ photos: ["test"] });
    expect(wrapper.state('photos')).to.have.length(1);
  });
});

describe("Test Snapshot", function() {

  before(function() {
    this.jsdom = require('jsdom-global')();
  })

  after(function() {
    this.jsdom();
  })

  it('Test snapshot instance', function () {
    const wrapper = mount(<Snapshot location={{state: {snapshot: 'testSnapshot'}}} />);
    expect(wrapper.state().snapshot).contains('testSnapshot');
  });
});

describe("Test About", function() {

  before(function() {
    this.jsdom = require('jsdom-global')();
  })

  after(function() {
    this.jsdom();
  })

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
