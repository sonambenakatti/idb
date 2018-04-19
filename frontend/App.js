import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

import CoffeeShops from './components/CoffeeShops';
import CoffeeInstance from './components/CoffeeInstance';
import Location from './components/Location';
import Locations from './components/Locations';
import SnapshotsMain from './components/SnapshotsMain';
import Snapshot from './components/Snapshot';
import Search from './components/Search';
import Visualization from './components/Visualization';

class App extends Component {

  constructor(props) {
    super(props);
  }



  render() {

  return (
    <div>
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/shops' component={CoffeeShops} />
          <Route path='/shop/:shopId' component={CoffeeInstance} />
          <Route path='/about' component={About} />
          <Route path='/snapshots' component={SnapshotsMain} />
          <Route path='/snapshot/:snapshotId' component={Snapshot} />
          <Route path='/locations' component={Locations} />
          <Route path='/location/:scenicId' component={Location} />
          <Route path='/search' component={Search} />
          <Route path='/visualization' component={Visualization} />
        </Switch>
      </div>
    </Router>
    </div>
    );
  }



}

export default App;
