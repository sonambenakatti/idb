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
import {Select} from 'react-select';

var ReactTestUtils = require('react-dom/test-utils');
var sinon = require('sinon');

describe("Test Search", function() {

  before(function() {
    this.jsdom = require('jsdom-global')();
  })

  after(function() {
    this.jsdom();
  })

  it('Test Search', function () {
    const component = ReactTestUtils.renderIntoDocument(
			<Search />
		);
    const spy = sinon.spy(component, 'search')

    const inputField = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input');
    const button = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'button');
    expect(inputField).to.be.ok;
    expect(button).to.be.ok;

    inputField.value = 'coffee';
    ReactTestUtils.Simulate.change(inputField);
    ReactTestUtils.Simulate.click(button);

    expect(spy.calledOnce).to.equal(true)
  });

  it('Test Pagination', function () {
      let wrapper = mount(<Search />);
      expect(wrapper.find('#prev').exists()).to.eql(true);
      expect(wrapper.find('#next').exists()).to.eql(true);
  });
});

describe("Test Nearby Buttons", function() {

  before(function() {
    this.jsdom = require('jsdom-global')();
  })

  after(function() {
    this.jsdom();
  })

  it('Test nearby scenic locations', function () {
        const spy = sinon.spy(CoffeeInstance.prototype, 'get_scenic');
        const wrapper = shallow(<CoffeeInstance location={{state: {shop: {shop_address: '1234 SWE St'}}}}/>);

        wrapper.findWhere(n => n.type() === 'button' && n.contains('SCENIC LOCATIONS NEARBY')).simulate('click');
        expect(spy.calledOnce).to.equal(true);
  });
  it('Test nearby snaps', function () {
        const spy = sinon.spy(CoffeeInstance.prototype, 'get_snaps');
        const wrapper = shallow(<CoffeeInstance location={{state: {shop: {shop_address: '1234 SWE St'}}}}/>);

        wrapper.findWhere(n => n.type() === 'button' && n.contains('MORE SNAPS')).simulate('click');
        expect(spy.calledOnce).to.equal(true);
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

  it('Test filter', function () {
    expect(shallow(<CoffeeShops />).find('.filter')).to.have.length(6);
  });
  it("Test for grid", function() {
    expect(shallow(<CoffeeShops />).contains(<div className="row" />)).to.equal(true);
  });
  it('Test coffee shop set state', function () {
    const wrapper = mount(<CoffeeShops />);
    wrapper.setState({ coffeeshops: ["test"] });
    expect(wrapper.state('coffeeshops')).to.have.length(1);
  });
  it('Test Pagination', function () {
      let wrapper = mount(<CoffeeShops />);
      expect(wrapper.find('#prev').exists()).to.eql(true);
      expect(wrapper.find('#next').exists()).to.eql(true);
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

  it('Test filter', function () {
    expect(shallow(<Locations />).find('.filter')).to.have.length(4);
  });
  it("Test for grid", function() {
      expect(shallow(<Locations />).contains(<div className="row" />)).to.equal(true);
  });
  it('Test locations set state', function () {
    const wrapper = mount(<Locations />);
    wrapper.setState({ locations: ["test"] });
    expect(wrapper.state('locations')).to.have.length(1);
  });
  it('Test Pagination', function () {
      let wrapper = mount(<Locations />);
      expect(wrapper.find('#prev').exists()).to.eql(true);
      expect(wrapper.find('#next').exists()).to.eql(true);
  });
});

describe("Test SnapshotsMain", function() {

  before(function() {
    this.jsdom = require('jsdom-global')();
  })

  after(function() {
    this.jsdom();
  })

  it('Test filter', function () {
    expect(shallow(<SnapshotsMain />).find('.filter')).to.have.length(3);
  });
  it("Test for grid", function() {
      expect(shallow(<SnapshotsMain />).contains(<div className="row" />)).to.equal(true);
  });
  it('Test snapshots set state', function () {
    const wrapper = mount(<SnapshotsMain />);
    wrapper.setState({ photos: ["test"] });
    expect(wrapper.state('photos')).to.have.length(1);
  });
  it('Test Pagination', function () {
      let wrapper = mount(<CoffeeShops />);
      expect(wrapper.find('#prev').exists()).to.eql(true);
      expect(wrapper.find('#next').exists()).to.eql(true);
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
